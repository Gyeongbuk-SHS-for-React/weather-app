import Card from "./Card"
import styled from "styled-components"

const WeatherCard = styled(Card)`
  & i::before {
    font-size: 70px;
  }
  & {
    box-shadow: 5px 5px 20px #ABABAB;
    padding: 25px;
    border-radius: 10px;
  }
`
export default WeatherCard
