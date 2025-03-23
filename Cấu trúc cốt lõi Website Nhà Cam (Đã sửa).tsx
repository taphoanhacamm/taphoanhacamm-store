import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy loading các module chính
const ProductList = lazy(() => import('./components/ProductList'));
const UserAccount = lazy(() => import('./components/UserAccount'));
const Cart = lazy(() => import('./components/Cart'));
const Chat = lazy(() => import('./components/Chat'));

// Theme configuration
const theme = {
  colors: {
    primary: '#ccecff',
    secondary: '#fff7df',
    accent: '#ff9d8a',
    background: '#ffffff',
    text: '#333333',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-bold mb-4">Đã có lỗi xảy ra</h2>
          <button
            className="bg-[#ccecff] px-4 py-2 rounded-md"
            onClick={() => this.setState({ hasError: false })}
          >
            Thử lại
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Layout Component with responsive design
const Layout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold">Nhà Cam</div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-md hover:bg-[#ccecff]">
              Đăng nhập
            </button>
            <button className="px-4 py-2 bg-[#ff9d8a] text-white rounded-md">
              Giỏ hàng
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8">
      {children}
    </main>

    <footer className="bg-[#ccecff] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Về Nhà Cam</h3>
            <p>More than a gift, our memory</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Liên hệ</h3>
            <p>Email: contact@nhacam.com</p>
            <p>Phone: 0392.851.828</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#ff9d8a]">Facebook</a>
              <a href="#" className="hover:text-[#ff9d8a]">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

// Hook for responsive design
const useResponsive = () => {
  const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};

// Context for global state management
const AppContext = React.createContext();

const initialState = {
  user: null,
  cart: [],
  theme: 'light',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Performance optimization utilities
const optimizeImage = (url, width = 300) => {
  return `${url}?w=${width}&q=75`;
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Main App Component
const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for content */}
              <div className="bg-[#fff7df] p-4 rounded-lg h-64"></div>
              <div className="bg-[#fff7df] p-4 rounded-lg h-64"></div>
              <div className="bg-[#fff7df] p-4 rounded-lg h-64"></div>
            </div>
          </Suspense>
        </Layout>
      </AppProvider>
    </ErrorBoundary>
  );
};

export {
  App,
  useResponsive,
  optimizeImage,
  debounce,
  theme,
  AppContext,
  Layout,
  LoadingSpinner,
  ErrorBoundary
};