import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import Dialpad from '../DialpadForm/Dialpad/Dialpad';
import ColorPalette from '../../../styles/ColorPalette';

const dialpadstyles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  DialpadButtonContainer: {
    alignItems: 'center',
    top: '35%'
  },
  DialpadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: ColorPalette.primary,
    borderRadius: 50
  },
  CloseDialpadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: ColorPalette.primary,
    borderRadius: 50
  }
});

function DialpadButton({ display, onPress, updatePhoneNumber }) {
  if (display)
    return (
      <View
        style={{
          width: '100%',
          top: '30%'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginBottom: '1%'
          }}
        >
          <TouchableOpacity
            style={dialpadstyles.CloseDialpadButton}
            onPress={() => {
              onPress();
            }}
          >
            <Icon name="close" size={15} color="white" type="ionicons" />
          </TouchableOpacity>
        </View>
        <Dialpad
          height="60%"
          updatePhoneNumber={e => {
            updatePhoneNumber(e);
          }}
        />
      </View>
    );
  return (
    <View style={dialpadstyles.DialpadButtonContainer}>
      <TouchableOpacity
        style={dialpadstyles.DialpadButton}
        onPress={() => {
          onPress();
        }}
      >
        <Icon name="dialpad" size={25} color="white" type="ionicons" />
      </TouchableOpacity>
    </View>
  );
}

export default DialpadButton;
