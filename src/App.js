import "./App.css";
import Coin from "./Coin";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=Inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((data) => setCoins(data.data))
      .catch((error) => alert(error));
  }, []);

  const handleChange = (e) => {
    setsearch(e.target.value);
  };
  const filteredCoins = 
    coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  console.table(coins)
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            onChange={handleChange}
            type="input"
            placeholder="search"
            className="coin-input"
          />
        </form>
      </div>
      {filteredCoins.map((a) => {
        return <Coin key={a.id} 
        name={a.name} 
        image={a.image}
        symbol={a.symbol}
        marketcap={a.market_cap} 
        price={a.current_price}
        priceChange={a.price_change_percentage_24h}
        volume ={a.total_volume}
        />;
      })}
    </div>
  );
}

export default App;
