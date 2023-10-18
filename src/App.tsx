import { useState, useEffect, ChangeEvent } from "react";
import Axios from "axios";
import axios from "axios";
import {Shega} from "./components/shega"
import img from '../public/2.png';

interface ShegaData {
  id: string;
  name: string;
  current_price: number;
  symbol: string;
  total_volume: number;
  market_cap: number;
  image: string;
  price_change_percentage_24h: number;
}

interface ExchangeRates {
  ETB: number;
}

function App() {
  const [shegas, setShegas] = useState<ShegaData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ ETB: 0 });
 

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res: any) => {
        setShegas(res.data);
      })
      .catch((error: any) => console.log(error));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterShegas = shegas.filter((shega) =>
    shega.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    Axios.get("data/exchange_rates.json")
      .then((res) => {
        setExchangeRates(res.data.rates);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const convertToETB = (convertedPrice: number) => {
    const outp = convertedPrice * exchangeRates.ETB;
    return outp.toFixed(2);
  };


  return (
    <div className="shega-app">
      <div className="shega-search">
        <div className="flex items-center min-w-2">
          <div className="">
            <p className="min-w-1 text-6xl py-16">Shega Crypto Search</p>
            <form>
              <input
                className="pl-4 w-96 h-12 outline-none bg-white rounded-2xl border-2 border-solid border-orange-600 placeholder:text-slate-400"
                type="text"
                onChange={handleChange}
                placeholder="Example: Bitcoin"
              />
            </form>
          </div>
          <img src={img} className="pl-80 object-scale-down h-60" alt="Crypto" />
        </div>
      </div>
      <div className="flex grid-cols-5 p-2 space-x-24">
        <div className="header-item">Name</div>
        <div className="header-item">Symbol</div>
        <div className="header-item">Price</div>
        <div className="header-item">Price in ETB</div>
        <div className="header-item">Volume</div>
        <div className="header-item">Price Change</div>
        <div className="header-item">Market Cap</div>
      </div>
      {filterShegas.map((shega) => (
        <div key={shega.id} onClick={() => {
          window.open(`https://www.coingecko.com/en/coins/${shega.id}`, "_blank");
        }}>
          <Shega
            name={shega.name}
            price={shega.current_price}
            convertedPrice={parseInt(convertToETB(shega.current_price))}
            symbol={shega.symbol}
            marketcap={shega.total_volume}
            volume={shega.market_cap}
            image={shega.image}
            priceChange={shega.price_change_percentage_24h}

          />
        </div>
      ))}
    </div>
  );
}

export default App;
