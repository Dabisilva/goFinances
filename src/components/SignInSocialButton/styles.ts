import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;

  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  width: ${RFValue(56)}px;
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;

  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.medium};
`;
