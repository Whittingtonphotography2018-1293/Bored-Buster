import { useState, useEffect } from "react";
import { Menu, Heart, Sparkles, Smartphone } from "lucide-react";
import { getFavorites, addFavorite, removeFavorite, saveActivityHistory, getRandomActivityFromDatabase } from "./lib/database";

export default function ActivityJar() {
  const [ageGroup, setAgeGroup] = useState("");
  const [activity, setActivity] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [lastShake, setLastShake] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || !acceleration.x || !acceleration.y || !acceleration.z) return;

      const currentX = acceleration.x;
      const currentY = acceleration.y;
      const currentZ = acceleration.z;

      const deltaX = Math.abs(currentX - lastX);
      const deltaY = Math.abs(currentY - lastY);
      const deltaZ = Math.abs(currentZ - lastZ);

      const shakeThreshold = 15;
      const now = Date.now();

      if ((deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) &&
          now - lastShake > 1000 && !isShaking) {
        setLastShake(now);
        generateActivity();
      }

      lastX = currentX;
      lastY = currentY;
      lastZ = currentZ;
    };

    const requestPermission = async () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (error) {
          console.error('Permission denied for device motion');
        }
      } else {
        window.addEventListener('devicemotion', handleMotion);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [lastShake, isShaking, ageGroup]);

  const activities: Record<string, string[]> = {
    toddlers: [
      "Play 'Eye Spy' with colors",
      "Build a tower with blocks",
      "Draw with sidewalk chalk",
      "Have a mini dance party",
      "Play animal sounds guessing game"
    ],
    preschoolers: [
      "Play 'Would You Rather'",
      "Create a puppet show",
      "Go on a backyard scavenger hunt",
      "Make paper airplanes and race them",
      "Draw your dream house"
    ],
    earlyElementary: [
      "DIY craft challenge with recycled items",
      "Invent a new board game",
      "Write a short story together",
      "Set up an obstacle course",
      "Try a 'Minute to Win It' mini game"
    ],
    lateElementary: [
      "Create a short film or skit",
      "Host a cooking challenge",
      "Make a vision board",
      "Draw or design a digital comic",
      "Try a science experiment"
    ],
    teens: [
      "Create a short film or skit",
      "Host a cooking challenge",
      "Make a vision board",
      "Draw or design a digital comic",
      "Do a 'no-internet' challenge for one hour"
    ]
  };

  const generateActivity = async () => {
    if (!ageGroup) {
      setShowSettings(true);
      return;
    }
    setIsShaking(true);
    setIsGenerating(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 1000);

    try {
      const dbActivity = await getRandomActivityFromDatabase(ageGroup, []);

      if (dbActivity) {
        console.log('Using database activity:', dbActivity);
        setActivity(dbActivity);
        await saveActivityHistory(dbActivity, ageGroup, false);
        setIsShaking(false);
        setIsGenerating(false);
        setShowActivity(true);
        return;
      }

      const list = activities[ageGroup];
      const randomItem = list[Math.floor(Math.random() * list.length)];

      setActivity(randomItem);
      await saveActivityHistory(randomItem, ageGroup, false);
      setIsShaking(false);
      setIsGenerating(false);
      setShowActivity(true);
    } catch (error) {
      console.error('Error generating activity:', error);

      const list = activities[ageGroup];
      const randomItem = list[Math.floor(Math.random() * list.length)];

      setActivity(randomItem);
      await saveActivityHistory(randomItem, ageGroup, false);
      setIsShaking(false);
      setIsGenerating(false);
      setShowActivity(true);
    }
  };

  const addToFavorites = async () => {
    if (activity && !favorites.includes(activity)) {
      const success = await addFavorite(activity, ageGroup);
      if (success) {
        setFavorites([...favorites, activity]);
      }
    }
  };

  const handleRemoveFavorite = async (item: string) => {
    const success = await removeFavorite(item);
    if (success) {
      setFavorites(favorites.filter((fav) => fav !== item));
    }
  };

  return (
    <div
      style={{
        fontFamily: "Fredoka, Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        position: "relative"
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <img
          src="/generated-image-1767102612082.png"
          alt="Bored Buster"
          style={{
            height: "50px",
            width: "auto"
          }}
        />
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Menu size={28} color="#2c3e50" />
          </button>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              position: "relative"
            }}
          >
            <Heart size={28} color="#2c3e50" fill={favorites.length > 0 ? "#F06292" : "none"} />
            {favorites.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "linear-gradient(135deg, #FF6B6B 0%, #F06292 100%)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "10px",
                  padding: "2px 6px",
                  fontWeight: "600"
                }}
              >
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 90px)",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 3rem)",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "16px",
            lineHeight: "1.2"
          }}
        >
          Bored? Not anymore!
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
            color: "#7f8c8d",
            marginBottom: "60px",
            fontWeight: "400"
          }}
        >
          AI creates unique activities just for you
        </p>

        <div style={{ position: "relative", margin: "40px 0" }}>
          {confettiActive && (
            <>
              {[...Array(20)].map((_, i) => {
                const colors = ["#FF6B6B", "#FFB84D", "#F06292", "#BA68C8", "#64B5F6", "#FFA726", "#9CCC65", "#66BB6A", "#42A5F5", "#AB47BC"];
                const angle = (i * 360) / 20;
                const distance = 150 + Math.random() * 50;
                const size = 8 + Math.random() * 12;
                const delay = Math.random() * 0.1;

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: Math.random() > 0.5 ? "50%" : "20%",
                      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                      transform: "translate(-50%, -50%)",
                      animation: `confettiBurst 0.8s ease-out ${delay}s forwards`,
                      "--angle": `${angle}deg`,
                      "--distance": `${distance}px`,
                      zIndex: 10
                    } as React.CSSProperties}
                  />
                );
              })}
            </>
          )}

          <div
            style={{
              position: "absolute",
              top: "-30px",
              left: "-50px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#FFB84D",
              animation: "float 3s ease-in-out infinite",
              boxShadow: "0 4px 12px rgba(255, 184, 77, 0.4)"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-40px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#FF6B6B",
              animation: "float 4s ease-in-out infinite 0.5s",
              boxShadow: "0 4px 12px rgba(255, 107, 107, 0.4)"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-30px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#66BB6A",
              animation: "float 3.5s ease-in-out infinite 1s",
              boxShadow: "0 4px 12px rgba(102, 187, 106, 0.4)"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              right: "-50px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#BA68C8",
              animation: "float 4.5s ease-in-out infinite 1.5s",
              boxShadow: "0 4px 12px rgba(186, 104, 200, 0.4)"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-60px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: "#64B5F6",
              animation: "float 3.2s ease-in-out infinite 0.8s",
              boxShadow: "0 4px 12px rgba(100, 181, 246, 0.4)"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-55px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#F06292",
              animation: "float 3.8s ease-in-out infinite 1.2s",
              boxShadow: "0 4px 12px rgba(240, 98, 146, 0.4)"
            }}
          />

          <button
            onClick={generateActivity}
            disabled={isShaking}
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: confettiActive
                ? "radial-gradient(circle, #FFD700 0%, #FF6B6B 20%, #FFB84D 40%, #F06292 60%, #BA68C8 80%, #64B5F6 100%)"
                : "linear-gradient(135deg, #FF6B6B 0%, #FFB84D 25%, #F06292 50%, #BA68C8 75%, #64B5F6 100%)",
              border: "8px solid white",
              cursor: isShaking ? "default" : "pointer",
              boxShadow: confettiActive
                ? "0 0 80px rgba(255, 107, 107, 0.8), 0 0 120px rgba(255, 184, 77, 0.6), inset 0 0 60px rgba(255, 255, 255, 0.3)"
                : "0 20px 60px rgba(255, 107, 107, 0.4), 0 8px 20px rgba(240, 98, 146, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.3s ease",
              transform: confettiActive ? "scale(1.05)" : (isShaking ? "scale(0.95)" : "scale(1)"),
              animation: isShaking ? "shake 0.6s ease" : "none",
              position: "relative",
              overflow: "visible"
            }}
            onMouseDown={(e) => {
              if (!isShaking) {
                e.currentTarget.style.transform = "scale(0.92)";
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(255, 107, 107, 0.6), 0 4px 12px rgba(240, 98, 146, 0.4)";
              }
            }}
            onMouseUp={(e) => {
              if (!isShaking) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 107, 107, 0.4), 0 8px 20px rgba(240, 98, 146, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isShaking) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(255, 107, 107, 0.4), 0 8px 20px rgba(240, 98, 146, 0.3)";
              }
            }}
          >
            <Sparkles size={48} color="white" />
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "4px"
                }}
              >
                {isGenerating ? "Thinking..." : "Shake!"}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "400"
                }}
              >
                {isGenerating ? "AI is creating" : "for a fun idea"}
              </div>
            </div>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "40px",
            color: "#7f8c8d",
            fontSize: "0.95rem"
          }}
        >
          <Smartphone size={18} />
          <span>You can also shake your phone!</span>
        </div>
      </main>

      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "24px", fontSize: "1.5rem", color: "#2c3e50" }}>
              Select Age Group
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { value: "toddlers", label: "Ages 1–3 (Toddlers)" },
                { value: "preschoolers", label: "Ages 3–5 (Preschoolers)" },
                { value: "earlyElementary", label: "Ages 5–8 (Early Elementary)" },
                { value: "lateElementary", label: "Ages 8–12 (Late Elementary)" },
                { value: "teens", label: "Ages 13+ (Teens)" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setAgeGroup(option.value);
                    setShowSettings(false);
                  }}
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: ageGroup === option.value ? "2px solid #F06292" : "2px solid #e0e0e0",
                    backgroundColor: ageGroup === option.value ? "#fce4ec" : "white",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: ageGroup === option.value ? "600" : "400",
                    color: "#2c3e50",
                    transition: "all 0.2s ease"
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSettings(false)}
              style={{
                marginTop: "24px",
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#7f8c8d"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showActivity && activity && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setShowActivity(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              animation: "slideUp 0.3s ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "16px", fontSize: "1.5rem", color: "#2c3e50" }}>
              Your Activity Idea
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#34495e",
                lineHeight: "1.6",
                marginBottom: "24px"
              }}
            >
              {activity}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={addToFavorites}
                disabled={favorites.includes(activity)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "24px",
                  border: "none",
                  background: favorites.includes(activity) ? "#e0e0e0" : "linear-gradient(135deg, #FF6B6B 0%, #F06292 100%)",
                  color: "white",
                  cursor: favorites.includes(activity) ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Heart size={18} fill={favorites.includes(activity) ? "white" : "none"} />
                {favorites.includes(activity) ? "Saved" : "Save"}
              </button>
              <button
                onClick={generateActivity}
                style={{
                  padding: "12px 24px",
                  borderRadius: "24px",
                  border: "2px solid #F06292",
                  backgroundColor: "white",
                  color: "#F06292",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
              >
                Get Another
              </button>
            </div>
          </div>
        </div>
      )}

      {showFavorites && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
          onClick={() => setShowFavorites(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "24px", fontSize: "1.5rem", color: "#2c3e50" }}>
              Your Favorites
            </h2>
            {favorites.length === 0 ? (
              <p style={{ color: "#7f8c8d", textAlign: "center", padding: "40px 0" }}>
                No favorites yet. Generate activities and save the ones you love!
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {favorites.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px"
                    }}
                  >
                    <span style={{ flex: 1, color: "#34495e", fontSize: "1rem" }}>{item}</span>
                    <button
                      onClick={() => handleRemoveFavorite(item)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px",
                        color: "#95a5a6",
                        fontSize: "1.2rem",
                        lineHeight: "1"
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setShowFavorites(false)}
              style={{
                marginTop: "24px",
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#7f8c8d"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) scale(0.95); }
          25% { transform: rotate(5deg) scale(0.95); }
          50% { transform: rotate(-5deg) scale(0.95); }
          75% { transform: rotate(5deg) scale(0.95); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confettiBurst {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(1) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
