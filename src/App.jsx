import { useState, useEffect } from "react"
import logo from './images/logo-etherscan-light.svg'

function App() {

  const [gasPrice, setGasPrice] = useState("")
  const [ethPrice, setEthPrice] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingEth, setLoadingEth] = useState(true)
  const [showPriceGasUsd, setShowPriceGasUsd] = useState("")

  const [stablishPrice, setStablishPrice] = useState(2)

  const [alarmConfigure, setAlarmConfigure] = useState(0)

  useEffect(() => {

    const fetchData = () => {
      fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=8P4TS6DAQHFZPN423A2TXBHB5X4H5DHCUU')
        .then(response => response.json())
        .then(data => {
          setGasPrice(data.result)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }
    fetchData()
    const intervalId = setInterval(fetchData, 15000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.binance.com/api/v3/ticker/price')
        .then(response => response.json())
        .then(data => {
          setEthPrice(data[12].price);
          // Llamar a priceGasLow aquí después de que ethPrice haya sido establecido
          priceGasLow();
        })
        .catch(error => console.error(error))
        .finally(() => setLoadingEth(false));
    };

    const priceGasLow = async () => {
      let finalPrice = ((gasPrice.SafeGasPrice * 1000000000 * 20000) / 1000000000000000000) * parseFloat(ethPrice);
      setShowPriceGasUsd(finalPrice);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    const intervalPrice = setInterval(priceGasLow, 15000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalPrice);
    };
  }, [gasPrice, ethPrice]);


  const handleInput = (evt) => {
    setStablishPrice(evt.target.value)

  }

  const stablishAlarm = () => {
    setAlarmConfigure(stablishPrice)
  }
  return (
    <>
      {/* {
        loading ?
          <div>Cargando...</div>
          :
          <div className="bg-blue-500">

            <div className="flex gap-3">
              <h2>Low</h2>
              {gasPrice.SafeGasPrice}
            </div>

            <div className="flex gap-3">
              <h2>Medium</h2>
              {gasPrice.ProposeGasPrice}
            </div>

            <div className="flex gap-3">
              <h2>Fast</h2>
              {gasPrice.FastGasPrice}
            </div>
          </div>
      }

      {
        loadingEth ?
          <div>Cargando precio Eth...</div>
          :
          <div className="flex gap-4">
            <div>
              Ether Price:
            </div>
            <div>
              ${ethPrice}
            </div>
            <div className="flex gap-3">
              <div>
                Gas Price:
              </div>
              <div>
                ${showPriceGasUsd}
              </div>

            </div>

            <div className="flex gap-3">

              <input
                className="border"
                type="number"
                value={stablishPrice}
                onChange={handleInput}
              />

              <button className="bg-red-500 px-2" onClick={stablishAlarm}>Asign</button>
              {alarmConfigure}
            </div>

          </div>

      } */}

      <header className="bg-blue-950 flex justify-center py-2">
        <img src={logo} alt="" className="flex max-w-[150px]" />
      </header>
      <main className="main h-screen text-white w-full flex justify-center pt-4 ">
        <div className="bg-gray-950 flex flex-col items-center w-[400px] max-h-[500px] mx-6 rounded-lg">
          <div className="flex px-8 w-full justify-between pt-3">
            <div>
              <h3 className="text-[12px]">
                Update in <span className="text-blue-500">15</span><span className="pl-1">seg</span>
              </h3>
            </div>
            <div>⛽</div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center">
            <h2 className="flex gap-2">
              <div>
                😒
              </div>
              Low
            </h2>
            <div className="flex gap-2 items-center">
              <h3 className="text-[24px] text-cyan-600 font-semibold">
                {gasPrice.SafeGasPrice}
              </h3>
              <p className="text-[24px] text-cyan-600 font-semibold">gwei</p>
            </div>

            <div>
              ${showPriceGasUsd + 0.04}
            </div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center">
            <h2 className="flex gap-2">
              <div>
                😏
              </div>
              Medium
            </h2>
            <div className="flex gap-2 items-center">
              <h3 className="text-[24px] text-cyan-600 font-semibold">
                {gasPrice.ProposeGasPrice}
              </h3>
              <p className="text-[24px] text-cyan-600 font-semibold">gwei</p>
            </div>

            <div>
              ${showPriceGasUsd + 0.04}
            </div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center">
            <h2 className="flex gap-2">
              <div>
                👽
              </div>
              Fast
            </h2>
            <div className="flex gap-2 items-center">
              <h3 className="text-[24px] text-cyan-600 font-semibold">
                {gasPrice.FastGasPrice}
              </h3>
              <p className="text-[24px] text-cyan-600 font-semibold">gwei</p>
            </div>

            <div>
              ${showPriceGasUsd + 0.1}
            </div>
          </div>
          {/* ETH price */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center">
            <h2 className="flex gap-2">
              <div>
                🐧
              </div>
              ETH / USDT
            </h2>
            <div className="flex gap-2 items-center">
              <h3 className="text-[24px] text-green-700 font-semibold">
                ${ethPrice}
              </h3>
            </div>
            <div className="text-[12px]">
              Price from <span className="text-yellow-600">BINANCE</span>
            </div>
          </div>


        </div>


      </main>
    </>
  )
}

export default App
