import { View, Text,TextInput,Button } from 'react-native';
import React from 'react';
import axios from 'axios';

export default function App() {
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [temp, setTemp] = React.useState("");
  const [feelsLike, setFeelsLike] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [pressure, setPressure] = React.useState("");
  const [windSpeed, setWindSpeed] = React.useState(0);
  const [description, setDescription] = React.useState(0);
  const [sunrise, setSunrise] = React.useState(0);
  const [sunset, setSunset] = React.useState(0);
  const [name, setName] = React.useState("");

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "fa830c84fb00243e5e887f71b6d16ed9";

  const getWeather = async () => {
    return await axios
      .get(`${url}?q=${city},${country}&appid=${apiKey}&units=metric`)
      .then((res) => {
        console.log(res.data.weather[0].description)
        setCity('');
        setCountry('');
        setTemp(res.data.main.temp);
        setFeelsLike(res.data.main.feels_like);
        setHumidity(res.data.main.humidity);
        setPressure(res.data.main.pressure);
        setName(res.data.name);
        setSunrise(res.data.sys.sunrise);
        setSunset(res.data.sys.sunset);
        setDescription(res.data.weather[0].description);
        setWindSpeed(res.data.wind.speed);


      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{width:'90%',alignSelf:'center'}}>
      <Text style={{fontSize:30,textAlign:'center',fontWeight:'700'}}>Weather App</Text>
      <TextInput
        style={{
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          margin: 10,
          borderRadius: 10,

        }}
        placeholder="City"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <TextInput
        style={{
          borderRadius: 10,
          borderColor: "black",
          borderWidth: 1,
          padding: 10,
          margin: 10,

        }}
        placeholder="Country"
        onChangeText={(text) => setCountry(text)}
        value={country}
      />
      <View style={{margin:10,width:'80%',alignSelf:'center'}}>
      <Button title="Get Weather" onPress={getWeather} />
      </View>
      <View style={{margin:10,width:'80%',alignSelf:'center'}}>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>City:{name}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Temperature:{temp}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Feels Like:{feelsLike}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Humidity:{humidity}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Pressure:{pressure}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Wind Speed:{windSpeed}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Description:{description}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Sunrise:{new Date(sunrise * 1000).toLocaleTimeString()}</Text>
      <Text style={{fontSize:22,fontWeight:'500',marginTop:5}}>Sunset:{new Date(sunset * 1000).toLocaleTimeString()}</Text>
      </View>

    </View>
  );
}
