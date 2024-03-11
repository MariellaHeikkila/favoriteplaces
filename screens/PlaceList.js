import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, PLACES_REF } from '../firebase/Config';
import { PlaceItem } from '../components/Placeitem';
import styles from '../styles/style';

export default function PlaceList() {

  const [places, setPlaces] = useState({})

  useEffect(() => {
    const q = query(collection(db, PLACES_REF), orderBy('title'))
    onSnapshot(q, (querySnapshot) => {
      setPlaces(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
  }, [])

  let placesKeys = Object.keys(places)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My favorite places ({placesKeys.length})</Text>
      <ScrollView>
        {placesKeys.map((key, i) => (
          <PlaceItem 
          key={key} 
          title={places[i].title} 
          id={places[key].id} />
        ))}
      </ScrollView>
    </View>
  );
}