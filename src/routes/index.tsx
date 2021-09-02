import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./Stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}
