import React, { useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";
import { TRANSACTIONS } from "../../utils/storage";

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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function getStorageData() {
    const storageData = await AsyncStorage.getItem(TRANSACTIONS);
    const transactions = storageData ? JSON.parse(storageData) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          date: dateFormatted,
          type: transaction.type,
          category: transaction.category,
        };
      }
    );

    setData(transactionsFormatted);
  }

  useFocusEffect(
    useCallback(() => {
      getStorageData();
    }, [])
  );

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
