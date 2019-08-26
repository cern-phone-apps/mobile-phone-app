import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Dialpad from '../DialpadForm/Dialpad/Dialpad';
import { Icon } from 'react-native-elements';
import ColorPalette from '../../../styles/ColorPalette';


const dialpadstyles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    DialpadButtonContainer: {
        alignItems: 'center',
        top: "42%"
    },
    DialpadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: ColorPalette.primary,
        borderRadius: 50
    }
  });

function DialpadButton({ display, onPress, updatePhoneNumber }) {
  if (display) return <View style={{ width: "100%", top: "42%", flex: 1 }}><Dialpad updatePhoneNumber={(e) => { updatePhoneNumber(e) }}/></View>;
  return (
    <View style={dialpadstyles.DialpadButtonContainer}>
      <TouchableOpacity style={dialpadstyles.DialpadButton} onPress={() => { onPress(); }}>
        <Icon
          name="dialpad"
          size={25}
          color="white"
          type="ionicons"
        />
      </TouchableOpacity>
    </View>
  );
}

export default DialpadButton;
