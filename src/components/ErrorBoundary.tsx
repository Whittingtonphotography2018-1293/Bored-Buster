import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            fontFamily: "Fredoka, Arial, sans-serif",
            minHeight: "100vh",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              textAlign: "center"
            }}
          >
            <h2 style={{ marginBottom: "16px", fontSize: "1.5rem", color: "#2c3e50" }}>
              Oops! Something went wrong
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#7f8c8d",
                lineHeight: "1.6",
                marginBottom: "24px"
              }}
            >
              We encountered an unexpected error. Don't worry, your favorites are safe!
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: "12px 24px",
                borderRadius: "24px",
                border: "none",
                background: "linear-gradient(135deg, #FF6B6B 0%, #F06292 100%)",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                width: "100%"
              }}
            >
              Restart App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
