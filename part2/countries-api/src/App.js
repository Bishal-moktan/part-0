import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const API_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      // console.log(response.data[0].latlng[0])
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (dataToShow.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${dataToShow[0].latlng[0]}&lon=${dataToShow[0].latlng[1]}&appid=${API_key}`
        )
        .then((response) => {
          // console.log(response.data);
          setWeather(response.data);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
  let dataToShow = search
    ? countries.filter((country) => country.name.includes(capitalize(search)))
    : [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (country) => {
    // console.log(country)
    setSearch(country);
  };
  return (
    <div>
      find countries{" "}
      <input type="text" value={search} onChange={handleChange} />
      {dataToShow.length <= 10 ? (
        dataToShow.map((country) => {
          return dataToShow.length === 1 ? (
            <div key={country.name}>
              <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>
              <h2>languages</h2>
              <ul>
                {country.languages.map((language) => (
                  <li key={language.name}>{language.name}</li>
                ))}
              </ul>
              <img
                src={country.flag}
                height="100px"
                width="100px"
                alt="Country flag"
              />
              {weather.length !== 0 && (
                <div>
                  <h1>Weather in {country.capital}</h1>
                  <p>temperature {(weather.main.temp - 273.15).toFixed(2)}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Icon for weather"
                    width="100px"
                    height="100px"
                  />
                  <p>wind: {weather.wind.speed} m/s</p>
                </div>
              )}
            </div>
          ) : (
            <div key={country.name}>
              {country.name}

              <button onClick={() => handleClick(country.name)}>show</button>
            </div>
          );
        })
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}

export default App;
