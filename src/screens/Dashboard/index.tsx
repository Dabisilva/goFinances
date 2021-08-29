import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import {
  Container,
  Header,
  ProfileWrapper,
  ProfileContainer,
  ImageProfile,
  TextContainer,
  Welcome,
  Username,
  PowerIcon,
  HighlightCards,
} from "./styles";

export function Dashboard() {
  return (
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

          <PowerIcon name="power" />
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
    </Container>
  );
}
