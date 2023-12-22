import { useState, useEffect } from "react"
import logo from './images/logo-etherscan-light.svg'
import { RiVolumeOffVibrateFill } from "react-icons/ri";

function App() {

  const [gasPrice, setGasPrice] = useState("")
  const [ethPrice, setEthPrice] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingEth, setLoadingEth] = useState(true)
  const [showPriceGasUsd, setShowPriceGasUsd] = useState("")
  const [showPriceGasUsdFast, setShowPriceGasUsdFast] = useState("")

  /* BUTON STATES */
  const [button, setButton] = useState(true)

  /* ALARM */
  const [stablishPrice, setStablishPrice] = useState()
  const [alarmConfigure, setAlarmConfigure] = useState(0)
  const [time, setTime] = useState(14)

  useEffect(() => {

    const fetchDataEther = () => {
      fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=8P4TS6DAQHFZPN423A2TXBHB5X4H5DHCUU')
        .then(response => response.json())
        .then(data => {
          console.log(data.result)
          setGasPrice(data.result)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))

      fetch('https://api.binance.com/api/v3/ticker/price')
        .then(response => response.json())
        .then(data => {
          setEthPrice(data[12].price);
          let lowFinalPrice = (((gasPrice.SafeGasPrice * 1000000000 * 21000) / 1000000000000000000) * parseFloat(data[12].price)).toFixed(2)
          let fastFinalPrice = (((gasPrice.SafeGasPrice * 1000000000 * 21700) / 1000000000000000000) * parseFloat(data[12].price)).toFixed(2)
          let parsePrice = parseFloat(lowFinalPrice)
          if (parsePrice > 0) {
            console.log("contador iniciado")
            setTime(14)
          }
          setShowPriceGasUsd(lowFinalPrice);
          setShowPriceGasUsdFast(fastFinalPrice)
        })
        .catch(error => console.error(error))
        .finally(() => setLoadingEth(false));
    }

    fetchDataEther()
    const intervalId = setInterval(fetchDataEther, 15000)

    return () => {
      clearInterval(intervalId)
    }
  }, [gasPrice.SafeGasPrice])

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTime(prevCount => (prevCount > 0 ? prevCount - 1 : 14));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [time]);

  const handleInput = (evt) => {
    setStablishPrice(evt.target.value)
  }

  const stablishAlarm = () => {
    setAlarmConfigure(stablishPrice)
    setButton(!button)
  }

  useEffect(() => {

    console.log(" alarma comprueba el precio")
    if (showPriceGasUsd < alarmConfigure) {
      console.log("alarma sonando")
    } else {
      console.log("alarma apagada")
    }

  }, [showPriceGasUsd])

  return (
    <>
      <header className="bg-blue-950 flex justify-center py-2">
        <img src={logo} alt="" className="flex max-w-[150px]" />
      </header>
      <main className="main h-screen text-white w-full flex justify-center pt-4 ">
        <div className="bg-gray-950 flex flex-col items-center w-[400px] max-h-[600px] mx-6 rounded-lg">
          <div className="flex px-8 w-full justify-between pt-3">
            <div>
              <h3 className="text-[12px]">
                Update in <span className="text-blue-500">{time}</span><span className="pl-1">seg</span>
              </h3>
            </div>
            <div>⛽</div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center py-4">
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
              ${showPriceGasUsd}
            </div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center py-4">
            <h2 className="flex gap-2">
              <div>
                😏
              </div>
              Medium
            </h2>
            <div className="flex gap-2 items-center">
              <h3 className="text-[24px] text-cyan-600 font-semibold">

                {loadingEth ?
                  <div>Cargando...</div>
                  :
                  gasPrice.ProposeGasPrice
                }

              </h3>
              <p className="text-[24px] text-cyan-600 font-semibold">gwei</p>
            </div>

            <div>
              ${showPriceGasUsd}
            </div>
          </div>
          {/* boxes */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center py-4">
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
              ${showPriceGasUsdFast}
            </div>
          </div>
          {/* ETH price */}
          <div className="flex flex-col items-center max-w-[340px] max-h-[100px] bg-slate-900 border border-gray-700 mt-4 w-full rounded-xl justify-center py-4">
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

          {/*  ALARM */}
          <div className="flex gap-3 mt-4 items-center">
            <span className="text-[12px]">Price required</span>
            <input
              className="border w-[50px] text-gray-900 text-[14px] flex text-center rounded-md"
              type="number"
              value={stablishPrice}
              onChange={handleInput}
            />

            <button
              className={` w-[60px] h-[25px] rounded-md text-[12px] text-center flex justify-center items-center ${button ? 'bg-green-500' : 'bg-red-500'}`}
              onClick={stablishAlarm}>{button ? 'Act' : <RiVolumeOffVibrateFill />}
            </button>
            {alarmConfigure}
          </div>
          <span className="pt-2 font-mono text-[12px]">{button ? 'Alarm is Off' : 'Alarm is On'}</span>

          <span className="text-[12px] mt-1">Coded by MartinK</span>
        </div>

      </main>
    </>
  )
}

export default App
