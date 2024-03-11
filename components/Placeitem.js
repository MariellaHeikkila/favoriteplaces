import { View, Text, Pressable } from 'react-native';
import EnTypo from '@expo/vector-icons/Entypo';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, PLACES_REF } from '../firebase/Config';
import styles from '../styles/style';

export const PlaceItem = ({ title, id}) => {

    const onRemove = async () => {
        try {
            await deleteDoc(doc(db, PLACES_REF, id))
        } catch (error) {
            alert('Error removing document: ' + error)
        }
    }
    console.log(title);

    return(
        <View style={styles.placeItem}>
            <Text style={styles.placeTitle}>{title}</Text>
            <Pressable onPress={onRemove}>
                <EnTypo name="trash" size={24} color="black" />
            </Pressable>
        </View>
    )

}