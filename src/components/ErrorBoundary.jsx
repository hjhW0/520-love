import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
          background: 'var(--color-bg)',
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💔</div>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)', marginBottom: 8 }}>
            出了点小问题
          </h2>
          <p style={{ color: 'var(--color-text-light)' }}>
            刷新一下页面就好了 ❤️
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
