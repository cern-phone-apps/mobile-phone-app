import { RSAA } from 'redux-api-middleware';

export const ADD_PUSH_DEVICE_REQUEST = '@@push/ADD_PUSH_DEVICE_REQUEST';
export const ADD_PUSH_DEVICE_SUCCESS = '@@push/ADD_PUSH_DEVICE_SUCCESS';
export const ADD_PUSH_DEVICE_FAILURE = '@@push/ADD_PUSH_DEVICE_FAILURE';

const API_PATH = '/api/v1';

export default function(apiEndpoint, tokenHandlerClass = null) {
  const buildApiURL = path => `${apiEndpoint}${API_PATH}${path}`;

  const authHandlerClass = tokenHandlerClass;

  return {
    addPushDevice: (deviceToken, phoneNumber, deviceName) => ({
      [RSAA]: {
        endpoint: buildApiURL('/push-devices/'),
        method: 'POST',
        options: { timeout: 3000 },
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ deviceToken, phoneNumber, deviceName }),
        types: [
          ADD_PUSH_DEVICE_REQUEST,
          ADD_PUSH_DEVICE_SUCCESS,
          ADD_PUSH_DEVICE_FAILURE
        ]
      }
    })
  };
}
