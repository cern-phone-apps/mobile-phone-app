# Dial Mobile (CERN Phone Mobile App)

<img src="docs/screenshots/login-screen.png" width="200"> <img src="docs/screenshots/number-selector.png" width="200"> <img src="docs/screenshots/dial-pad.png" width="200">  <img src="docs/screenshots/on-call.png" width="200">

[View all screenshots](docs/all-screenshots.md)

CERN Phone application to make and receive calls.

[![Build Status](https://travis-ci.com/cern-phone-apps/mobile-phone-app.svg?branch=master)](https://travis-ci.com/cern-phone-apps/mobile-phone-app) [![codecov](https://codecov.io/gh/cern-phone-apps/mobile-phone-app/branch/master/graph/badge.svg)](https://codecov.io/gh/cern-phone-apps/mobile-phone-app) [![Dependency Status](https://david-dm.org/cern-phone-apps/mobile-phone-app.svg)](https://david-dm.org/cern-phone-apps/mobile-phone-app)

## Current limitations

| OS | Status |
| -- | -- |
| Android | Tested and working on Android 9 |
| iOS | Not yet compatible |


## Requirements

To install the following components, please follow the React Native guide for your platform

- Android >= 8.1
- Node >= 11.10.1
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- yarn (>1.16.0)
- React Native >= 0.61

## Development

### Read the docs

- [Contributing Guidelines](docs/CONTRIBUTING.md)
- [Git Basics](docs/git-basics.md)

### Environment setup

1. Follow the steps of the official [React Native documentation](https://facebook.github.io/react-native/docs/0.60/getting-started) to setup your development environment. Since we are using native modules, we need to follow the `React Native CLI Quickstart` guide.

### Updating libs

> ⚠️ Beware of the libs used which contain native code. Some of them are highly dependent on the React Native version and might not be compatible with newer ones.

- [React Native Callkeep](https://github.com/react-native-webrtc/react-native-callkeep)
- [React Native Webrtc](https://github.com/react-native-webrtc/react-native-webrtc)
- [React Native Firebase](https://github.com/invertase/react-native-firebase)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Navigation (and it's dependencies)](https://reactnavigation.org/)
    - [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
    - [React Native Screens](https://github.com/kmagiera/react-native-screens)
    - [React Native Reanimated](https://github.com/software-mansion/react-native-reanimated)
- [React Native Sound](https://github.com/zmxv/react-native-sound)


### Debugging

#### On a physical device

- Shake the phone to display the development menu.

#### On the emulator

- Command + M will display the development menu.

#### Change the debugger port

1. Open the development menu
2. On "Dev Settings" change the "Debug server
host & port for device" to something like:
`localhost:8081`

## Run the app

### On Android

```bash
yarn
yarn run android
```

### Troubleshoot your environment

Running the following command will return a diagnosis of your environment:

```bash
npx @react-native-community/cli doctor
```

## Testing

```bash
yarn test
```

## Packaging and Deployment

- Read the https://facebook.github.io/react-native/docs/signed-apk-android

The following command will generate the `apk` for Android.
```
cd android
./gradlew assembleRelease
```

## Testing Environment

### Type of testing
We make the testing with the @testing-library/react-native. We use principaly for test this different type of elements:
- Components: We test all of the components without the redux state. Only for check the construction of the element and macking a snapshot.
- Reducers and Actions: At the actions and reducers we have all of the logic of the application.
- Other elements with logic: We have other files with a bussines logic.

### Coverage
For make a coverage page in HTML you only need to type at the terminal this:

```
yarn coverage
```

### Excluded files from testing
- We exclude the Containers of the components because they only make a bridge between the redux state and the component.
- We exclude the Navigators from the testing because his all of his logic is tested inside the react-navigation-stack project.


### Testing of the project in the future

For test all of the funtionality of the project we have other tools better than jest.
Jest is the best tool for make unit and integration testing, but we need check the use cases of the application in a real environment for check if the app is running correctly.
For this objetive we are studing diferent tools:

- https://blog.logrocket.com/end-to-end-testing-in-react-native-with-detox/