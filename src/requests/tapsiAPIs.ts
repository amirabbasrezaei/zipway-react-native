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

//// tapsi ride price
export async function getTapsiNewPrice(body) {
  const response = await axios.post(
    `${TAPSI_BASE_URL}/v2.4/ride/preview`,
    body,
    {
      headers: {
        "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
      },
    }
  );
  return response.data;
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
eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3MDY1Mzc1LCJyb2xlIjoiUEFTU0VOR0VSIiwiY2l0eSI6IlRFSFJBTiJ9LCJ0b2tlbklkIjoiNTk5MTkxODAtN2Y4YS0xMWVkLTlmMzEtYzVhMDUxMmY2MDYxIiwidmVyc2lvbiI6InYxIiwiaWF0IjoxNjcxNDQ2NzcwLCJhdWQiOiJkb3Jvc2hrZTphcHAiLCJpc3MiOiJkb3Jvc2hrZTpzZXJ2ZXIiLCJzdWIiOiJkb3Jvc2hrZTp0b2tlbiJ9.yStCY-vAn8FAZxMof6GoRNbLglmfsDYYFRyn-iO2JjssrUb7sBHC0Dqvg0tLEd7BpFdaWsIv9VO1XY172GTtnw`;

const sampleBody = {
  origin: {
    latitude: 35.70250735866561,
    longitude: 51.38118097037284,
  },
  destinations: [
    {
      latitude: 35.70546800000001,
      longitude: 51.389309000000026,
    },
  ],
  hasReturn: false,
  waitingTime: 0,
  gateway: "CAB",
  initiatedVia: "WEB",
};

const sampleResponse = {
  result: "OK",
  data: {
    token:
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcmV2aWV3RGF0YSI6eyJvcmlnaW4iOnsibGF0aXR1ZGUiOjM1LjcwMjUwNzM1ODY2NTYxLCJsb25naXR1ZGUiOjUxLjM4MTE4MDk3MDM3Mjg0fSwiZGVzdGluYXRpb25zIjpbeyJsYXRpdHVkZSI6MzUuNzA1NDY4MDAwMDAwMDEsImxvbmdpdHVkZSI6NTEuMzg5MzA5MDAwMDAwMDI2fV0sImhhc1JldHVybiI6ZmFsc2UsIndhaXRpbmdUaW1lIjowfSwicHJpY2VEYXRhIjpbeyJzZXJ2aWNlS2V5IjoiTk9STUFMIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MTgwMDB9LHsic2VydmljZUtleSI6IlBMVVMiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjoyMzUwMH0seyJzZXJ2aWNlS2V5IjoiQVNTSVNUQU5UIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MjIwMDB9LHsic2VydmljZUtleSI6IkRFTElWRVJZIiwibnVtYmVyT2ZQYXNzZW5nZXJzIjoxLCJwYXNzZW5nZXJTaGFyZSI6MjA1MDB9LHsic2VydmljZUtleSI6IkJJS0VfREVMSVZFUlkiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjozNTAwMH1dLCJ1dWlkIjoiNjg0OTlkNzAtN2Y4Yi0xMWVkLWJlMTItYjljYjJiNWU3YWY5IiwiaWF0IjoxNjcxNDQ3MjI0LCJleHAiOjE2NzE0NDcyOTQsImF1ZCI6ImRvcm9zaGtlOmFwcCIsImlzcyI6ImRvcm9zaGtlOnNlcnZlciIsInN1YiI6ImRvcm9zaGtlOnRva2VuIn0.U70lkX5-2bS4qRxS_-KO4vqwRev8-XXd1JpvpZWm2Xd-_V-g_010FunthMZHbJ6fXl_NEDGHLgWJugL_MY19Qw",
    origin: {
      address: "تهران، جمالزاده، خ. فرصت شیرازی، نرسیده به خ. قریب",
      shortAddress: "تهران، جمالزاده، خ. فرصت شیرازی، نرسیده به خ. قریب",
      location: {
        latitude: 35.70250735866561,
        longitude: 51.38118097037284,
      },
    },
    destinations: [
      {
        address: "تهران، جمالزاده، خ. نصرت، بعد از خ. کارگر شمالی",
        shortAddress: "تهران، جمالزاده، خ. نصرت، بعد از خ. کارگر شمالی",
        location: {
          latitude: 35.70546800000001,
          longitude: 51.389309000000026,
        },
      },
    ],
    hasReturn: false,
    waitingTime: 0,
    categories: [
      {
        key: "SUGGESTION",
        title: "پیشنهادی",
        services: [
          {
            key: "NORMAL",
            isAvailable: true,
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "پایان سفر: ۱۴:۳۲",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 18000,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
          {
            key: "PLUS",
            isAvailable: true,
            notAvailableText: "",
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "پایان سفر: ۱۴:۳۲",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 23500,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
          {
            key: "BIKE_DELIVERY",
            isAvailable: true,
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 35000,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
        ],
      },
      {
        key: "NORMAL",
        title: "دربستی",
        services: [
          {
            key: "NORMAL",
            isAvailable: true,
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "پایان سفر: ۱۴:۳۲",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 18000,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
          {
            key: "PLUS",
            isAvailable: true,
            notAvailableText: "",
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "پایان سفر: ۱۴:۳۲",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 23500,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
        ],
      },
      {
        key: "ASSISTANT",
        title: "خدماتی",
        services: [
          {
            key: "BIKE_DELIVERY",
            isAvailable: true,
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 35000,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
          {
            key: "DELIVERY",
            isAvailable: true,
            disclaimer:
              "زمان تقریبی رسیدن شما به مقصد ۱۴:۳۲ است. امکان تغییر این زمان در شرایط خاص وجود دارد.",
            subtitle: "پایان سفر: ۱۴:۳۲",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 20500,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
          {
            key: "ASSISTANT",
            isAvailable: true,
            disclaimer: "زمان رسیدن بسته، به صورت حدودی ۱۴:۳۴ است.",
            subtitle: "پایان سفر: ۱۴:۳۴",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 22000,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
        ],
      },
      {
        key: "ECONOMIC",
        title: "اقتصادی",
        services: [
          {
            key: "LINE",
            isAvailable: false,
            notAvailableText: "الان در مسیر شما فعال نمی‌باشد",
            disclaimer: "پیدا شدن راننده، ممکن است تا ۶ دقیقه طول بکشد.",
            subtitle: "۱۴:۲۸ - ۱۴:۲۸",
            prices: [
              {
                type: "CERTAIN",
                passengerShare: 0,
                discount: 0,
                numberOfPassengers: 1,
                discountPercentage: null,
              },
            ],
            pickupSuggestions: [],
          },
        ],
      },
    ],
    ttl: 60,
    surpriseElement: {
      isApplied: false,
      isEnabled: false,
      rewardId: null,
      percentage: null,
      userId: 7065375,
      upToAmount: 0,
      type: 1,
    },
  },
};
////

////  tapsi init passenger(pre ride config)

const initPassengerResponse = {
  result: "OK",
  data: {
    activeRide: null,
    activeTip: {
      rideId: "6474c8ae21f1a2193cfada7c",
      tippingInfo: {
        suggestedCharges: [3500, 7000, 11000],
        currency: {
          text: "ریال",
          currencyExchangeRate: 10,
        },
        tip: {
          status: "UNTIPPED",
        },
      },
    },
    activeSafety: {
      status: "ENABLE",
      expiredAt: 1685380514000,
    },
    shareRide: {
      text: "در حال سفر با تپسی هستم. لطفا با استفاده از لینک زیر، از روند این سفر باخبر باشید: \n",
      url: "https://share.tapsi.cab/?code=",
    },
    services: {
      NORMAL: {
        enabled: true,
        categoryType: "NORMAL",
        title: "کلاسیک",
        color: "#FF5722",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/normal.png",
        requestTitle: "درخواست سرویس کلاسیک",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 3,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سرویس کلاسیک",
          rules: [
            "تعداد مجاز مسافران در سرویس کلاسیک حداکثر سه نفر است.",
            "ارسال بار بدون حضور مسافر یا همراه‌ داشتن بار با ابعاد نامتعارف، مجاز نیست.",
            "انتخاب نحوه پرداخت (نقدی یا اعتباری) با مسافر است و سفیر مجاز به تعیین نحوه پرداخت نیست.",
            "در صورت نیاز به تغییر مقصد یا زمان توقف، لطفا ضمن کسب موافقت سفیر، تغییرات را در اپلیکیشن خود وارد کنید.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: true,
            },
            URGENT: {
              isEnabled: true,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
        },
      },
      LINE: {
        enabled: true,
        categoryType: "LINE",
        title: "لاین",
        color: "#00BFA5",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/line.png",
        requestTitle: "درخواست سرویس لاین",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 1,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سرویس لاین",
          rules: [
            "این سفر اشتراکی است و ممکن است همسفر داشته باشید.",
            "از زمان رسیدن سفیر، 2 دقیقه فرصت دارید تا در مبدا حاضر شوید.",
            "ترتیب رساندن مسافران توسط تپسی تعیین می‌شود.",
            "در حین سفر، تغییر مقصد ممکن نیست.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
        },
        passengerCountConfig: {
          maxPassengerCount: 2,
          message: "",
        },
      },
      TAXI: {
        enabled: true,
        categoryType: "NORMAL",
        title: "تاکسی",
        color: "#EECC00",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/taxi.png",
        requestTitle: "درخواست سرویس تاکسی",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 3,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سرویس تاکسی",
          rules: [
            "تعداد مجاز مسافران در سرویس تاکسی حداکثر سه نفر است.",
            "ارسال بار بدون حضور مسافر یا همراه‌ داشتن بار با ابعاد نامتعارف، مجاز نیست.",
            "انتخاب نحوه پرداخت (نقدی یا اعتباری) با مسافر است و سفیر مجاز به تعیین نحوه پرداخت نیست.",
            "در صورت نیاز به تغییر مقصد یا زمان توقف، لطفا ضمن کسب موافقت سفیر، تغییرات را در اپلیکیشن خود وارد کنید.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
        },
      },
      ASSISTANT: {
        enabled: true,
        categoryType: "ASSISTANT",
        title: "همیار (آزمایشی)",
        color: "#993333",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/assistant.png",
        requestTitle: "درخواست سرویس همیار",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 1,
        safetyAvailability: false,
        guide: {
          title: "راهنمای سرویس همیار",
          rules: [
            "پس از قبول درخواست، برای انجام هماهنگی با همیار تماس بگیرید.",
            "لازم است ابتدای سفر، مبلغ مورد نیاز جهت خرید را به حساب همیار کارت به کارت کنید تا همیار سفر خود را آغاز کند.",
            "توجه داشته باشید که مشخصات کارت بانکی که مبلغ خرید را به آن واریز می‌کنید، با مشخصات همیار مطابقت کامل داشته باشد.",
            "رسید واریز مبلغ خرید به حساب همیار را حتما نزد خود نگهدارید تا در صورت بروز اختلاف آن را ارائه دهید.",
            "سقف انجام خرید توسط همیار تپسی، 100 هزار تومان است.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
        },
        requestDescription: {
          title: "لیست خرید",
          description: "لیست خرید خود را وارد کنید.",
          hint: "مثال: ۳ عدد شیر کم چرب یک لیتری (با ذکر نام برند )",
        },
      },
      SAFE: {
        enabled: false,
        categoryType: "NORMAL",
        title: "سپید",
        color: "#FF5722",
        iconUrl: "https://static.tapsi.cab/categories/safe/safe@3x.png",
        requestTitle: "درخواست سرویس سپید",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 3,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سفر سپید",
          rules: [
            "در این سرویس فضای بین مسافر و سفیر توسط محافظ جداسازی شده است.",
            "قبل از هر سفر، فضای داخلی خودرو و دستگیره ها در حضور مسافر توسط سفیر ضدعفونی می شود.",
            "سفیران این سرویس به طور مداوم تب‌سنجی می‌شوند تا از سلامت آن‌ها اطمینان حاصل شود.",
            "تفاوت قیمت این سرویس، به دلیل افزایش هزینه‌های سفیر جهت ضدعفونی مداوم خودرو است.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
        },
      },
      DELIVERY: {
        enabled: true,
        categoryType: "DELIVERY",
        title: "اتوپیک",
        color: "#00695C",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/delivery.png",
        requestTitle: "انتخاب سرویس اتوپیک",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 7,
        safetyAvailability: false,
        guide: {
          title: "راهنمای سرویس اتوپیک",
          rules: [
            "مشخصات کامل گیرنده، شامل آدرس، نام و شماره تلفن را در توضیحات ذکر کنید.",
            "از ارسال بسته‌های با وزن و حجم نامعقول خودداری کنید.",
            "انتخاب نحوه پرداخت، (نقدی یا اعتباری) با مسافر است و سفیر مجاز به تعیین نحوه پرداخت نیست.",
            "تپسی مسئولیتی در قبال محتوای بسته‌های ارسالی ندارد.",
          ],
          insuranceNote: "ارسال بسته با ارزش بالای ۵ میلیون تومان، مجاز نیست.",
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
        },
        requestDescription: {
          title: "مشخصات گیرنده",
          description: "مشخصات گیرنده را وارد کنید.",
          hint: "مشخصات گیرنده شامل آدرس دقیق، نام و شماره تلفن.",
        },
      },
      BIKE_DELIVERY: {
        enabled: true,
        categoryType: "DELIVERY",
        title: "موتوپیک",
        color: "#00695C",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/bike-delivery.png",
        requestTitle: "انتخاب سرویس موتوپیک",
        mapCarIconUrl:
          "https://able-media.tapsi.cab/statics/OJKM3HVSL148LRHW3E.jpg",
        destinationsLimit: 7,
        safetyAvailability: false,
        guide: {
          title: "راهنمای سرویس موتوپیک",
          rules: [
            "برای ارسال بسته های بزرگ از سرویس اتوپیک (پیک خودروی تپسی) استفاده کنید.",
            "انتخاب نحوه پرداخت، (نقدی یا اعتباری) با مسافر است و سفیر مجاز به تعیین نحوه پرداخت نیست.",
            "تپسی مسئولیتی در قبال محتوای بسته‌های ارسالی ندارد.",
            "مشخصات کامل گیرنده، شامل آدرس، نام و شماره تلفن را در توضیحات ذکر کنید.",
          ],
          insuranceNote: "ارسال بسته با ارزش بالای ۵ میلیون تومان، مجاز نیست.",
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: true,
            },
          },
        },
        requestDescription: {
          title: "مشخصات گیرنده",
          description: "مشخصات گیرنده را وارد کنید.",
          hint: "مشخصات گیرنده شامل آدرس دقیق، نام و شماره تلفن.",
        },
      },
      CARPOOL: {
        enabled: false,
        categoryType: "NORMAL",
        title: "هم‌خط (آزمایشی)",
        color: "#00BFA5",
        iconUrl: "https://static.tapsi.cab/categories/carpool/carpool.png",
        requestTitle: "ادامه",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 1,
        safetyAvailability: false,
        guide: {
          title: "راهنمای سرویس هم‌خط",
          rules: [
            "خودروهای ارائه شده در این سرویس، شامل مینی‌بوس و اتوبوس است و شما با تعدادی مسافر دیگر همسفر هستید.",
            "لازم است برای سفر در زمان‌های مشخص شده از قبل بلیت تهیه کنید.",
            "تا یک ساعت قبل از حرکت، می توانید سفر خود را لغو کنید.",
            "برای استفاده از این سرویس، حتما در ساعت اعلام شده در ایستگاه مبدا حضور داشته باشید. در صورت عدم حضور شما، سفیر به مسیر خود ادامه خواهد داد و وجه پرداخت شده، عودت داده نخواهد شد.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
        },
      },
      PLUS: {
        enabled: true,
        categoryType: "NORMAL",
        title: "پلاس",
        color: "#273a73",
        iconUrl: "https://static.tapsi.cab/ride-preview/v2/plus.png",
        requestTitle: "درخواست سرویس پلاس",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 3,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سرویس پلاس",
          rules: [
            "سفرهای این سرویس توسط سفیران با امتیاز بالا و خودروهای با وضعیت مناسب انجام می‌گیرد.",
            "تعداد مجاز مسافران در سرویس تاکسی حداکثر سه نفر است.",
            "ارسال بار بدون حضور مسافر یا همراه‌ داشتن بار با ابعاد نامتعارف، مجاز نیست.",
            "انتخاب نحوه پرداخت (نقدی یا اعتباری) با مسافر است و سفیر مجاز به تعیین نحوه پرداخت نیست.",
            "در صورت نیاز به تغییر مقصد یا زمان توقف، لطفا ضمن کسب موافقت سفیر، تغییرات را در اپلیکیشن خود وارد کنید.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: true,
            },
            URGENT: {
              isEnabled: true,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: true,
            },
            URGENT: {
              isEnabled: true,
            },
          },
        },
      },
      CHARITY: {
        enabled: false,
        categoryType: "NORMAL",
        title: "سفیر مهربانی",
        color: "#ff5722",
        iconUrl: "https://able-media.tapsi.cab/statics/ZRACE5LH05S7LYI8Y2.jpg",
        requestTitle: "درخواست سفیر مهربانی",
        mapCarIconUrl:
          "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
        destinationsLimit: 3,
        safetyAvailability: true,
        guide: {
          title: "راهنمای سرویس سفیر مهربانی",
          rules: [
            "شرایط استفاده از این سرویس، مشابه سرویس کلاسیک تپسی است.",
            "مابه‌التفاوت اضافه شده به هزینه این سرویس، صرف ارائه‌ی خدمات رایگان به کادر درمان خواهد شد.",
          ],
        },
        featuresConfig: {
          singleDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
          multiDestination: {
            PREBOOK: {
              isEnabled: false,
            },
            URGENT: {
              isEnabled: false,
            },
          },
        },
      },
    },
    callCenterNumber: "1630",
    ratingInterval: 3,
    ratingThreshold: 8,
    pullingServiceFrequency: 10,
    blockState: null,
    referralData: {
      passengerReferralTitle: "معرفی به دوستان",
      passengerReferralMessage:
        "با ارائه کد زیر به اطرافیانتان، یک تخفیف ۳۰ هزار تومانی به آن‌ها هدیه دهید و پس از اولین سفرشان، شما نیز یک تخفیف ۳۰ هزار تومانی در شهر خود دریافت کنید.\n",
      passengerShareReferralMessage:
        "۳۰ هزار تومان تخفیف تپسی هدیه گرفتید!\nاز لینک زیر، تپسی را دریافت کنید و با وارد کردن کد معرف، از هدیه ۳۰ هزار تومانی روی اولین سفرتان استفاده کنید.\nاعتبار: ۱۵روز\nدانلود تپسی:\ntapsi.ir/dl\n\n\nکد معرفی: 2WXT8K",
      passengerReferralImageText: "معرفی به دوستان",
      passengerReferralShowInNotification: true,
    },
    activeRatings: null,
    currency: "تومان",
    serverTime: 1685428548689,
  },
};

export async function initPassengerRequest() {
  const response = await axios.get(`${TAPSI_BASE_URL}/v2.4/init/passenger`, {
    headers: {
      "x-agent": "v2.2|passenger|WEBAPP|6.8.0||5.0",
    },
  });
  return response.data;
}
////

//// tapsi request ride

const requestRideBody = {
  origin: {
    latitude: 35.704626468362974,
    longitude: 51.356456613878436,
  },
  destinations: [
    {
      latitude: 35.71572834010152,
      longitude: 51.371472027899244,
    },
  ],
  serviceKey: "NORMAL",
  token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcmV2aWV3RGF0YSI6eyJvcmlnaW4iOnsibGF0aXR1ZGUiOjM1LjcwNDYyNjQ2ODM2Mjk3NCwibG9uZ2l0dWRlIjo1MS4zNTY0NTY2MTM4Nzg0MzZ9LCJkZXN0aW5hdGlvbnMiOlt7ImxhdGl0dWRlIjozNS43MTU3MjgzNDAxMDE1MiwibG9uZ2l0dWRlIjo1MS4zNzE0NzIwMjc4OTkyNDR9XSwiaGFzUmV0dXJuIjpmYWxzZSwid2FpdGluZ1RpbWUiOjB9LCJwcmljZURhdGEiOlt7InNlcnZpY2VLZXkiOiJOT1JNQUwiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjozOTAwMH0seyJzZXJ2aWNlS2V5IjoiUExVUyIsIm51bWJlck9mUGFzc2VuZ2VycyI6MSwicGFzc2VuZ2VyU2hhcmUiOjUxMDAwfSx7InNlcnZpY2VLZXkiOiJBU1NJU1RBTlQiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjo0MzAwMH0seyJzZXJ2aWNlS2V5IjoiREVMSVZFUlkiLCJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclNoYXJlIjo0ODAwMH0seyJzZXJ2aWNlS2V5IjoiQklLRV9ERUxJVkVSWSIsIm51bWJlck9mUGFzc2VuZ2VycyI6MSwicGFzc2VuZ2VyU2hhcmUiOjQyMDAwfV0sInV1aWQiOiI4N2M3YTE3MC1mZGY3LTExZWQtOTY4ZC0wMWM0NjVhZjc5YTMiLCJpYXQiOjE2ODUzNDc1MDksImV4cCI6MTY4NTM0NzU3OSwiYXVkIjoiZG9yb3Noa2U6YXBwIiwiaXNzIjoiZG9yb3Noa2U6c2VydmVyIiwic3ViIjoiZG9yb3Noa2U6dG9rZW4ifQ.hsLJWqR4GAKHDDLRsVSYd2crREqhDJqya3RSgvsJCLdfXb8ZkGsaG--pvAH0yVcsfH1C0SSZUuJjfaCc-UysXQ",
  numberOfPassengers: 1,
  hasReturn: false,
  waitingTime: 0,
  gateway: "CAB",
  deliveryRequestDetails: {
    sender: null,
    receivers: null,
    payer: null,
    description: null,
    showDeliveryBottomSheet: false,
  },
  initiatedVia: "WEB",
};

const requestRideResponse = {
  result: "OK",
  data: {
    ride: {
      id: "64745ce67dc6de600543136e",
      origin: {
        address: "تهران، ب یادگار امام جنوب، تیموری، بل تیموری غربی",
        shortAddress: "تهران، ب یادگار امام جنوب، تیموری، بل تیموری غربی",
        location: {
          latitude: 35.704626468362974,
          longitude: 51.356456613878436,
        },
      },
      destinations: [
        {
          address: "تهران، خ. ستارخان، خ. شهرآرا",
          shortAddress: "تهران، خ. ستارخان، خ. شهرآرا",
          location: {
            latitude: 35.71572834010152,
            longitude: 51.371472027899244,
          },
        },
      ],
      hasReturn: false,
      createdAt: 1685347558408,
      status: "FINDING_DRIVER",
      waitingTime: 0,
      paymentMethod: "CASH",
      walletType: null,
      passengerShare: 39000,
      uncertainPrice: null,
      passengerPrice: 39000,
      code: "TP30-VQONAJHFE9",
      numberOfPassengers: 1,
      tags: [
        {
          id: "GOLDEN_RIDE",
        },
      ],
      requestExpiresAt: 1685347858276,
      serviceKey: "NORMAL",
      statusInfo: {
        text: "در حال پیدا کردن سفیر برای شما هستیم",
      },
      showUpStartTime: null,
      arrivedAt: null,
      chatConfig: {
        enabled: false,
      },
      deliveryRequestDetails: null,
      findingDriverDisclaimer: {
        description:
          "با توجه به اینکه در برخی شرایط خاص، هزینه سفر از نرخ مصوب تاکسی‌های تلفنی در شوراهای شهرهای مختلف بیشتر می‌شود، این موضوع پیش از سفر، به شما اطلاع داده می‌شود.",
        title: "قیمت این سفر، از نرخ مصوب تاکسیرانی بیشتر است",
        infoLink: null,
      },
    },
  },
};

export async function tapsiRideRequest(body) {
  const response = await axios.post(`${TAPSI_BASE_URL}/v2.3/ride`, body, {
    headers: {
      "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
    },
  });
  return response.data;
}
////

//// tapsi cancel ride waiting

const cancelRideWaitingResponse = {
  result: "OK",
};

export async function tapsiCancelRideWaitingRequest(rideId) {
  const response = await axios.delete(
    `${TAPSI_BASE_URL}/v2.1/ride/request/${rideId}`,
    {
      headers: {
        "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
      },
    }
  );
  return response.data;
}
////

//// tapsi cancel ride

const tapsiCancelRideBody = {
  cancellationReason: {
    text: "سفیر دور است",
    code: "DRIVER_WAS_FAR_AWAY",
  },
};

const cancelRideResponse = {
  result: "OK",
};

export async function tapsiCancelRideRequest({ rideId, body }) {
  const response = await axios.delete(`${TAPSI_BASE_URL}/v2/ride/${rideId}`, {
    headers: {
      "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
    },
    data: body
  });
  return response.data;
}
////

//// tapsi ride status (5s)


const checkRideStatusResponse = {
  "result": "OK",
  "data": {
    "rideExtraInfo": {
      "nextCheckpointStep": 1,
      "checkpoints": [
        {
          "rideId": "6475d114e53d5c4872b37003",
          "step": 1,
          "goal": "PICKUP",
          "location": {
            "latitude": 35.70536960484873,
            "longitude": 51.409791036360275
          }
        },
        {
          "rideId": "6475d114e53d5c4872b37003",
          "step": 2,
          "goal": "DROP",
          "location": {
            "latitude": 35.7156593277856,
            "longitude": 51.426092508161105
          }
        }
      ]
    },
    "ride": {
      "id": "6475d114e53d5c4872b37003",
      "origin": {
        "address": "تهران، خ. ولیعصر، بعد از خ. بزرگمهر، خ. رشت، بن. ستوده، دانشگاه امیرکبیر",
        "shortAddress": "تهران، خ. ولیعصر، بعد از خ. بزرگمهر، خ. رشت، بن. ستوده، دانشگاه امیرکبیر",
        "location": {
          "latitude": 35.70536960484873,
          "longitude": 51.409791036360275
        }
      },
      "destinations": [
        {
          "address": "تهران، خ. مفتح، نرسیده به خ. کریمخان",
          "shortAddress": "تهران، خ. مفتح، نرسیده به خ. کریمخان",
          "location": {
            "latitude": 35.7156593277856,
            "longitude": 51.426092508161105
          }
        }
      ],
      "hasReturn": false,
      "createdAt": 1685442836649,
      "status": "DRIVER_ASSIGNED",
      "assumedStatus": "DRIVER_ASSIGNED",
      "waitingTime": 0,
      "driverArrivalEstimation": 2,
      "paymentMethod": "CASH",
      "walletType": null,
      "passengerShare": 46000,
      "uncertainPrice": null,
      "passengerPrice": 46000,
      "code": "TP30-C1S3BY4G0I",
      "numberOfPassengers": 1,
      "tags": [],
      "requestExpiresAt": null,
      "driver": {
        "profile": {
          "firstName": "محمدعلی",
          "lastName": "فرزانه",
          "pictureUrl": "https://able-media.tapsi.cab/profile-picture/0H2H05I83RNSWYJT43.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230530T044020Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=IG3FOMUTV4PL9H6EBO5V%2F20230530%2Faws-global%2Fs3%2Faws4_request&X-Amz-Signature=ed9b46adc835b88c02437a8f73456572a68a40b5385b5a3c4ea9a218863c8309",
          "phoneNumber": "+989122393380",
          "hearingImpaired": false
        },
        "location": {
          "latitude": 35.709614,
          "longitude": 51.410803,
          "bearing": 348.6759
        },
        "vehicle": {
          "icon": "https://static.tapsi.cab/app-new/mapwithbearing-03-25.png",
          "color": "زرد خورشیدی",
          "model": "تاکسی سمند",
          "plateNumber": {
            "type": "NORMAL",
            "payload": {
              "firstPart": "۹۷",
              "secondPart": "۸۸۸",
              "letter": "ت",
              "provinceCode": "۲۲"
            }
          },
          "picture": {
            "car": "https://able-media.tapsi.cab/statics/CKX2XZ43U34AVY68AD.jpg",
            "light": "https://static.tapsi.cab/statics/flasher.png"
          }
        }
      },
      "serviceKey": "NORMAL",
      "statusInfo": {
        "text": "سفیر در حال آمدن به سمت شماست."
      },
      "showUpStartTime": null,
      "arrivedAt": null,
      "chatConfig": {
        "enabled": true,
        "roomId": 277887635
      },
      "deliveryRequestDetails": null,
      "findingDriverDisclaimer": {
        "description": "با توجه به اینکه در برخی شرایط خاص، هزینه سفر از نرخ مصوب تاکسی‌های تلفنی در شوراهای شهرهای مختلف بیشتر می‌شود، این موضوع پیش از سفر، به شما اطلاع داده می‌شود.",
        "title": "قیمت این سفر، از نرخ مصوب تاکسیرانی بیشتر است",
        "infoLink": null
      }
    },
    "safety": {
      "status": "ENABLE",
      "expiredAt": 1685380514000
    },
    "tip": {
      "rideId": "6475d114e53d5c4872b37003",
      "tippingInfo": {
        "suggestedCharges": [
          4500,
          9000,
          14000
        ],
        "currency": {
          "text": "ریال",
          "currencyExchangeRate": 10
        },
        "tip": {
          "status": "UNTIPPED"
        }
      }
    }
  }
}

export async function tapsiRideStatusRequest(rideId) {
  const response = await axios.get(`${TAPSI_BASE_URL}/v2.3/ride/${rideId}`, {
    headers: {
      "x-agent": "v2.2|passenger|WEBAPP|6.1.3||5.0",
    },
  });
  return response.data;
}
////
