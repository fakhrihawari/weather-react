import React from "react";
import styled from "styled-components";

const CurrentWeather = ({ data }) => {  
  return (
    <WeatherCard>
      <WeatherInfoTop>
        <Info>
        <WeatherDate>{new Date(data.dt * 1000).toLocaleDateString()}</WeatherDate>
          <City >{data.city}</City>
          <WeatherDescription>{data.weather[0].description}</WeatherDescription>
          
          
        </Info>
        <WeatherIcon alt="weather" src={`icons/${data.weather[0].icon}.png`}/>
      </WeatherInfoTop>
      <WeatherInfoBottom>
        <Temperature>{Math.round(data.main.temp)}°C</Temperature>
        <Details>
          {/* <ParameterRow>
            <ParameterLabel>Details</ParameterLabel>
          </ParameterRow> */}
          <ParameterRow>
            <ParameterLabel>Feels like</ParameterLabel>
            <ParameterValue>
              {Math.round(data.main.feels_like)}°C
            </ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Wind</ParameterLabel>
            <ParameterValue>{data.wind.speed} m/s</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Humidity</ParameterLabel>
            <ParameterValue>{data.main.humidity}%</ParameterValue>
          </ParameterRow>
          <ParameterRow>
            <ParameterLabel>Pressure</ParameterLabel>
            <ParameterValue>{data.main.pressure} hPa</ParameterValue>
          </ParameterRow>
        </Details>
      </WeatherInfoBottom>
    </WeatherCard>
  );
};

const WeatherCard = styled.div`
    width: 275px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px 2px rgb(97 123 139 / 50%);
  color: #000;
  background-color: #fff;
  margin: 20px auto 0 auto;
  padding:  30px;
    display:  flex;
    flex-direction: column;
`
const WeatherInfoTop = styled.div`
    width: 100%;
    display: flex;
    /* lama */
    /* 
    justify-content: space-between;
    align-items: center; 
    */

    /* baru */
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const WeatherInfoBottom = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
`;

const WeatherIcon = styled.img`
    width: 150px;
    object-fit:cover;

`;

const City = styled.p`
    font-weight: 600;
  font-size: 18px;
  line-height: 1;
  margin: 0;
  letter-spacing: 1px;
`;
const WeatherDescription = styled.p`
    font-weight: 400;
  font-size: 14px;
  line-height: 1;
  margin: 0;
`;
const Info =styled.div``;

const Temperature =styled.p`
    font-weight: 600;
  font-size: 50px;
  width: auto;
  letter-spacing: -5px;
  margin: 10px 0;
  color: #669dd7;
`;

const Details = styled.div`
    width: 100%;
`
const ParameterRow =styled.div`
display: flex;
  justify-content: space-between;
`
const ParameterLabel = styled.span`
     text-align: left;
  font-weight: 600;
  font-size: 12px;
  text-transform: capitalize;
`;
const ParameterValue = styled.span`
    text-align: right;
  font-weight: 600;
  font-size: 12px;
`;
const WeatherDate = styled.p`
    font-weight: 600;
  font-size: 16px;
  line-height: 1;
  margin: 10px 0;
`;

export default CurrentWeather;