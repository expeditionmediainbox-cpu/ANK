import React, { Component } from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'serif',background:'#fafaf9',color:'#1c1917'}}>
          <h1 style={{fontSize:'2rem',marginBottom:'1rem'}}>Ankita Sharma</h1>
          <p style={{color:'#78716c',marginBottom:'2rem'}}>Something went wrong. Please refresh the page.</p>
          <button onClick={() => window.location.reload()} style={{background:'#1c1917',color:'white',padding:'0.75rem 2rem',border:'none',cursor:'pointer',fontFamily:'monospace',letterSpacing:'0.1em'}}>
            REFRESH
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
