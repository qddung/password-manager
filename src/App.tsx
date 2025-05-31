import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';
import Connect from './pages/connect';
import AuthGuard from './auth/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard isLogin={true}>
      <Connect />
    </AuthGuard>
  },
  {
    path: '/login',
    element: <AuthGuard isLogin={true}>
      <Connect />
    </AuthGuard>
  },
  {
    path: '/wallet',
    element: <AuthGuard isLogin={false}>
      <div>wallet</div>
    </AuthGuard>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
