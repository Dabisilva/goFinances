import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionProps {
  type?: "up" | "down";
  isActive?: boolean;
}
export const Container = styled.TouchableOpacity<TransactionProps>`
  width: 48%;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;

  ${({ type, isActive }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.sucess_light};
    `};
  ${({ type, isActive }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      border: none;
    `};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<TransactionProps>`
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};

  font-size: ${RFValue(24)}px;
  margin-right: 14px;
`;
