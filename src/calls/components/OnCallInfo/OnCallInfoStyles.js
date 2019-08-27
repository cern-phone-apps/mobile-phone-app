import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  ongoingCall: {
    fontSize: 20,
    opacity: 0.6,
    position: 'absolute',
    top: '10%'
  },
  remoteInfo: {
    alignItems: 'center',
    position: 'absolute',
    transform: [{ translateY: 0.5 }],
    top: '20%'
  },
  remoteName: {
    fontSize: 25
  },
  remoteNumber: {
    fontSize: 20
  }
});
