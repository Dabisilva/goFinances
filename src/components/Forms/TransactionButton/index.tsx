import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title, Icon } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  type: "up" | "down";
  isActive?: boolean;
}

export function TransactionButton({
  title,
  children,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />

      <Title>{title || children}</Title>
    </Container>
  );
}
