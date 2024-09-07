import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorMessage: error.toString() });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorMessage}</p>
          <p>Please try refreshing the page or check back later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
