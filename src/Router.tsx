import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { AuthPage } from './pages/auth/Auth.page';
import { CreatePostPage } from './pages/createPost/CreatePost.page';
import RequireAuth from './components/requireAuth/RequireAuth';
import { MyPostsPage } from './pages/myPosts/MyPosts.page';
import { PostDetailsPage } from './sections/postDetails/PostDetails.page';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/myPosts',
        element: <MyPostsPage />,
      },
      {
        path: '/createPost',
        element: <CreatePostPage />,
      },
      {
        path: '/post/:id',
        element: <PostDetailsPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
