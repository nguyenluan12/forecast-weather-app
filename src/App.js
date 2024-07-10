
import axios from 'axios';
import MyChart from './Component/MyChart';
import Forecast from './Component/Forecast';
import './App.css';

import Overview from './Component/Overview';

import { useEffect, useState } from 'react';
function App() {
  // xử lý thẻ input
    const [city, setCity] = useState("hanoi"); 
    function handleChangeInput(e) {
        setCity(e.target.value);
        // console.log(city);
    }
  // xử lý nhập API
  const [data, setData] = useState();
  const [url_icon, setUrlIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function handleFetchData(city) {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=f5ac4be4a19c47d8a3e42522222112&q=${city}&days=10&aqi=no&alerts=yes`)
      .then(res => res.data)
      .then((res) => {
        setData(res);
        setUrlIcon(res.current.condition.icon);
        setIsLoading(false);  // Dữ liệu đã tải xong
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);  // Có lỗi xảy ra nhưng không tiếp tục chờ
      });
  }

  useEffect(() => {
    handleFetchData(city);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;  // Hoặc bạn có thể sử dụng một spinner
  }
  
  // function Image() {
  //   return <img src={url_icon}/>
  // }
  return ( 
    (<div style={{
      display:"flex",
      alignItems: "center",
      justifyContent: "center",
      height:"800px",
      border:"2px solid "
    }}>
      <div className="App" style={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        width: "800px",
        
        border:"2px solid "
      }}>
      
       <div className='overView' style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"center",
          border: "2px solid",
                width: "40%"
                
                }}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  
                  }}>
                  <p>Your City:</p>
                  <input style={{
                      height:"20px"
                  }}
                      type="text" value={city} onChange={(e) => handleChangeInput(e)}
                  />
                </div>
            
        <Overview data={data} />
        </div>
        <div className='analyst-and-forcast'
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap:"15px",
            border: "2px solid",
            width: "60%"
              }}>
        
          <MyChart weather={data.forecast.forecastday}/>
          <Forecast data={data.forecast.forecastday} />
        </div>
      </div>
    </div>)
  );
}

export default App;
