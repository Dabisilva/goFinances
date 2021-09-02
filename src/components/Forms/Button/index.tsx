import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

export function Button({ title, children, onPress, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title || children}</Title>
    </Container>
  );
}
