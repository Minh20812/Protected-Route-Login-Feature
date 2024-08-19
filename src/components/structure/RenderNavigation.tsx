import { Link, Routes, Route } from "react-router-dom";
import { useContextAuth } from "../../auth/AuthWrapper";
import { nav } from "./navigation";

interface NavItemProps {
  path: string;
  name: string;
  element: React.ReactNode;
  isMenu: boolean;
  isPrivate: boolean;
}

interface useContextAuthType {
  user: { isAuthenticated: boolean };
  signOut: () => void;
}

export const RenderMenu = () => {
  const { user, signOut } = useContextAuth() as useContextAuthType;

  const MenuItem = ({ r }: { r: NavItemProps }) => {
    return (
      <div>
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };

  return (
    <>
      <div className=" flex gap-4 justify-center items-center">
        {nav.map((r, i) => {
          if (user.isAuthenticated && r.isMenu) {
            return <MenuItem key={i} r={r} />;
          } else if (!r.isPrivate && r.isMenu) {
            return <MenuItem key={i} r={r} />;
          } else {
            return false;
          }
        })}

        {user.isAuthenticated ? (
          <Link to={"/signIn"} onClick={signOut}>
            SignOut
          </Link>
        ) : (
          <Link to={"signIn"}>SignIn</Link>
        )}
      </div>
    </>
  );
};

export const RenderPrivate = () => {
  const { user } = useContextAuth() as useContextAuthType;
  return (
    <>
      <div>
        <Routes>
          {nav.map((r, i) => {
            if (r.isPrivate && user.isAuthenticated) {
              return <Route key={i} path={r.path} element={r.element} />;
            } else if (!r.isPrivate) {
              return <Route key={i} path={r.path} element={r.element} />;
            } else return false;
          })}
        </Routes>
      </div>
    </>
  );
};
