import React, { useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/style';
import { useState, useRef } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db, PLACES_REF } from '../firebase/Config';
import Weather from '../components/Weather';


const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;
const ANIMATE_SECONDS = 3;

export default function PlaceMap() {

    const [isLoading, setIsLoading] = useState(true);
    const [streetAddress, setStreetAddress] = useState('');
    const [latitudeOfLastLocation, setLatitudeOfLastLocation] = useState(0);
    const [longitudeOfLastLocation, setLongitudeOfLastLocation] = useState(0);
    const [isPlaceTitleInputVisible, setIsPlaceTitleInputVisible] = useState(false);
    const [newPlace, setNewPlace] = useState('');
    const [places, setPlaces] = useState({});
    const mapRef = useRef(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            try {
                if (status !== 'granted') {
                    setIsLoading(false);
                    alert('Geolocation failed.')
                    return;
                }
                let location = await Location.getLastKnownPositionAsync(
                    {accuracy: Location.Accuracy.High});
                setLatitudeOfLastLocation(location.coords.latitude);
                setLongitudeOfLastLocation(location.coords.longitude);
                const q = query(collection(db, PLACES_REF))
                onSnapshot(q, (querySnapshot) => {
                    setPlaces(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })))
                    })
                setIsLoading(false);
            } catch (error) {
                alert('catch ' + error)
                setIsLoading(false);
            }            
        })();
    }, []);

    const addMarker = (coords) => {
        if (!isPlaceTitleInputVisible) {
            const newPlaceCoords = [...places, coords]
            setPlaces(newPlaceCoords);
            setLatitudeOfLastLocation(coords.latitude);
            setLongitudeOfLastLocation(coords.longitude);
            setIsPlaceTitleInputVisible(true);
        }
    }

    const searchStreetAddress = async () => {
        try {
            const location = await Location.geocodeAsync(streetAddress);
            const region = {
                latitude: location[0].latitude,
                longitude: location[0].longitude,
                latitudeDelta: INITIAL_LATITUDE_DELTA,
                longitudeDelta: INITIAL_LONGITUDE_DELTA
            }
            mapRef.current.animateToRegion(region, ANIMATE_SECONDS * 1000);
            setLatitudeOfLastLocation(location[0].latitude);
            setLongitudeOfLastLocation(location[0].longitude);
            setStreetAddress('');
            setIsPlaceTitleInputVisible(false);
        }
        catch (error) {
            alert('catch ' + error)
            setIsLoading(false);
        }
    }

    const addPlace = async () => {
        try {
            console.log('adding place..');
            if (newPlace.trim() !== '') {   
            await addDoc(collection(db, PLACES_REF), {
                title: newPlace,
                latitude: latitudeOfLastLocation,
                longitude: longitudeOfLastLocation
            })
            console.log('place added');
        } else {
            console.log('place not added');
        }
            setNewPlace('');
            setIsPlaceTitleInputVisible(false);
        }
        catch (error) {
            alert('catch ' + error)
            setIsLoading(false);
        }
    }

    const setCoords = (latitude, longitude) => {
        setLatitudeOfLastLocation(latitude);
        setLongitudeOfLastLocation(longitude);
    }

    let placesKeys = Object.keys(places);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Retrieving location...</Text>
            </View>
        );
    } else {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
      ref={mapRef}
      showsUserLocation={true}
      style={styles.map}
      initialRegion={{
        latitude: latitudeOfLastLocation,
        longitude: longitudeOfLastLocation,
        latitudeDelta: INITIAL_LATITUDE_DELTA,
        longitudeDelta: INITIAL_LONGITUDE_DELTA
      }}
      onLongPress={e => addMarker(e.nativeEvent.coordinate)}
      >
        {placesKeys.map((key, i) => (
            <Marker
            key={i}
            pinColor="blue"
            title={places[key].title}
            onPress={() => setCoords(places[key].latitude, places[key].longitude)}
            coordinate={{
                latitude: places[key].latitude,
                longitude: places[key].longitude
            }}
            />
        ))}
      </MapView>
      {!isPlaceTitleInputVisible &&
      <View style={styles.search}>
        <TextInput
        style={styles.streetAddress}
        onChangeText={address => setStreetAddress(address)}
        value={streetAddress}
        placeholder="Enter street address here"
        />
        <Button
        title='Search'
        onPress={() => searchStreetAddress()}
        />
      </View>
      }
      {isPlaceTitleInputVisible &&
      <View style={styles.newPlace}>
        <TextInput
        style={styles.newPlaceTitle}
        onChangeText={title => setNewPlace(title)}
        value={newPlace}
        placeholder="Enter place title here"
        />
        <TouchableOpacity
        style={styles.button}
        onPress={() => addPlace()}
        >
        <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>
      </View>
      }
      {/* <View style={styles.weather}>
        <Weather 
        latitude={latitudeOfLastLocation} 
        longitude={longitudeOfLastLocation}/>
      </View> */}
    </View>
  );
}
}