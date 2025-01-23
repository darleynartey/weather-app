import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import WeatherPage from './pages/WeatherPage/WeatherPage';
import SignUp from './pages/FormPage/SignUp';
import SignIn from './pages/FormPage/SignIn';

const router = createBrowserRouter ([
  {path: "/", element: <HomePage/>},
  {path: "/sign-in", element: <SignIn/>},
  {path: "/sign-up", element: <SignUp/>},
  {path: "/weather", element: <WeatherPage/>},
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
