import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { MY_API_KEY } from '../api';
import styles from '../styles/style';

const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const API_KEY = MY_API_KEY
const ICON_URL  = "https://openweathermap.org/img/wn/"

export default function Weather({latitude, longitude}) {

    const [temp, setTemp] = useState(0)
    const [desc, setDesc] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const url = `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setTemp(data.main.temp)
            setDesc(data.weather[0].description)
            setIcon(ICON_URL + data.weather[0].icon + '@2x.png')
        },
        (error) => {
            alert(error)
        })
    },[latitude, longitude])

  return (
    <View>
        <Text style={styles.currentWeather}>Temperature: {temp}°C</Text>
        <Text style={styles.currentWeather}>Description: {desc}</Text>
        <Image
            style={styles.weatherImage}
            source={{uri: icon ? icon : null}}
        />
    </View>
  );
}
