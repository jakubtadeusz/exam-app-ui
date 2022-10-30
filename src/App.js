import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./auth/Auth";
import LoginPage from "./auth/LoginPage";
import { ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles"
import ExamPage from "./exam/ExamPage";
import TestPage from "./test/TestPage";
import './App.css';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#292929'
      },
      secondary: {
        main: '#E75A13'
      }
    }
  });
  
  return (
    <div id = "app" className="full-height">
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RequireAuth><ExamPage/></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test/:examId/:userId" element={<TestPage />}/>
        </Route>
      </Routes>
    </AuthProvider>
    </ThemeProvider>
    </div>
  );
}

function Layout() {
  return <div><Outlet /></div>/*(
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );*/
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;