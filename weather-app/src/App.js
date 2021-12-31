import { useEffect, useState } from 'react';
import './App.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import { WeatherIcon } from 'weather-react-icons';
import "antd/dist/antd.css"
import WeatherCard from "./Styles/WeatherCard"
import Card from "./Styles/Card"
import { Input } from "antd"
import DateText from './Styles/DateText';
import CountryName from './Styles/CountryName';
import lookup from 'country-code-lookup'
import dateFormat from "dateformat";
import DownButton from './Components/DownButton';
import DownButtonStyle from './Styles/DownButtonStyle';
import KakaoMap from './Components/KakaoMap';

const { Search } = Input

const Weather = (props) => {
  const { id } = props
  return <WeatherIcon iconId={id} name="owm" night />;
};

function App() {
  const lookup = require('country-code-lookup')
  const API_KEY = "3ffa0d1a6ec6c543f7bcfee705bb49c2"
  const [data, setData] = useState({})
  const [countryName, setCountryName] = useState("")
  const [image, setImage] = useState()
  const [loc, setLoc] = useState("")

  const [isOpen, setMenu] = useState(false)

  const toggleMenu = () => {
    setMenu(isOpen => !isOpen)
  }

  useEffect(() => {
    getWeather(35.57, 126.97)
  }, [])

  const getWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`
    )
    const data = await res.json()
    console.log("json", data)
    setData(data)
    const countryData = lookup.byInternet(data.sys.country)
    console.log(countryData.country)
    setCountryName(countryData.country)
    console.log(`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys.country}.svg`)
    setImage(`http://purecatamphetamine.github.io/country-flag-icons/3x2/${data.sys.country}.svg`)
  }



  const onSearch = value => {
    if (value.includes(",")) {
      const [lat, lon] = value.split(",")
      console.log("lat", lat.trim())
      console.log("lon", lon.trim())
      getWeather(lat.trim(), lon.trim())
      return
    }

    const { kakao } = window
    let ps = new kakao.maps.services.Places();
    ps.keywordSearch(value, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data[0].y, data[0].x)
        const x = data[0].x
        const y = data[0].y
        console.log(y + ", " + x)
        setLoc(data[0].y + ", " + data[0].x)
        // console.log(loc)
        // const [lat, lon] = loc.split(",")
        // console.log("lat", lat.trim())
        // console.log("lon", lon.trim())
        getWeather(data[0].y.trim(), data[0].x.trim())
      }
    }


  }


  const { weather = [], main = [], wind = [], sys = [], name } = data
  const { temp, temp_max, temp_min } = main
  const { speed, deg, gust } = wind
  const { country } = sys

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: "center", width: "420px", margin: "auto" }}>
        <Search
          placeholder='input search text'
          onSearch={onSearch}
          enterButton
          style={{
            borderRadius: "20px",
            marginTop: "200px",
          }}
        />
      </div>

      <WeatherCard style={{ marginTop: "50px" }}>
        {weather.map(({ id, main, description, icon }, index) => (
          <div>
            <div
              className="weather-data"
              style={{
                display: "flex",
                fontSize: 20,
                justifyContent: "center",
                alignItems: "center",
                flexFlow: "row"
              }}
            >
              <div style={{ marginRight: "30px", paddingRight: "20px" }}>
                <DateText>{dateFormat(new Date(), "dddd, d mmm yyyy")}</DateText>
                <CountryName style={{ marginTop: "5px" }}>
                  <img width="30px" alt="" src={image} />{countryName}
                </CountryName>
                <b style={{ display: "block", fontSize: "15px" }}>{name}</b>
                <div style={{ marginTop: "20px", display: "flex" }}>

                </div>
              </div>
              <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "inline-block", width: "80px" }}>
                  <Weather key={index} id={id} />
                </div>
                <div>
                  <span style={{ fontSize: "30px", marginLeft: "20px" }}>{(temp - 273.15).toFixed()}°C</span>
                </div>
              </div>
            </div>
            <div>
              {isOpen ? (
                <div>
                  <b style={{ display: "block", marginTop: 20 }}>{description}</b>
                  <Card style={{ width: 300, marginBottom: 10, marginTop: 10 }}>
                    <span className='title' style={{ marginBottom: "0px" }}>온도</span>
                    <div>
                      현재온도: {(temp - 273.15).toFixed()}°C
                    </div>
                    <div>
                      최저온도: {(temp_min - 273.15).toFixed()}°C
                    </div>
                    <div>
                      최고온도: {(temp_max - 273.15).toFixed()}°C
                    </div>
                  </Card>

                  <Card style={{ width: 300 }}>
                    <span className='title'>바람</span>
                    <div>
                      풍속: {speed}m/s
                    </div>
                    <div>
                      풍향: {deg}°
                    </div>
                  </Card>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ))}

      </WeatherCard>
      <div onClick={toggleMenu}
        style={{
          fontSize: "40px",
          textAlign: "center",
          position: "relative",
          bottom: "0px",
          display: "inline-block"
        }}
      >
        <DownButton upDown={!isOpen} />
      </div>

      <div style={{ display: 'none', flexDirection: 'column' }}>
        <KakaoMap />
      </div>
    </div >
  );
}

export default App;
