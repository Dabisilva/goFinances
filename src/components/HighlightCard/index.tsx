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

interface HighlightCardProps {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransation: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({
  type,
  amount,
  lastTransation,
  title,
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <Description type={type}>{lastTransation}</Description>
      </Content>
    </Container>
  );
}
