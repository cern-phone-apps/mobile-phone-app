import { StyleSheet, Dimensions } from 'react-native';
import ColorPalette from '../../../styles/ColorPalette';

export default StyleSheet.create({
  phoneNumberRow: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width
  },
  phoneNumberSideColumn: {
    width: Dimensions.get('screen').width / 7,
    alignSelf: 'center'
  },
  phoneNumberCenterColumn: {
    width: (Dimensions.get('screen').width / 7) * 5
  },
  phoneNumberInput: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30
  },
  callButtonContainer: {
    alignItems: 'center'
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: ColorPalette.callBtnGreen,
    borderRadius: 50
  },
  disabled: {
    opacity: 0.3
  }
});
