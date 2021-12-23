import styled, { css } from 'styled-components/native';
import { colors, fonts } from '../../global/styles/theme';

interface CardProps {
  mRight: number;
  mLeft: number;
}

export const Container = styled.ScrollView.attrs({
  overScrollMode: 'never',
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;

export const TextHeader = styled.Text`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${colors.textPrimary};
`;

export const TextTemperature = styled.Text`
  font-family: ${fonts.bold};
  font-size: 72px;
  text-align: center;
  color: ${colors.textPrimary};
  margin-top: 60px;
`;

export const InfoWeather = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textPrimary};
  text-align: center;
`;

export const ContainerCard = styled.ScrollView.attrs({
  horizontal: true,
  overScrollMode: 'never',
  showsHorizontalScrollIndicator: false,
})`
`;

export const WeatherContainerDay = styled.View<CardProps>`
  width: 130px;
  height: 130px;
  border-radius: 10px;
  background-color: ${colors.secondary};
  padding: 8px 16px;
  align-items: center;
  ${props =>
    css`
  margin-right: ${props.mRight}px;
  margin-left: ${props.mLeft}px;
  `
  }
`;

export const TextWeatherDay = styled.Text`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${colors.textPrimary};
  text-align: center;
`;

export const MinMaxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MinMaxText = styled.Text`
  font-family: ${fonts.regular};
  font-size: 14px;
  color: ${colors.textPrimary};
`;

export const Separator = styled.View`
  width: 16px;
`;

export const ContainerDetails = styled.View`
  width: 80%;
  height: 195px;
  border-radius: 10px;
  background-color: ${colors.secondary};
  margin-top: 30px;
  flex-direction: row;
  padding: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ContainerDetailsInfo = styled.View`
  width: 40%;
`;

export const TextInfo = styled.Text`
  font-size: 14px;
  font-family: ${fonts.bold};
  color: ${colors.textPrimary};
`;

export const SecondaryTextInfo = styled.Text`
  font-size: 18px;
  font-family: ${fonts.bold};
  color: ${colors.textPrimary};
  margin-top: 8px;
`;
