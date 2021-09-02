import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { StatusBar } from "expo-status-bar";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  ProfileWrapper,
  ProfileContainer,
  ImageProfile,
  TextContainer,
  Welcome,
  Username,
  LogoutButton,
  PowerIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/08/2021",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "13/08/2021",
    },
    {
      id: "3",
      type: "negative",
      title: "Padaria",
      amount: "R$ 5,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "16/08/2021",
    },
  ];

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header>
          <ProfileWrapper>
            <ProfileContainer>
              <ImageProfile
                source={{
                  uri: "https://avatars.githubusercontent.com/u/57877449?v=4",
                }}
              />
              <TextContainer>
                <Welcome>Olá</Welcome>
                <Username>Davi</Username>
              </TextContainer>
            </ProfileContainer>

            <LogoutButton onPress={() => {}}>
              <PowerIcon name="power" />
            </LogoutButton>
          </ProfileWrapper>
        </Header>

        <HighlightCards>
          <HighlightCard
            type="up"
            title="Entradas"
            amount="R$17.400,00"
            lastTransation="Última entrada dia 13 de abril"
          />
          <HighlightCard
            type="down"
            title="Saidas"
            amount="R$ 1.259,00"
            lastTransation="Última saída dia 03 de abril"
          />
          <HighlightCard
            type="total"
            title="Total"
            amount="R$ 16.141,00"
            lastTransation="01 à 16 de abril"
          />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        </Transactions>
      </Container>
    </>
  );
}
