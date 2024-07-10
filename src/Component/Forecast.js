import { hover } from "@testing-library/user-event/dist/hover";
import { useState } from "react";
import '..';


function Forecast(props) {
    const forecastday = props.data;
    const [hour, setHour] = useState(forecastday[0].hour);

    function ForecastHourItem(props) {
        console.log(props)
        const hour = props.hour;
        return (
            hour.map((item,index)=>(
                <div className="forecast-hour-item" key={index}>
                    <p>{item.dewpoint_f}°F</p>
                    <img src={item.condition.icon} />
                    { index< 10 ? <p>0{index}:00</p> : <p>{index}:00</p>}
                </div>
        )));
    }

    function handleChangeForecastHour(props) {
        setHour(forecastday[props].hour);    
    }
    
    function ForcastDay(props) {
        const forecastday = props.forecastday;
    
        return (
            forecastday.map((item, index) => (
                
                <div key={index} className="forecastDay" onClick={()=>handleChangeForecastHour(index)}>
                    <img src={item.day.condition.icon} />
                    <p>Humidity</p>
                    <p>{item.day.avghumidity }%</p>
                </div>
            ))
            
        );
    }

    return (
        <div style={
            {
                width: "100%",
                
                border: "2px solid"

            }} className="weather-forecast">
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
                    cursor: "pointer"
                    

                }
                
            }> 
                <ForcastDay forecastday={forecastday}/>
            </div>
        </div>
        
        
    );
}
export default Forecast;