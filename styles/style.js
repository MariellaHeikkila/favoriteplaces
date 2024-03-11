import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  search: {
    flexDirection: 'row',
    position: 'absolute',
    top: 14,
    left: 20,
    width: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
  streetAddress: {
    marginRight: 10,
    paddingLeft: 10
  },
  newPlace: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    left: 20,
    width: '60%',
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
  newPlaceTitle: {
    marginRight: 10,
    paddingLeft: 10
  },
  weather: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  currentWeather: {
    fontWeight: 'bold',
    fontSize: 15
  },
  weatherImage: {
    width: 40,
    height: 40
  },
  modalWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "25%",
    height: 100,
    width: '55%',
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray"
  },
  modalTextInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  placeItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10
  },
  placeTitle: {
    marginRight: 10,
    minWidth: '70%',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10
  },
  settings: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    fontSize: 15,
    marginLeft: 10
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
})