import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import AuthLoadingScreenContainer from './src/auth/screens/AuthLoadingScreen/AuthLoadingScreenContainer';
import AuthStack from './src/auth/navigators/auth';
import AppFullStack from './src/calls/navigators';
import NavigationService from './src/calls/navigators/navigation-service';

const TopLevelNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreenContainer, // Redirects the user to either of the stacks
    App: AppFullStack, // Application
    Auth: AuthStack // Authentication
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

/**
 * We redirect the user either to the AppStack or to the Authentication Stack
 */
// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
