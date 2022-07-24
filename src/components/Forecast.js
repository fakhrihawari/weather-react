import React from "react";
import styled from "styled-components";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = DAYS.slice(dayInAWeek, DAYS.length).concat(DAYS.slice(0, dayInAWeek));

    return (
        <ForecastWrapper>
            {
                data.list.splice(0, 6).map((item, index) => {
                    return (
                        <ForecastCard key={index}>

                            <ForecastDay>{forecastDays[index]}</ForecastDay>
                            <ForecastInfo>
                                <ForecastLeft>
                                    <img src={`icons/${item.weather[0].icon}.png`} alt="weather" />
                                    <WeatherDescription>{item.weather[0].description} </WeatherDescription>
                                </ForecastLeft>
                                <ForecastRight>
                                    <ForecastTemperature>{Math.round(item.main.temp_max)}°C</ForecastTemperature>
                                </ForecastRight>
                            </ForecastInfo>


                        </ForecastCard>)
                })
            }
        </ForecastWrapper>
    )
};

const ForecastWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin : 50px auto;
    gap: 10px;
    max-width: 840px;
`;
const ForecastCard = styled.div`
    width: 250px;
    display: flex;
    /* align-items: center; */

    flex-direction: column;
    padding: 10px 30px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px 2px rgb(97 123 139 / 50%);
    color: #000;
    background-color: #fff;
    /* justify-content: space-between; */
`;

const ForecastInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const ForecastLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 30px;
        height: 30px;
    }
`;
const ForecastRight = styled.div`
`;
const WeatherDescription = styled.p`
    font-size: 12px;
    font-weight: 600;
`;

const ForecastDay = styled.p`
font-size: 18px;
    font-weight: 600;
    margin-bottom: 5px;
`;

const ForecastTemperature = styled.p`
font-size: 24px;
    font-weight: 600;
    color: #669dd7;
`;
export default Forecast;