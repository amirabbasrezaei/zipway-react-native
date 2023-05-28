import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "https://api.snapp.site/v2/passenger/newprice/s/1/251";

const TOKEN = `Bearer eyJhbGciOiJSUzUxMiIsImtpZCI6Ino4YTRsNG9PRkVxZ2VoUllEQlpQK2ZwclBuTERMbWFia3NsT3hWVnBMTkUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsicGFzc2VuZ2VyIl0sImVtYWlsIjoiYWJiYXNzeHoyQGdtYWlsLmNvbSIsImV4cCI6MTY3MjIxOTc4MSwiaWF0IjoxNjcxMDEwMTgxLCJpc3MiOjEsImp0aSI6IjFqOEhKSHVSRWUyNHhiSjBQVjRsNlhtTlBETUJuRWJjbXdkaktkZnlpOEkiLCJzaWQiOiIySXRvTEFDN3F6NjZtdTJ2NTFWcGpXdUEzODUiLCJzdWIiOiJnM216MG5uMXB6cjBRbGUifQ.HDMSfJHqwAPRTHQN4hLUc9-HJMk5x3raYRANXWK3crJaa-6qNCR92xq-s2d4tixXNUpVRbDiJeJ6P_wBQtfjQ-aoG1i_zNy2PEqeRrjNVtgZKkf3A5zVnGqPgRhzIb9Ni5SdJJIHCAUHLPnP_KbRzq8nMp17Gxwozrn9usHoWlQU1Kvhmb2Il4h_dNeP6WPrnyQdPwKQBuCbcvOYii42xFo13tRTQgur6bHIDWhZw6Nqoy6_zk-SUn18FOMDH3-TTl_kw1RY-my4bM-DuYpOnrRf6GDeMUcxi9j4qRkFh2UKGkyvGxhaGRkgqOtQnE1dKOW_FEuPL8wdE52oQ-HQQ67BGKw4R25s7uiRB1djEZoNw22QrFtZiuH0palHomjunG4H-tAqRYDJvPq0oYawCguK-NLN5R-JTjxFCffPeRO-DBnfEz-zJ3KSjHP91frzs5gD6aCnPxHnmZHZq6QaOt1RtOo60C7s_jZHAq65bmhr5y09VcqtA8ClEAWMa7Yh4FP_lEM_t07XE94RbVU1YBrSUTLHyslRU8FkGb59WZmZGqwInuOOQ-JUe10WNRgn8pYffx8zS3U3jUwjaMx-qO9TVwoDDCnl6kyhkVAhHi_16u2U49blqnoCZTLHZeBFHPPXQ0WD_VvmdYmUHiTfhgqJH3WgL48AnDMnTZ-SBS8`;

const myData = {
  hurry_price: "0",
  package_delivery: false,
  round_trip: false,
  points: [
    {
      lat: 35.70764200000001,
      lng: 51.35572100000002,
    },
    {
      lat: 35.72654610732359,
      lng: 51.37730673972399,
    },
  ],
  service_types: [1, 2],
  tag: "1",
};
export async function getNewPrice(data: any) {
  const newData = await JSON.stringify(data);
  const response = await axios.post(BASE_URL, data, {
    headers: {
      authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      "content-type": "application/json; charset=utf-8",
      "jaeger-debug-id": "1cb95d90-4a0b-475b-a207-b8353234bb3c",
      locale: "fa-IR",
      "package-name": "cab.snapp.passenger.play",
      "user-agent": "Android 11 ; Samsung SM-A525F ; Passenger/8.0.3",
      "x-app-version-code": 251,
    },
  });

  return response.data;
}

export async function getSnappedPointRequest(input) {
  const response = await axios.post(
    "https://locations.snapp.site/v1/passenger/pin/service",
    input,
    {
      headers: {
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
        "content-type": "application/json; charset=utf-8",
        "jaeger-debug-id": "1cb95d90-4a0b-475b-a207-b8353234bb3c",
        locale: "fa-IR",
        "package-name": "cab.snapp.passenger.play",
        "user-agent": "Android 11 ; Samsung SM-A525F ; Passenger/8.0.3",
        "x-app-version-code": 251,
      },
    }
  );

  return response;
}

export async function snappConfigRequest({ body, header }) {
  const BASE_URL = "https://api.snapp.site/v2/passenger/config";
  const response = await axios.post(BASE_URL, body, { headers: header });
  return response.data;
}

export async function ouathSnappRequest(body, headers) {
  const BASE_URL = `https://oauth-passenger.snapp.site/v2/otp`;
  const response = await axios.post(BASE_URL, body, {
    headers,
  });
  return response.data;
}

export async function verifySnappSmsTokenRequest(body) {
  const BASE_URL = `https://oauth-passenger.snapp.site/v2/auth/`;
  const response = await axios.post(BASE_URL, body);
  return response.data;
}

export async function snappServiceTypesRequest(body, headers) {
  const response = await axios.post(
    `https://blackgate.snapp.site/v2/servicetypes`,
    body,
    {
      headers: {
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
        ...headers,
      },
    }
  );
  return response.data;
}

export async function snappWaitingGifRequest() {
  const response = await axios.get(`https://api.snapp.site/v2/passenger/gif`, {
    headers: {
      authorization: await SecureStore.getItemAsync("snapp-accessToken"),
    },
  });
  return response.data;
}

export async function snappNewRideRequest(data, headers) {
  const response = await axios.post(
    "https://api.snapp.site/v2/passenger/ride",
    data,
    {
      headers: {
        ...headers,
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      },
    }
  );

  console.log(response.data);

  return response.data;
}

export async function snappCancelRideRequest(rideId, headers) {
  const response = await axios.patch(
    `https://api.snapp.site/v2/passenger/ride/${rideId}/cancel/inride`,
    {},
    {
      headers: {
        ...headers,
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      },
    }
  );

  const sampleRes = {
    data: {
      message: "ride cancelled successfully",
    },
    status: 200,
  };
  return response.data;
}

export async function snappCancelWaitingRequest(rideId,headers) {
  const response = await axios.patch(
    `https://api.snapp.site/v2/passenger/ride/${rideId}/cancel/waiting`,
    {},
    {
      headers: {
        ...headers,
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      },
    }
  );

  const sampleRes = {
    data: {
      message: "ride cancelled successfully",
    },
    status: 200,
  };
  return response.data;
}

export async function snappRideEventRequest(headers) {
  const response = await axios.get(
    `https://api.snapp.site/v2/passenger/event`,
    {
      headers: {
        ...headers,
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      },
    }
  );
  return response.data;
}

export async function snappAcknowledgement(body, headers) {
  const response = await axios.post(
    `https://ackerman.apps.public.okd4.teh-2.snappcloud.io/v1/acknowledgments`,
    body,
    {
      headers: {
        ...headers,
        authorization: await SecureStore.getItemAsync("snapp-accessToken"),
      },
    }
  );
}
