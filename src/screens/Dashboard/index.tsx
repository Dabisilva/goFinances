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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  );
}
