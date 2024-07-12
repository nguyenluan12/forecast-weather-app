// import { hover } from "@testing-library/user-event/dist/hover";
import { useEffect, useState } from "react";
import '..';
// import MyChart from "./MyChart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



function Forecast(props) {
    const [forecastday, setForecastDay] = useState(props.data);
    
    const [idxDay, setIdxDay] = useState(0);
    const [hour, setHour] = useState(forecastday[0].hour);
    const [maxtemp_c,setMaxtemp_c] = useState(hour[0].maxtemp_c);
    const [date, setDate] = useState(forecastday[0].date)
    const [detailHour, setDetailHour] = useState(hour[0])
    const [changeDisplay, setChangeDisplay] = useState('none')
    console.log(maxtemp_c)
    console.log('detail')
    console.log(typeof(hour))
    //bang chi tiet theo gio
    function handleChangeDisplayNone() {
        setChangeDisplay('none')
    }
    function DetailWeather() {
        return (
            <div className="detail-hour-block" style={{
                display: changeDisplay,

            }}>
                <div>
                    <h1>{date}</h1>
                    <h1 onClick={()=>handleChangeDisplayNone()}>X</h1>
                </div>
                <div>
                    <p>time</p>
                    <p>Max Temperature: {maxtemp_c}</p>
                    <p> Sun Rise: </p>
                    <p> Moon Rise: </p>
                    <p> Moon Phase: </p>
                    <p> Humidity: </p>
                    <p> Chance Of Snow: </p>
                    <p> Min Temperature: </p>
                    <p>  </p>
                    <p>  </p>
                </div>
            </div>
        )
    }

    //Tao bang phan tich 
    function MyChart() {
        // const [forecastDay,setForecastDay] = useState(weather);
        
        
        const [day, setDay] = useState(forecastday[idxDay]);
       
        // const newData = day.hour.map((item) => {
        //         return { name: item.tittle, uv: item.uv, temp: item.temp_c, humid: item.humidity };
        //     });
        const [data, setData] = useState([])
        const [nameChart, setNameChart] = useState("temp")
        const [colorChart, setColorChart]=useState("#ead93b")
        
        useEffect(() => {
            const newData = day.hour.map((item, index) => {
                const name = index<10 ? "0"+index+":00" : index+":00";
                return {
                    name: name,
                    uv: item.uv,
                    temp: item.temp_c,
                    humid: item.humidity
                };
            });
            setData(newData);
        
        }, [day]);
        
        function handleUV() {
            setNameChart("uv");
            setColorChart("#de553a")
        }
        function handleTemp() {
            setNameChart("temp");
            setColorChart("#ead93b")
        }
        function handleHumid() {
            setNameChart("humid");
            setColorChart("#8884d8")
        }
        return (
            <div style={
                {
                    width: "100%",
                    height: "100px",
                    marginTop: "0px",
                    paddingBottom: "30px",
                    position:"relative"
                    
                
                }
        }>
                {nameChart == "temp" ? <h1 className="title-chart" onClick={()=> handleUV()}>Temperature</h1> : nameChart=="uv"?<h1 className="title-chart" onClick={()=> handleHumid()}>UV</h1>:<h1 className="title-chart" onClick={()=> handleTemp()}>Humidity</h1>}
                
                {/* <h1 onClick={()=>handleUV()}>UV</h1>
                <h1 onClick={() => handleHumid()}>Humid</h1> */}
                <ResponsiveContainer style={
                    {
                        width: "100%",
                        height: "100%",
                        
                        position: "absolute",
                        right: "25px",
                        top:"20px"
                    }
                }>
                    <AreaChart
                    
                    width={700}
                    height={400}
                    data={data}
                    margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    }}
                >
                    {/* <CartesianGrid fontSize={10} strokeDasharray="0" /> */}
                    <XAxis style={{display:"none"}} fontSize={10} dataKey="name" />
                    <YAxis style={{display:"none"}} fontSize={10} /> 
                     <Tooltip fontSize={10} />
                    <Area type="monotone" dataKey={nameChart} stroke={colorChart} fill={colorChart} />
                </AreaChart>
                </ResponsiveContainer>
            </div>
    );
    };

    // Phan tich theo gio
    function ForecastHourItem(props) {
        const hour = props.hour;
        console.log('hour')
        console.log(hour)
        return (
            hour.map((item,index)=>(
                <div className="forecast-hour-item" key={index} >
                    <p style={{marginBottom:"0",marginTop:"0" }}>{item.dewpoint_f}°F</p>
                    <img style={{marginBottom:"0",marginTop:"0" }} src={item.condition.icon} />
                    { index< 10 ? <p style={{marginBottom:"0",marginTop:"0"  }}>0{index}:00</p> : <p style={{ marginBottom:"0",marginTop:"0"   }}>{index}:00</p>}
                </div>
        )));
    }
    
    function handleChangeForecastHour(index) {
        setHour(forecastday[index].hour);   
        setIdxDay(index);
    }

    //Du bao theo ngay
    function ForcastDay(props) {
        const forecastday = props.forecastday;
        
        return (
            forecastday.map((item, index) => {
                
                return (
                    <div style={{ marginBottom: "0", marginTop: "0" }} key={index} className="forecastDay" onClick={() => { handleChangeForecastHour(index); }}>
                        <img style={{ marginBottom: "0", marginTop: "0" }} src={item.day.condition.icon} />
                        <p style={{ marginBottom: "0", marginTop: "0" }}>Humidity</p>
                        <p style={{ marginBottom: "0", marginTop: "0" }}>{item.day.avghumidity}%</p>
                    </div>
                );
            } )
            
        );
    }
    //thay doi du lieu theo gio khi du lieu ngay thay doi
    useEffect(() => {
        setHour(forecastday[0].hour)
    }, [forecastday])
    
    return (
        <div style={
            {
                width: "100%",
                height:"100%",
                marginTop: "0",
                
                

            }} className="weather-forecast">
            
            <MyChart weather={forecastday} idxDay={idxDay}/>
            <div style={
                {
                    display: "flex",
                    flexDirection: "row",
                    overflow: "scroll",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                }
            }>
                <ForecastHourItem hour={hour} />
                
            </div>
            <div  style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"space-between",
                    overflow: "scroll",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    cursor: "pointer",
                    padding:"0"
                    

                }
                
            }> 
                
                <ForcastDay forecastday={forecastday} />
               
            </div>
             <DetailWeather />
        </div>
        
        
    );
}
export default Forecast;