import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/global.css';
import 'antd/dist/reset.css';
import Connect from './pages/login';
import AuthGuard from './auth/AuthGuard';
import DecentralizedDocumentPlatform from './pages/vaults';

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
    path: '/vault',
    element: <DecentralizedDocumentPlatform />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
