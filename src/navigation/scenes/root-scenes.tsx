// ... existing imports ...

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { notLoggedInScreens, loggedInScreens } from "../config/routes";
import { useAuth } from "../../hooks/auth/use-auth";

export default function RootScenes() {
  const { Navigator, Group, Screen } = createNativeStackNavigator();
  const { authenticationStatus } = useAuth();
  const screens =
    authenticationStatus === "AUTHENTICATED"
      ? loggedInScreens
      : notLoggedInScreens;

  return (
    <Navigator>
      <Group>
        {Object.entries(screens).map(([key, value]) => (
          <Screen
            key={key}
            name={key}
            component={value}
            options={{ headerShown: false }}
          />
        ))}
      </Group>
    </Navigator>
  );
}
