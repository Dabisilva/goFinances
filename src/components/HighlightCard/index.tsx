import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  Description,
} from "./styles";

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Content>
        <Amount>R$ 17.400,00</Amount>
        <Description>Última entrada dia 13 de abril</Description>
      </Content>
    </Container>
  );
}
