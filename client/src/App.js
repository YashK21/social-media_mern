import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NavBar from "./components/navBar/NavBar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
function App() {
  // for if the user is not logged-in
  const activeUser = true;
  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{flex:6}}>

          <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // For protected route
  const ProtectedRoute = ({children}) => {
    if (!activeUser) {
      return <Navigate to="/login" />;
    }
    return children;
    // Children means the nested routes of layout function eg- profile,home
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      {/* <Login/>    */}
      {/* <Routes>
        <Route path="/" element={<Layout/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
