import React, { useState } from 'react'

import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  /* agregar cambio de lenguaje y sistema metrico*/



  const urlSP = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=sp&appid=437dbe377b74e79d549ecd458c3de726`
  const urlEN = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=en&appid=437dbe377b74e79d549ecd458c3de726`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
        if (isChecked == false) {
            axios.get(urlSP).then((response) => {
                setData(response.data)
                console.log(response.data)
              })
              setLocation('')
        }
        else{
            axios.get(urlEN).then((response) => {
                setData(response.data)
                console.log(response.data)
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


  return (
    <div className="app">
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
            <p className="location">{data.name} {data.main ? <p>{data.sys.country}</p> : null}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div>
            {data.weather ? 
            <p className="description">{data.weather[0].description}</p> 
            : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Sensacion</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Vientos</p>
              
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;