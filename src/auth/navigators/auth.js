import { createStackNavigator } from 'react-navigation-stack';
import LoginScreenContainer from '../screens/LoginScreen/LoginScreenContainer';
import LoginWebViewContainer from '../screens/LoginWebView/LoginWebViewContainer';
import ColorPalette from '../../styles/ColorPalette';

export default createStackNavigator({
  SignIn: {
    screen: LoginScreenContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white',
        flex: 3
      },
      title: `Sign in`,
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  },
  LoginWebView: {
    screen: LoginWebViewContainer,
    navigationOptions: () => ({
      headerTitleStyle: {
        color: 'white',
        flex: 3
      },
      title: `Input your credentials`,
      headerStyle: {
        backgroundColor: ColorPalette.primary
      },
      headerTintColor: 'white'
    })
  }
});
