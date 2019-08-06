import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  hangupButtonContainer: {
    alignItems: 'center'
  },
  hangupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#f12121',
    borderRadius: 50,
    transform: [{ rotate: '135deg' }]
  }
});

export default styles;
