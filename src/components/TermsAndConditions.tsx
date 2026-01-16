import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export default function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div
      style={{
        fontFamily: 'Fredoka, Arial, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#7f8c8d',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: '8px 0',
            marginBottom: '24px',
            fontWeight: '500',
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '16px',
          }}
        >
          Terms and Conditions
        </h1>

        <p
          style={{
            fontSize: '0.95rem',
            color: '#7f8c8d',
            marginBottom: '32px',
          }}
        >
          Last updated: December 30, 2024
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            color: '#2c3e50',
            lineHeight: '1.6',
          }}
        >
          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              1. Acceptance of Terms
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              By accessing and using Bored Buster, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do not
              use this application.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              2. Use License
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e', marginBottom: '12px' }}>
              Upon purchase, you are granted a non-exclusive, non-transferable license to use
              Bored Buster for personal use. This license includes:
            </p>
            <ul style={{ marginLeft: '24px', fontSize: '1rem', color: '#34495e' }}>
              <li>Unlimited access to AI-generated activity suggestions</li>
              <li>Ability to save and manage your favorite activities</li>
              <li>Offline functionality after initial setup</li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              3. Payment and Refunds
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e', marginBottom: '12px' }}>
              Bored Buster is offered as a one-time purchase of $0.99. All payments are processed
              securely through RevenueCat and Stripe.
            </p>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              Due to the digital nature of this product and immediate access upon purchase, all
              sales are final. We do not offer refunds except where required by law.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              4. User Data and Privacy
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e', marginBottom: '12px' }}>
              We collect minimal user data necessary for the app to function:
            </p>
            <ul style={{ marginLeft: '24px', fontSize: '1rem', color: '#34495e' }}>
              <li>Anonymous user identifier for payment verification</li>
              <li>Saved activities (stored locally and in your account)</li>
              <li>Payment status information</li>
            </ul>
            <p style={{ fontSize: '1rem', color: '#34495e', marginTop: '12px' }}>
              We do not sell, trade, or share your personal information with third parties. Your
              data is used solely to provide and improve the service.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              5. AI-Generated Content
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              Activity suggestions are generated using artificial intelligence. While we strive to
              provide helpful and appropriate suggestions, we cannot guarantee the suitability of
              every suggestion for every individual. Users are responsible for exercising their own
              judgment when choosing activities.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              6. Service Availability
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              We strive to provide continuous access to Bored Buster, but we do not guarantee that
              the service will be uninterrupted or error-free. We reserve the right to modify,
              suspend, or discontinue any aspect of the service at any time.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              7. Prohibited Uses
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e', marginBottom: '12px' }}>
              You agree not to:
            </p>
            <ul style={{ marginLeft: '24px', fontSize: '1rem', color: '#34495e' }}>
              <li>Attempt to reverse engineer or decompile the application</li>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Share your account access with others</li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              8. Limitation of Liability
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              Bored Buster is provided "as is" without any warranties, express or implied. We shall
              not be liable for any damages arising from the use or inability to use the service,
              including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              9. Changes to Terms
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to the application. Your continued use of Bored Buster after
              any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#2c3e50',
              }}
            >
              10. Contact Information
            </h2>
            <p style={{ fontSize: '1rem', color: '#34495e' }}>
              If you have any questions about these Terms and Conditions, please contact us through
              the app support feature.
            </p>
          </section>
        </div>

        <div
          style={{
            marginTop: '48px',
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
            By using Bored Buster, you acknowledge that you have read and understood these terms
            and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
}
