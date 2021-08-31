import React from "react";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

export interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleGetCategory(category: Category) {
    setCategory(category);
  }
  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header>
          <Title>Categoria</Title>
        </Header>

        <FlatList
          data={categories}
          style={{ flex: 1 }}
          keyExtractor={(item) => String(item.key)}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => (
            <Category
              onPress={() =>
                handleGetCategory({ key: item.key, name: item.name })
              }
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
        />

        <Footer>
          <Button onPress={closeSelectCategory}>Selecionar</Button>
        </Footer>
      </Container>
    </>
  );
}
