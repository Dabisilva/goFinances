import React from "react";
import { StatusBar } from "expo-status-bar";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";

import { Container } from "./styles";

export function Resume() {
  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header title="Resumo por categoria" />

        <HistoryCard color="red" title="Compras" amount="R$150,00" />
      </Container>
    </>
  );
}
