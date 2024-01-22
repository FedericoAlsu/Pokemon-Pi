import pokelogo from "./pokelogo.png";
import {
  Link,
  Outlet,
  useLocation,
  Router,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { Create } from "./pages/Create";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Root />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "/create", element: <Create /> },
    ],
  },
]);

function Root() {
  let location = useLocation();

  return (
    <nav>
      <div className="barra_nav">
        <img className="nav_img" src={pokelogo} />
        <div>
          <Link to={"/home"} className="nav_link">
            Home{" "}
          </Link>
          <Link to={"/create"} className="nav_link">
            Create{" "}
          </Link>
          <Link to={"/"} className="nav_link">
            Exiit{" "}
          </Link>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
