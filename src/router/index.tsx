import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ListingsView } from '../views/admin/ListingsView';
import { CreateListingView } from '../views/admin/CreateListingView';
import { LeadsView } from '../views/admin/LeadsView';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
  {
    path: '/admin/:secret',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ListingsView />,
      },
      {
        path: 'create',
        element: <CreateListingView />,
      },
      {
        path: 'leads',
        element: <LeadsView />,
      }
    ]
  }
]);