import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./Tab.routes";
import { AuthRoutes } from "./Auth.routes";
import { useAuth } from "../context/AuthContext";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.name ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
