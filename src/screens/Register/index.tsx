import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Button } from "../../components/Forms/Button";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Category, CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";

import { TRANSACTIONS } from "../../utils/storage";
import { Container, Form, Fields, ButtonsContainer } from "./styles";
import { Header } from "../../components/Header";

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O preço deve ser positivo")
    .required("Preço é obrigatório"),
});

export function Register() {
  const navigation = useNavigation();
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });
  const [transactionType, setTransaction] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransaction(type);
  }

  function handleCloseModal() {
    setCategoryModal(false);
  }
  function handleOpenModal() {
    setCategoryModal(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const storageData = await AsyncStorage.getItem(TRANSACTIONS);
      const currentData = storageData ? JSON.parse(storageData) : [];

      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(TRANSACTIONS, JSON.stringify(formattedData));

      reset();
      setTransaction("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar :(");
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header title="Cadastro" />

          <Form>
            <Fields>
              <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />

              <ButtonsContainer>
                <TransactionButton
                  onPress={() => handleTransactionTypeSelect("up")}
                  type="up"
                  isActive={transactionType === "up"}
                >
                  Income
                </TransactionButton>
                <TransactionButton
                  onPress={() => handleTransactionTypeSelect("down")}
                  type="down"
                  isActive={transactionType === "down"}
                >
                  Outcome
                </TransactionButton>
              </ButtonsContainer>

              <CategorySelectButton
                onPress={handleOpenModal}
                title={category.name}
              />
            </Fields>

            <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
          </Form>

          <Modal visible={categoryModal} animationType="slide">
            <CategorySelect
              category={category}
              closeSelectCategory={handleCloseModal}
              setCategory={setCategory}
            />
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
}
