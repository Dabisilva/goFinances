import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Button, Title, Icon } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends RectButtonProps {
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
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />

        <Title>{title || children}</Title>
      </Button>
    </Container>
  );
}
