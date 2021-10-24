import React, { useState, useCallback } from "react";
import { HighlightCard } from "../../components/HighlightCard";

import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

import { theme } from "../../global/styles/theme";
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
  LoadContainer,
} from "./styles";

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const { signOut, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function formatTransactionDate(
    collection: DataListProps[],
    type: "up" | "down"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    );

    if (collectionFilttered.length === 0) {
      return 0;
    }

    const transaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    return `${transaction.getDate()} de ${transaction.toLocaleString("pt-BR", {
      month: "long",
    })}`;
  }

  async function getStorageData() {
    const storageData = await AsyncStorage.getItem(`${TRANSACTIONS}${user.id}`);
    const transactions = storageData ? JSON.parse(storageData) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "up") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const dateFormatted = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date: dateFormatted,
          type: item.type,
          category: item.category,
        };
      }
    );

    const lastTransactionEntries = formatTransactionDate(transactions, "up");
    const lastTransactionExpensive = formatTransactionDate(
      transactions,
      "down"
    );

    const totalInterval =
      lastTransactionExpensive === 0
        ? "Não há movimentações"
        : `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há entradas"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "Não há saídas"
            : `ùltima saída dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setTransactions(transactionsFormatted);
    setIsLoading(false);
  }

  function handleSignOut() {
    Alert.alert("Alerta", "Deseja sair?", [
      {
        onPress: () => {},
        text: "Não",
      },
      {
        onPress: signOut,
        text: "Sim",
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getStorageData();
    }, [])
  );

  return (
    <>
      <Container>
        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
              animating={isLoading}
            />
          </LoadContainer>
        ) : (
          <>
            <Header>
              <ProfileWrapper>
                <ProfileContainer>
                  <ImageProfile
                    source={{
                      uri: user.photo,
                    }}
                  />
                  <TextContainer>
                    <Welcome>Olá</Welcome>
                    <Username>{user.name}</Username>
                  </TextContainer>
                </ProfileContainer>

                <LogoutButton onPress={handleSignOut}>
                  <PowerIcon name="power" />
                </LogoutButton>
              </ProfileWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransation={highlightData.entries.lastTransaction}
              />
              <HighlightCard
                type="down"
                title="Saidas"
                amount={highlightData.expensives.amount}
                lastTransation={highlightData.expensives.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransation={highlightData.total.lastTransaction}
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
        )}
      </Container>
    </>
  );
}
