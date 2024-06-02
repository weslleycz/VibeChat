import { ReactNode, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Cookies } from "../../services/cookies";

interface PrivateRouteProps {
  component: ReactNode;
  exact?: any;
  path?: any;
}

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { get } = new Cookies();
      const token = await get();
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>{component}</>
        ) : (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
