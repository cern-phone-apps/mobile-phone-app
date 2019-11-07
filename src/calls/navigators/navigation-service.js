import { NavigationActions } from 'react-navigation';

let customNavigator;

function setTopLevelNavigator(navigatorRef) {
  customNavigator = navigatorRef;
}

function navigate(routeName, params) {
  customNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
};
