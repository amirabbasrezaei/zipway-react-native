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
      authorization:  await SecureStore.getItemAsync("snapp-accessToken") ,
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

const data = {
  access_token:
    "eyJhbGciOiJSUzUxMiIsImtpZCI6Ino4YTRsNG9PRkVxZ2VoUllEQlpQK2ZwclBuTERMbWFia3NsT3hWVnBMTkUiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsicGFzc2VuZ2VyIl0sImVtYWlsIjoiYWJiYXNzeHoyQGdtYWlsLmNvbSIsImV4cCI6MTY3MDkxNDI5NywiaWF0IjoxNjY5NzA0Njk3LCJpc3MiOjEsImp0aSI6IlJYVVVzMit5RWUySC9YbzFDVVlSUy9DTVVIN3lra3BxbTdJRmI0ejVPaFEiLCJzaWQiOiIySUQ4R1hSTkVGcTFRQ0VVMUFJbGZQcmYyUXEiLCJzdWIiOiJnM216MG5uMXB6cjBRbGUifQ.MWaK7jhEo7DKBeMU0GWRxcUQBYTCy7gIWMLT7Jzho_Mi6SSRoVLlKd5l3tJ6Haa0PFG-OhdQO9kK5maTFPvaUPcNpY8dPdz0CmLf62A6RC85XpyZJY_qfjXX6iKco5Ul4qfw2aPHuhikWNAqSroAhNoNNjlaKBvbfm7O62SFVFsdenVYnqiWvCd_bwPWma8Nlqy2gDwPsjAThBRAf2xChOyjUBq-Ni2DndtVQ8_U7-RPx0Sv9plV_3-xD4DlToO4eR1gGrF_KL9uFkQr_8XHnBL__7TS7fkwxMQ9lQPNxcsLXnYNL-Yf35dW5Har3fKCL2vSRoB2f5H0T38GhJUbPsadT3eoKHnbvnNRvEOcilWfbHriL2fpp8uC0E-NLKhAn1E8b7fUMTWgADsgAjTJYRArq_r7PGa-46NMbF1FydP_PniXyn1KIz5-WJ4T6ynSXG4r4xOEBNXBlextCUzo2zLYV9EZA3V_32onlksccAAgHCkEUwyvZQeJ_sg34PcRdXHiykSQR11CSv4Lo9_HXpSyiouawi0WNrS2VBe5QEhhTHv5I7jSQKoWPxjMGibPPOhxbNtp2Rz6QOR3FsBgLyLtLbtyk_qpCHybD8ehU3ZoPeiQyzozRrcWaghel-rLcE9fVPs3skCm0U-lhw_gqWdHjLnLQ9-CUqnogltnjYY",
  token_type: "Bearer",
  expires_in: 1209600,
  refresh_token:
    "v2.2pIss_u4UQOrMIVCK8RFx5JWOeSWunBSjAG4IT9B3sww6_-tbA_yKNqXgjGxFdqQCv8A9TCACw5IbvbClMFnasSCkRGJ2BjlVwvQ-dR3FUZD2pXKgA==",
  email: "abbassxz2@gmail.com",
  fullname: "عباس",
  is_pending: false,
  is_new_user: false,
  is_email_required: false,
  login_status: 1,
};
