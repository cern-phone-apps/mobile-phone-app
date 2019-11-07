import { createStackNavigator } from 'react-navigation-stack';
import DialpadScreenContainer from '../screens/DialpadScreen/DialpadScreenContainer';
import ColorPalette from '../../styles/ColorPalette';

const DialpadStack = createStackNavigator({
  Dialpad: {
    screen: DialpadScreenContainer,
    navigationOptions: () => {
      return {
        headerTitleStyle: {
          color: 'white',
          flex: 3
        },
        title: `CERN Phone Mobile`,
        headerStyle: {
          backgroundColor: ColorPalette.primary
        },
        headerTintColor: 'white'
      };
    }
  }
});

export default DialpadStack;
