import React, { useCallback, useEffect, useState } from 'react';

import { Container, ContainerCard, ContainerDetails, ContainerDetailsInfo, Header, InfoWeather, MinMaxContainer, MinMaxText, SecondaryTextInfo, TextHeader, TextInfo, TextTemperature, TextWeatherDay, WeatherContainerDay } from './styles';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import Cloudy from '../../assets/cloudy-icon.json';
import Rainny from '../../assets/rainy-icon.json';
import Sunny from '../../assets/sunny.json';
import CloudyNight from '../../assets/weather-cloudynight.json';
import RaynningNinght from '../../assets/weather-rainynight.json';
import Night from '../../assets/weather-night.json';

import { PermissionsAndroid, Platform } from 'react-native';
import api from '../../services/api';
interface WeatherForecast {
  date: string;
  weekday: string;
  max: number;
  min: number;
  description: string;
  condition: string;
}

interface Weather {
  temp: number;
  date: string;
  description: string;
  currently: string;
  city: string;
  humidity: number;
  wind_speedy: string;
  sunrise: string;
  sunset: string;
}
const Home: React.FC = () => {
  const [weather, setWeather] = useState<Weather>();
  const [dayInfo, setDayInfo] = useState<WeatherForecast[]>([]);

  const icon = (condition: string, currently: string): any => {
    if (condition === 'sunny' && currently === 'dia') {
      return Sunny;
    }

    if (condition === 'cloudy' && currently === 'dia') {
      return Cloudy;
    }
    if (condition === 'rain' && currently === 'dia') {
      return Rainny;
    }
    if (condition === 'sunny' && currently === 'noite') {
      return Night;
    }

    if (condition === 'cloudy' && currently === 'noite') {
      return CloudyNight;
    }
    if (condition === 'rain' && currently === 'noite') {
      return RaynningNinght;
    }

  }

  const getPermissionAndroid = async (): Promise<boolean> => {
    const grantedLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (
      grantedLocation === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }

    return false;
  };

  const getWeather = async (lat: number, lon: number) => {
    const { data } = await api.get(`&lat=${lat}&lon=${lon}&user_ip=remote`);
    setWeather(data.results);
    setDayInfo(data.results.forecast)
  }

  const getLocation = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    Geolocation.getCurrentPosition(data => {
      getWeather(data.coords.latitude, data.coords.longitude);
    })

  }, []);

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <Container contentContainerStyle={{ alignItems: 'center' }}>
      <Header>
        <TextHeader>
          {weather?.city || ''}
        </TextHeader>
      </Header>

      <TextTemperature>
        {weather?.temp || 2}°
      </TextTemperature>
      <InfoWeather>
        {weather?.date || ''} | {weather?.description || ''}
      </InfoWeather>

      <ContainerCard
        contentContainerStyle={{ height: 130, marginTop: 20 }}
      >
        {dayInfo.map((item, index) => {
          return (
            <WeatherContainerDay
              key={index}
              mRight={index === dayInfo.length - 1 ? 24 : 16}
              mLeft={index === 0 ? 24 : 0}
            >
              <TextWeatherDay>
                {item.weekday}-{item.date}
              </TextWeatherDay>
              <LottieView
                source={icon(item.condition, weather!.currently)}
                loop
                autoPlay
                style={{ width: 60, height: 60 }}
              />
              <MinMaxContainer>
                <MinMaxText>
                  Min: {item.min}
                </MinMaxText>
                <MinMaxText>
                  Max: {item.max}
                </MinMaxText>
              </MinMaxContainer>
            </WeatherContainerDay>
          )
        })}
      </ContainerCard>

      <ContainerDetails>
        <ContainerDetailsInfo>
          <TextInfo>
            Vel. do vento
          </TextInfo>
          <SecondaryTextInfo>
            {weather?.wind_speedy}
          </SecondaryTextInfo>
        </ContainerDetailsInfo>

        <ContainerDetailsInfo>
          <TextInfo>
            Humidade
          </TextInfo>
          <SecondaryTextInfo>
            {weather?.humidity}%
          </SecondaryTextInfo>
        </ContainerDetailsInfo>
        <ContainerDetailsInfo style={{ marginTop: 16 }}>
          <TextInfo>
            Nascer do sol
          </TextInfo>
          <SecondaryTextInfo>
            {weather?.sunrise}
          </SecondaryTextInfo>
        </ContainerDetailsInfo>
        <ContainerDetailsInfo style={{ marginTop: 16 }}>
          <TextInfo>
            Pôr do sol
          </TextInfo>
          <SecondaryTextInfo>
            {weather?.sunset}
          </SecondaryTextInfo>
        </ContainerDetailsInfo>
      </ContainerDetails>

    </Container>
  );
};

export default Home;
