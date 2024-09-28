import { Auth, Common } from "../../features";
import { createEnum } from "./types";

export const notLoggedInScreens = {
  Signin: Auth.Signin,
  SigninWithGoogle: Auth.SigninWithGoogle,
};

export const loggedInScreens = {
  Home: Common.Home,
};

export const ROUTES = createEnum({
  //Auth Rotues
  Signin: "Signin",
  SigninWithGoogle: "SigninWithGoogle",

  //Common Routes
  Home: "Home",
});
