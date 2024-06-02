import { StatusBar } from "@capacitor/status-bar";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Splash } from "./screens/Splash";
import { Auth } from "./screens/Auth";
import { SignUp } from "./screens/SignUp";

export const AppRouters = () => {
  StatusBar.setBackgroundColor({ color: "#1DD3C5" });
  return (
    <>
      <Container>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/">
                <Splash />
              </Route>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/signUp">
                <SignUp />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Container>
    </>
  );
};
