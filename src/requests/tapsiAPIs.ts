import axios from "axios";

const TAPSI_BASE_URL = "https://api.tapsi.cab/api";

export async function requestTapsiSMSToken(body) {
  const response = await axios.post(`${TAPSI_BASE_URL}/v2.2/user`, body);
  return response.data;
}

export async function verifyTapsiSMSToken(body) {
  const response = await axios.post(
    `${TAPSI_BASE_URL}/v2.1/user/confirm/web`,
    body,
    {
      headers: {
        "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
      },
    }
  );
  return response.data;
}


export async function getTapsiNewPrice(body){
  const response = await axios.post(`${TAPSI_BASE_URL}/v2.4/ride/preview`, body, {headers:{
    "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0"
  }})
  return response.data
}

const sampleHeader = `accept:
*/*
accept-encoding:
gzip, deflate, br
accept-language:
en-US,en;q=0.9
connection:
keep-alive
content-length:
221
content-type:
application/json
cookie:
token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MDY1Mzc1LCJyb2xlIjoiUEFTU0VOR0VSIiwiY2l0eSI6IlRFSFJBTiJ9LCJ0b2tlbklkIjoiNTk5MTkxODAtN2Y4YS0xMWVkLTlmMzEtYzVhMDUxMmY2MDYxIiwidmVyc2lvbiI6InYxIiwiaWF0IjoxNjcxNDQ2NzcwLCJhdWQiOiJkb3Jvc2hrZTphcHAiLCJpc3MiOiJkb3Jvc2hrZTpzZXJ2ZXIiLCJzdWIiOiJkb3Jvc2hrZTp0b2tlbiJ9.yStCY-vAn8FAZxMof6GoRNbLglmfsDYYFRyn-iO2JjssrUb7sBHC0Dqvg0tLEd7BpFdaWsIv9VO1XY172GTtnw
host:
api.tapsi.cab
origin:
https://app.tapsi.cab
referer:
https://app.tapsi.cab/
sec-ch-ua:
"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"
sec-ch-ua-mobile:
?0
sec-ch-ua-platform:
"Linux"
sec-fetch-dest:
empty
sec-fetch-mode:
cors
sec-fetch-site:
same-site
user-agent:
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36
x-agent:
v2.2|passenger|WEBAPP|6.1.3||5.0
x-authorization:
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MDY1Mzc1LCJyb2xlIjoiUEFTU0VOR0VSIiwiY2l0eSI6IlRFSFJBTiJ9LCJ0b2tlbklkIjoiNTk5MTkxODAtN2Y4YS0xMWVkLTlmMzEtYzVhMDUxMmY2MDYxIiwidmVyc2lvbiI6InYxIiwiaWF0IjoxNjcxNDQ2NzcwLCJhdWQiOiJkb3Jvc2hrZTphcHAiLCJpc3MiOiJkb3Jvc2hrZTpzZXJ2ZXIiLCJzdWIiOiJkb3Jvc2hrZTp0b2tlbiJ9.yStCY-vAn8FAZxMof6GoRNbLglmfsDYYFRyn-iO2JjssrUb7sBHC0Dqvg0tLEd7BpFdaWsIv9VO1XY172GTtnw`

const sampleBody = {
  "origin": {
    "latitude": 35.70250735866561,
    "longitude": 51.38118097037284
  },
  "destinations": [
    {
      "latitude": 35.70546800000001,
      "longitude": 51.389309000000026
    }
  ],
  "hasReturn": false,
  "waitingTime": 0,
  "gateway": "CAB",
  "initiatedVia": "WEB"
}

const sampleResponse = {
  "result": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcmV2aWV3RGF0YSI6eyJvcmlnaW4iOnsibGF0aXR1ZGUiOjM1LjcwMjUwNzM1ODY2NTYxLCJsb25naXR1ZGUiOjUxLjM4MTE4MDk3MDM3Mjg0fSwiZGVzdGluYXRpb25zIjpbeyJsYXRpdHVkZSI6MzUuNzA1NDY4MDAwMDAwMDEsImxvbmdpdHVkZSI6NTEuMzg5MzA5MDAwMDAwMDI2fV0sImhhc1JldHVybiI6ZmFsc2UsIndhaXRpbmdUaW1lIjowfSwicHJpY2VEYXRhIjpbeyJzZXJ2aWNlS2V5IjoiTk9STUFMIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MTgwMDB9LHsic2VydmljZUtleSI6IlBMVVMiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjoyMzUwMH0seyJzZXJ2aWNlS2V5IjoiQVNTSVNUQU5UIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MjIwMDB9LHsic2VydmljZUtleSI6IkRFTElWRVJZIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MjA1MDB9LHsic2VydmljZUtleSI6IkJJS0VfREVMSVZFUlkiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjozNTAwMH1dLCJ1dWlkIjoiNjg0OTlkNzAtN2Y4Yi0xMWVkLWJlMTItYjljYjJiNWU3YWY5IiwiaWF0IjoxNjcxNDQ3MjI0LCJleHAiOjE2NzE0NDcyOTQsImF1ZCI6ImRvcm9zaGtlOmFwcCIsImlzcyI6ImRvcm9zaGtlOnNlcnZlciIsInN1YiI6ImRvcm9zaGtlOnRva2VuIn0.U70lkX5-2bS4qRxS_-KO4vqwRev8-XXd1JpvpZWm2Xd-_V-g_010FunthMZHbJ6fXl_NEDGHLgWJugL_MY19Qw",
    "origin": {
      "address": "تهران، جمالزاده، خ. فرصت شیرازی، نرسیده به خ. قریب",
      "shortAddress": "تهران، جمالزاده، خ. فرصت شیرازی، نرسیده به خ. قریب",
      "location": {
        "latitude": 35.70250735866561,
        "longitude": 51.38118097037284
      }
    },
    "destinations": [
      {
        "address": "تهران، جمالزاده، خ. نصرت، بعد از خ. کارگر شمالی",
        "shortAddress": "تهران، جمالزاده، خ. نصرت، بعد از خ. کارگر شمالی",
        "location": {
          "latitude": 35.70546800000001,
          "longitude": 51.389309000000026
        }
      }
    ],
    "hasReturn": false,
    "waitingTime": 0,
    "categories": [
      {
        "key": "SUGGESTION",
        "title": "پیشنهادی",
        "services": [
          {
            "key": "NORMAL",
            "isAvailable": true,
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "پایان سفر: ۱۴:۳۲",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 18000,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          },
          {
            "key": "PLUS",
            "isAvailable": true,
            "notAvailableText": "",
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "پایان سفر: ۱۴:۳۲",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 23500,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          },
          {
            "key": "BIKE_DELIVERY",
            "isAvailable": true,
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 35000,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          }
        ]
      },
      {
        "key": "NORMAL",
        "title": "دربستی",
        "services": [
          {
            "key": "NORMAL",
            "isAvailable": true,
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "پایان سفر: ۱۴:۳۲",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 18000,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          },
          {
            "key": "PLUS",
            "isAvailable": true,
            "notAvailableText": "",
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "پایان سفر: ۱۴:۳۲",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 23500,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          }
        ]
      },
      {
        "key": "ASSISTANT",
        "title": "خدماتی",
        "services": [
          {
            "key": "BIKE_DELIVERY",
            "isAvailable": true,
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 35000,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          },
          {
            "key": "DELIVERY",
            "isAvailable": true,
            "disclaimer": "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            "subtitle": "پایان سفر: ۱۴:۳۲",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 20500,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          },
          {
            "key": "ASSISTANT",
            "isAvailable": true,
            "disclaimer": "زمان رسیدن بسته، به صورت حدودی ۱۴:۳۴ است.",
            "subtitle": "پایان سفر: ۱۴:۳۴",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 22000,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          }
        ]
      },
      {
        "key": "ECONOMIC",
        "title": "اقتصادی",
        "services": [
          {
            "key": "LINE",
            "isAvailable": false,
            "notAvailableText": "الان در مسیر شما فعال نمی‌باشد",
            "disclaimer": "پیدا شدن راننده، ممکن است تا ۶ دقیقه طول بکشد.",
            "subtitle": "۱۴:۲۸ - ۱۴:۲۸",
            "prices": [
              {
                "type": "CERTAIN",
                "passengerShare": 0,
                "discount": 0,
                "numberOfPassengers": 1,
                "discountPercentage": null
              }
            ],
            "pickupSuggestions": []
          }
        ]
      }
    ],
    "ttl": 60,
    "surpriseElement": {
      "isApplied": false,
      "isEnabled": false,
      "rewardId": null,
      "percentage": null,
      "userId": 7065375,
      "upToAmount": 0,
      "type": 1
    }
  }
}