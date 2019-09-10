module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb'],
  rules: {
    'object-curly-newline': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 0,
    'space-before-function-paren': ['error', 'always'],
    'react/jsx-closing-bracket-location': 0,
    'comma-dangle': ['error', 'always'],
  },
};
