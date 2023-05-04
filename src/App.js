import React, { useState } from 'react'

import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [temperature, setTemperature] = useState('')
  const [flag_code, setFlag_code] = useState('')

  const urlSP = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=sp&appid=437dbe377b74e79d549ecd458c3de726`
  const urlEN = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=en&appid=437dbe377b74e79d549ecd458c3de726`
  let source = `https://flagsapi.com/${flag_code}/flat/64.png`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
        if (isChecked == false) {
            axios.get(urlSP).then((response) => {
                setData(response.data)
                setTemperature(response.data.main.temp)
                setFlag_code(response.data.sys.country)
              })
              setLocation('')
        }
        else{
            axios.get(urlEN).then((response) => {
                setData(response.data)
                setTemperature(response.data.main.temp)
                setFlag_code(response.data.sys.country)
              })
              setLocation('')
        }
    }
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => { 
     setIsChecked(!isChecked); 
     console.log(isChecked)
  }; 

  
  /* ENG ver */
  const dateBuilderENG = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  /* ESP ver */
  const dateBuilderSP = (d) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    let dia = dias[d.getDay()];
    let fecha = d.getDate();
    let mes = meses[d.getMonth()];
    let año = d.getFullYear();

    return `${dia} ${fecha} ${mes} ${año}`
  }

  return (
      <div className={(typeof location != "undefined") && data.main ?
        ((temperature < 10 && temperature != "undefined") ? 
        'app cold' 
        : ((temperature > 20 && temperature != "undefined") ? 
        'app warm' : 'app')) 
        : 'app'}>



      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Ingrese una ciudad'
          type="text" />  
        
        <div className='switch_lang'>
            <h2 className='lang_name'>ESP</h2>
            <input type="checkbox" id="switch" checked={isChecked} onChange={handleCheckboxChange}/>
                <label for="switch">
                    {isChecked ? "Checked" : "Unchecked"}
                </label>
            <h2 className='lang_name'>ENG</h2>
        </div> 
      </div>



      <div className="container">
        <div className="top">
          <div>
            <p className="location">{data.name} {data.main ? <p>{data.sys.country} <img src={source}></img> </p> : null}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div>
            {/* {data.weather ? 
            <p className="description">{data.weather[0].description}</p> 
            : null} */}
            {isChecked ? 
            <p className="description">{data.weather[0].description}</p>
            : <p className="description">{data.weather[0].description}</p>}

            <div className="date">
                {isChecked ? 
                <p className="description"> {dateBuilderENG(new Date())} </p> 
                : <p className="description"> {dateBuilderSP(new Date())} </p>}
            </div>
            
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
                
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              
              {isChecked ? 
              <p>Feels Like</p> 
              : <p>Sensacion</p>}
              
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              
              {isChecked ? 
              <p>Humidity</p> 
              : <p>Humedad</p>}

            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              
              {isChecked ? 
              <p>Winds</p> 
              : <p>Vientos</p>}
              
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;