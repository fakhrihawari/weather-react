import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Search from './components/Search';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isConnect, setIsConnect] = useState(true);
  const checkConnection = () => {
    const connection_status = navigator.onLine ? "connect" : "disconnect";
    if (connection_status === 'connect') {
      setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => {
            setIsConnect(true);
          })
          .catch(() => {
            setIsConnect(false);
          })
      }, 5000);
      return

    }
    return setIsConnect(true);
  }



  const fetchWeather = ({city, latitude, longitude}) => {

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: city, ...weatherResponse });
        setForecast({ city: city, ...forcastResponse });
      })
      .catch(console.log);
  }

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="App">
      {isConnect ? (<Container>
        <Title>Find Your City Weather</Title>
        <Search onSearchChange={fetchWeather}></Search>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </Container>) : (<Container>
        <DisconnectCard>
          <h1>Disconnected</h1>
          <p>Please, Check your Internet Connection</p>
        </DisconnectCard>
      </Container>)

      }

    </div>
  );
}
const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  max-width: 1128px;
`

const DisconnectCard = styled.div`
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
const Title = styled.h1`
  color: #fff;
  text-shadow:  2px 2px #dfdfdf;
`;

export default App;
