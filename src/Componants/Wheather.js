
import React,{useState} from 'react'
import cloud from "../Images/Clouds.png"
import rain from "../Images/Rain.png"
import clear from "../Images/Clear.png"
import mist from "../Images/mist.png"
import errorImg from "../Images/error.png"
function Wheather() {
    const API_KEY = "c73564c20c350587a0bde8d8a2bd2dc9"
    
    const [search,setSearch] = useState("")
    const [data,setData] = useState("")
    const [error,setError] = useState("");
     
    async function fetchData(params) {
        const get =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
        const res = await get.json()
        console.log(res)
        setData(res);
        
        if(search==""){
            
            setError("Please Enter Name")
        }
        else if(res.cod == '404'){
            setError("Please Enter Valid Name !")
        }
        else{
            setError('')
        }
        setSearch("")
    }
  return (
    <>
    <div className='container'>
       <div className='inputs'>
        <input placeholder='Enter city,country name' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={fetchData}><i class="fa-solid fa-magnifying-glass"></i></button>
       </div>
       <div>
        {
            error ? <div className='errorPage'>
                <p>{error}</p>
                <img src={errorImg}/>
            </div>:""
        }
        {
            data && data.weather ? <div className='weathers'>
                <h2 className='cityName'>{data.name}</h2>
                <img src={data.weather[0].main == "Clouds" ? cloud : ""}/>
                <img src={data.weather[0].main == "Rain" ? rain: ""}/>
                <img src={data.weather[0].main == "Clear" ? clear: ""}/>
                <img src={data.weather[0].main == "Mist" ? mist : ""}/>
                <img src={data.weather[0].main == "Haze" ? cloud : ""}/>
                <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                <p className='climate'>{data.weather[0].description}</p>
            </div>:""
        }
       </div>
    </div>
    </>
  )
}

export default Wheather
