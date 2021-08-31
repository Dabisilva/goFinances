import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  ButtonsContainer,
} from "./styles";
import { TransactionButton } from "../../components/Forms/TransactionButton";

export function Register() {
  const [transactionType, setTransaction] = useState<"up" | "down">();

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransaction(type);
  }

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <Input placeholder="Nome" />
            <Input placeholder="Preço" />

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
          </Fields>

          <Button>Enviar</Button>
        </Form>
      </Container>
    </>
  );
}
