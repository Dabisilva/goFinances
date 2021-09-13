import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Header } from "../../components/Header";
import { HistoryCard } from "../../components/HistoryCard";
import { TRANSACTIONS } from "../../utils/storage";
import { categories } from "../../utils/categories";
import { theme } from "../../global/styles/theme";

import { Container, ChartContainer, Content } from "./styles";

export interface TransactionData {
  type: "up" | "down";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export function Resume() {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(TRANSACTIONS);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "down"
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, expensive: TransactionData) => {
        return acc + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          color: category.color,
          percent,
        });
      }
    });

    setCategoriesData(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header title="Resumo por categoria" />

        <Content>
          <ChartContainer>
            <VictoryPie
              data={categoriesData}
              x="percent"
              y="total"
              colorScale={categoriesData.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
            />
          </ChartContainer>
          {categoriesData.map((item) => (
            <HistoryCard
              key={item.key}
              color={item.color}
              title={item.name}
              amount={item.totalFormatted}
            />
          ))}
        </Content>
      </Container>
    </>
  );
}
