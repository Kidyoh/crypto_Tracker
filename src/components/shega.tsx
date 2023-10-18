interface ShegaProps {
    name: string;
    price: number;
    convertedPrice: number;
    symbol: string;
    marketcap: number;
    volume: number;
    image: string;
    priceChange: number;
  }



const Shega = ({
  name,
  price,
  convertedPrice,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}: ShegaProps) => {



  return (
    <div className="shega-container">
      <div className="shega-row border-b border-gray-300 h-20 w-[1060px] items-center">
        <div className="flex items-center pr-6 pt-6 min-w-[280px]">
          <img src={image} alt="crypto" className="h-8 w-8 mr-2" />
          <h2 className="text-sm w-32">{name}</h2>
          <p className="uppercase pl-6">{symbol}</p>
       
        <div className=" flex justify-end w-full">
          <p className="w-24 mr-20 pl-12">${price}</p>
          
          <p className="w-28 ml-5">{convertedPrice} Br</p>
          <p className="w-36 mr-8 pl-6">${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className="flex w-32 pl-14 text-red-600">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="flex w-32 pl-14 text-blue-700">{priceChange.toFixed(2)}%</p>
          )}

          <p className="flex w-44 pl-24">
            ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export  {Shega};