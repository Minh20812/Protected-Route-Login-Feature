import { About } from "../pages/About";
import { Account } from "../pages/Account";
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { Contact } from "../pages/Contact";
import Private from "../pages/Private";

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/signIn",
    name: "SignIn",
    element: <SignIn />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/account",
    name: "Account",
    element: <Account />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/private",
    name: "Private",
    element: <Private />,
    isMenu: true,
    isPrivate: true,
  },
];
