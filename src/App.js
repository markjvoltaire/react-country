import './App.css';
import { getCountry } from './services/country';
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountry();

      setCountries(data);
    };
    fetchData();
  }, []);

  const filterCountries = () => {
    return countries.filter(
      (i) => i.name.includes(query) && (i.continent === continent || continent === 'All')
    );
  };

  return (
    <>
      <h1>Flags of The World</h1>

      <input
        placeholder="Look Up A Country"
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>

      <div>
        <select value={continent} onChange={(e) => setContinent(e.target.value)}>
          <option value="All"> All </option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Antarctica">Antarctica</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
        </select>

        {filterCountries().map((i) => (
          <>
            <p className="names" key={i.id}>
              {i.name}
            </p>
            <img src={`https://flagcdn.com/48x36/${i.iso2.toLowerCase()}.png`} />
          </>
        ))}
      </div>
    </>
  );
}

export default App;
