import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AnnouncementProvider } from './contexts/AnnouncementContext';

function App() {
  return (
    <AnnouncementProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AnnouncementProvider>
  );
}

export default App;