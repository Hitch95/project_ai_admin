import User from "./pages/Users/Users";
import UserDetail from "./pages/Users/UserDetail";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Llm from "./pages/Llm/Llm";
import LlmDetail from "./pages/Llm/LlmDetail";
import Home from "./pages/Home";
import Admin from "./pages/Admin";


export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
  { path: "/admin", element: <Admin /> },
  { path: "/users", element: <User /> },
  { path: "/user/:id", element: <UserDetail /> },
  { path: "/llm", element: <Llm /> },
  { path: "/llm/:id", element: <LlmDetail /> },
  // Optionnel : rediriger "/" vers "/admin"
  { path: "/", element: <Home /> },
];
