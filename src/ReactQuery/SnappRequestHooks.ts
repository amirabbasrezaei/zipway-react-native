import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import * as Application from "expo-application";
import {
  getNewPrice,
  ouathSnappRequest,
  snappAcknowledgement,
  snappCancelRideRequest,
  snappCancelWaitingRequest,
  snappConfigRequest,
  snappNewRideRequest,
  snappRideEventRequest,
  snappServiceTypesRequest,
  verifySnappSmsTokenRequest,
} from "../requests/snappAPIs";
import * as Device from "expo-device";
import * as Cellular from "expo-cellular";
import { Platform } from "react-native";

let cellularName: string = "";
async function getSnappConfigBodyPromise() {
  await Cellular.getCarrierNameAsync().then((e) => {
    cellularName = e;
  });
}

const headers = {
  locale: "fa-IR",
  "package-name": "cab.zipway.passenger",
  "user-agent": `${Platform.OS} ; ${Device.manufacturer} ${Device.modelName} ; Passenger/8.0.3`,
  "x-app-name": `passenger-${Platform.OS}`,
  "x-app-version": "8.0.3",
  "x-app-version-code": "251",
};

export function useSnappNewPrice() {
  const {
    isLoading: newSnappPriceLoading,
    data: newSnappPriceData,
    isSuccess: isSnappNewPriceSucceed,
    isError: isSnappNewPriceError,
    failureReason: snappNewPriceFailureReason,
    mutate: mutateSnappNewPrice,
  } = useMutation({
    mutationFn: (NewPricePostData: any) => getNewPrice(NewPricePostData),
  });

  return {
    newSnappPriceData,
    newSnappPriceLoading,
    isSnappNewPriceSucceed,
    isSnappNewPriceError,
    snappNewPriceFailureReason,
    mutateSnappNewPrice,
  };
}

export function useSnappConfigMutation() {
  const {
    mutate: snappConfigMutate,
    data: snappConfigData,
    isLoading: isSnappConfigLoading,

    isSuccess: isSnappConfigSuccess,
  } = useMutation({
    mutationFn: () => {
      (async () => await getSnappConfigBodyPromise())();

      const header = {
        locale: "fa-IR",
        "package-name": "cab.snapp.passenger",
        "x-app-name": "passenger-android",
        "x-app-version": "8.0.3",
        "x-app-version-code": 251,
      };

      const body = {
        android_secure_id: Application.androidId,
        os_version: Device.osVersion,
        carrier_name: cellularName,
        device_name: `${Device.brand} ${Device.modelName}`,
        device_type: 1,
        mac_address: "02:00:00:00:00:00",
        version_code: 251,
      };

      return snappConfigRequest({ body, header });
    },
  });
  return {
    snappConfigData,
    snappConfigMutate,
    isSnappConfigLoading,
    isSnappConfigSuccess,
  };
}

export function useSnappRequestVerifySms() {
  const {
    data: snappRequestVerifySmsData,
    isLoading: isSnappRequestVerifySmsLoading,
    mutate: mutuateSnappRequestVerifySms,
    isSuccess: isSnappRequestVerifySmsSucceed,
  } = useMutation({
    mutationFn: (data: { cellphone: string }) => {
      const { cellphone } = data;
      const body = {
        device_id: Application.androidId,
        cellphone,
      };

      return ouathSnappRequest(body, headers);
    },
  });
  return {
    isSnappRequestVerifySmsLoading,
    snappRequestVerifySmsData,
    mutuateSnappRequestVerifySms,
    isSnappRequestVerifySmsSucceed,
  };
}

export function useVerifySnappSmsToken() {
  const {
    data: verifySnappSmsTokenData,
    isLoading: isVerifySnappSmsTokenLoading,
    isSuccess: isVerifySnappSmsTokenSuccess,
    mutate: mutateVerifySnappSmsToken,
  } = useMutation({
    mutationFn: ({
      token,
      phoneNumber,
    }: {
      token: string;
      phoneNumber: string;
    }) => {
      const body = {
        cellphone: phoneNumber,
        device_id: Application.androidId,
        client_id: "android_293ladfa12938176yfgsndf",
        client_secret: "as;dfh98129-9111.*(U)jsflsdf",
        grant_type: "sms_v2",
        referrer: Platform.OS,
        token: token,
      };

      return verifySnappSmsTokenRequest(body);
    },
  });

  return {
    verifySnappSmsTokenData,
    isVerifySnappSmsTokenLoading,
    mutateVerifySnappSmsToken,
    isVerifySnappSmsTokenSuccess,
  };
}

export function useNewSnappRide() {
  const {
    data: snappNewRideData,
    isSuccess: isSnappNewRideSuccess,
    isError: isSnappNewRideError,
    error: snappNewRideError,
    mutate: mutateSnappNewRide,
  } = useMutation({
    mutationFn: (body: any) => snappNewRideRequest(body, headers),
  });

  return {
    snappNewRideData,
    isSnappNewRideSuccess,
    isSnappNewRideError,
    snappNewRideError,
    mutateSnappNewRide,
  };
}

const sampleResponse = {
  data: {
    is_first_ride: false,
    ride_id: "SNP-230219-89749-5297",
  },
  status: 200,
};

export function useSnappServiceTypes() {
  const {
    data: snappServiceData,
    isSuccess: isSnappServiceSuccess,
    isError: isSnappServiceError,
    error: snappServiceError,
    mutate: mutateSnappService,
    isLoading: isSnappServiceLoading,
  } = useMutation({
    mutationFn: (body: any) => snappServiceTypesRequest(body, headers),
  });
  return {
    snappServiceData,
    isSnappServiceSuccess,
    isSnappServiceError,
    snappServiceError,
    mutateSnappService,
    isSnappServiceLoading,
  };
}
export function useSnappCancelWaiting() {
  const {
    data: snappCancelWaitingData,
    isSuccess: isSnappCancelWaitingSuccess,
    isError: isSnappCancelWaitingError,
    error: snappCancelWaitingError,
    mutate: mutateSnappCancelWaiting,
    isLoading: isSnappCancelWaitingLoading,
  } = useMutation({
    mutationFn: (rideId: any) => snappCancelWaitingRequest(rideId, headers),
  });
  return {
    snappCancelWaitingData,
    isSnappCancelWaitingSuccess,
    isSnappCancelWaitingError,
    snappCancelWaitingError,
    mutateSnappCancelWaiting,
    isSnappCancelWaitingLoading,
  };
}

export function useSnappCancelRide() {
  const {
    data: snappCancelRideData,
    isSuccess: isSnappCancelRideSuccess,
    isError: isSnappCancelRideError,
    error: snappCancelRideError,
    mutate: mutateSnappCancelRide,
    isLoading: isSnappCancelRideLoading,
  } = useMutation({
    mutationFn: (rideId: any) => snappCancelRideRequest(rideId, headers),
  });
  return {
    snappCancelRideData,
    isSnappCancelRideSuccess,
    isSnappCancelRideError,
    snappCancelRideError,
    mutateSnappCancelRide,
    isSnappCancelRideLoading,
  };
}
export function useSnappAcknowledgement() {
  const {
    data: snappAcknowledgementData,
    isSuccess: isSnappAcknowledgementSuccess,
    isError: isSnappAcknowledgementError,
    error: snappAcknowledgementError,
    mutate: mutateSnappAcknowledgement,
    isLoading: isSnappAcknowledgementLoading,
  } = useMutation({
    mutationFn: (body: any) => snappAcknowledgement(body, headers),
  });
  return {
    snappAcknowledgementData,
    isSnappAcknowledgementSuccess,
    isSnappAcknowledgementError,
    snappAcknowledgementError,
    mutateSnappAcknowledgement,
    isSnappAcknowledgementLoading,
  };
}

export function useSnappEvent() {
  const {
    data: snappEventData,
    refetch: refetchSnappEvent,
    error: snappEventError,
    isLoading: isSnappEventLoading,
    isSuccess: isSnappEventSuccess,
    isFetched: isSnappEventFetched,
  } = useQuery(["snappEvent"], {
    queryFn: () => snappRideEventRequest(headers),
  });
  return {
    snappEventData,
    refetchSnappEvent,
    snappEventError,
    isSnappEventLoading,
    isSnappEventSuccess,
    isSnappEventFetched,
  };
}

const sample = {
  data: {
    driver: {
      cellphone: "+989303183091",
      driver_name: "میثم حقدوست وفا",
      image_url: "https://statics.snapp.ir/driver/yWoMBgOKlVZq7DqGpdNL-1.jpg",
      plate: {
        character: "ع",
        iran_id: 53,
        part_a: 18,
        part_b: 413,
        type: 1,
      },
      plate_number_url:
        "https://statics.snapp.ir/plates/v2/eyJjaGFyYWN0ZXIiOjEwLCJpcmFuX2lkIjo1MywicGFydF9hIjoxOCwicGFydF9iIjo0MTMsInR5cGUiOjF9.svg",
      vehicle_color_hex: "F7D74E",
      vehicle_model: "سمند تاکسی زرد",
    },
    driver_location_info: {
      lat: 35.6503798,
      lng: 51.3488862,
    },
    options: null,
    ride_info: {
      can_use_ride_voucher: true,
      cellphone: "+989038338886",
      current_state: 2,
      destination: {
        details:
          "تهران، آیت الله سعیدی، عسگری، نرسیده به پارکینگ فروشگاه شهروند",
        formatted_address:
          "تهران، ونک، بزرگراه کردستان، محمدباقر خدامی بعد از محمد باقر خدامی، نگارخانه والی",
        lat: 35.76500579004264,
        lng: 51.40134084418389,
      },
      final_price: 805000,
      friend_info: {
        cellphone: "+989038338886",
        is_for_friend: false,
        name: "عباس",
      },
      is_chat_enable: true,
      is_delivery: false,
      is_live_location_enable: 2,
      name: "عباس",
      origin: {
        details: "",
        formatted_address:
          "تهران، وصفنارد، بزرگراه آیت الله سعیدی، حمید عسگری، ",
        lat: 35.65038206316193,
        lng: 51.35291984863571,
      },
      ride_id: "SNP-230429-31919-6927",
      service_type: 1,
      shareurl: "https://snapp.taxi/trip/share/1gJo804ARnJyboDB6qXj",
      start_time: "18:52",
      sub_service_type: null,
    },
    service_type: {
      can_change_regular_offer_state: false,
      can_use_voucher: true,
      description: "به صرفه",
      is_new: false,
      is_ride_options_enabled: true,
      is_surged: false,
      long_description: "",
      name: "اسنپ",
      need_additional_information: false,
      photo_url: "https://downloads.snapp.site/Service-types/Eco.png",
      surge: null,
      tooltip: "",
      type: "1",
    },
    tips: [],
    waitings: [
      {
        key: "0m-5m",
        price: 10000,
        text: "۰ تا ۵ دقیقه",
      },
      {
        key: "5m-10m",
        price: 20000,
        text: "۵ تا ۱۰ دقیقه",
      },
      {
        key: "10m-15m",
        price: 30000,
        text: "۱۰ تا ۱۵ دقیقه",
      },
      {
        key: "15m-20m",
        price: 40000,
        text: "۱۵ تا ۲۰ دقیقه",
      },
      {
        key: "20m-25m",
        price: 50000,
        text: "۲۰ تا ۲۵ دقیقه",
      },
      {
        key: "25m-30m",
        price: 60000,
        text: "۲۵ تا ۳۰ دقیقه",
      },
      {
        key: "30m-45m",
        price: 75000,
        text: "۳۰ تا ۴۵ دقیقه",
      },
      {
        key: "45m-1h",
        price: 100000,
        text: "۴۵ دقیقه تا ۱ ساعت",
      },
      {
        key: "1h-1h30m",
        price: 150000,
        text: "۱ تا ۱.۵ ساعت",
      },
      {
        key: "1h30m-2h",
        price: 200000,
        text: "۱.۵ تا ۲ ساعت",
      },
      {
        key: "2h-2h30m",
        price: 250000,
        text: "۲ تا ۲.۵ ساعت",
      },
      {
        key: "2h30m-3h",
        price: 300000,
        text: "۲.۵ تا ۳ ساعت",
      },
      {
        key: "3h-3h30m",
        price: 350000,
        text: "۳ تا ۳.۵ ساعت",
      },
      {
        key: "3h30m-4h",
        price: 400000,
        text: "۳.۵ تا ۴ ساعت",
      },
    ],
  },
  evt_id:
    "QE3SwOpeXk94NlR-Y42LJRH9lnRvmJIDHzjEi9n2nxiqEm0F57zfwzESGDyEz_reRsNdDoV6aaIWU7fTInboKTPWNywkMJBAWUMS_EVuWfXUtg5HmgX93LTqOePM2lLosQCbB8uJrPxsl0n5bEkF3Jak435asidsb0PRGFIdY5XuBEpHQRk5VLIK_Qx8WPSBxns2uOkVrQZSXhCoNl3VZ_l0X1VvkaVnI6fb4mZNR-6UdfNytU8zDbuGuMPCZsq8-1jP60mkbqTS649ZmqwKBq2DrDGy_lobwu7OXZ-F0GAjsB_pd_XuxxLRmIsKHKHDPmpFwSyGBf3vYHG7IqimhFCSoUqqFVWZzbKZHPnwm8b-c8kzzeHVO7U8tpeqFS4U0pjQJT52OIgi5gq5STszy7DXe2lb215EhVjgUAMphUSXSiuQateHN1m4wkovNxtt7ktmgDIlNX-s6K-Drve4-BxSy0Y=",
  expires_in: 1682781795,
  type: "driver_accepted_ride",
};

/// snapp event successfull response
// {
//   "data": {
//     "events": [
//       {
//         "type": "driver_accepted_ride",
//         "evt_id": "qheCVwf81fDAzLpTrkrjdyOqMpupUd2bp0NH0J_B4jU1Kv9gSYGWNQJZAH9JIaXLvYUOWu-nLK3JVgkJUBRCYEAMJd2rk-etLJH_eJ6zgS7sqRPrp1x7hZkh5iRBztXROJ3YMK_3e2rVwmo9MolD-uu7yRGNDoDKASYo-TPTEWHdT4HanRePezDzgn7h9oSda4TPlLqkH2mCb3KSkaErAdHvPFs8HdAt8A7W7mgl2gVhyMG0RlA28XbXNEPdqDlfz2O2DlJCsaxG9ZP9XfQP61UdS3NDX8BXPiEcHPSNYitazCzR8biVDePbUknioAoOgKkMgRumVl5QntR2F_qh586PXEHwWGnJHi8O13b0I57jrBNgJ21EHVEdN9IFUgWZusheElJIj9ATPIBss9CicVCFtwEqNsvewv5dYayK1SW9LzG-v1yI5uGfuhHXW68XYlud-VOTrZl91eDRfSIzBne3Wsg=",
//         "expires_in": 1682663890,
//         "data": {
//           "driver": {
//             "cellphone": "+989395465577",
//             "driver_name": "شهناز حداد زاده شوشتری",
//             "image_url": "http://statics.snapp.ir/driver/2b05e283065/1ce8b980045eac8d1e177428c760b-1.jpg",
//             "plate": {
//               "character": "ق",
//               "iran_id": 68,
//               "part_a": 29,
//               "part_b": 734,
//               "type": 1
//             },
//             "plate_number_url": "https://statics.snapp.ir/plates/v2/eyJjaGFyYWN0ZXIiOjExLCJpcmFuX2lkIjo2OCwicGFydF9hIjoyOSwicGFydF9iIjo3MzQsInR5cGUiOjF9.svg",
//             "vehicle_color_hex": "FFFFFF",
//             "vehicle_model": "کوییک سفید"
//           },
//           "driver_location_info": {
//             "lat": 35.8281154,
//             "lng": 50.9884609
//           },
//           "options": null,
//           "ride_info": {
//             "can_use_ride_voucher": true,
//             "cellphone": "+989038338886",
//             "current_state": 2,
//             "destination": {
//               "details": "منطقه ۸، کنار گذر بلوار جمهوری اسلامی، اسماعیل مسلمی",
//               "formatted_address": "کرج، منطقه ۸، کنار گذر بلوار جمهوری اسلامی، اسماعیل مسلمی",
//               "lat": 35.845355999999995,
//               "lng": 50.98363100000003
//             },
//             "final_price": 160000,
//             "friend_info": {
//               "cellphone": "+989038338886",
//               "is_for_friend": false,
//               "name": "عباس"
//             },
//             "is_chat_enable": true,
//             "is_delivery": false,
//             "is_live_location_enable": 2,
//             "name": "عباس",
//             "origin": {
//               "details": "",
//               "formatted_address": "کرج، جهانشهر، شهید بهشتى، میدان هلال احمر قبل از نارون - ابراهیمی، عصر موبایل",
//               "lat": 35.82568334677978,
//               "lng": 50.98786245537909
//             },
//             "ride_id": "SNP-230428-68044-9538",
//             "service_type": 1,
//             "shareurl": "https://snapp.taxi/trip/share/6WvRMqDpB36ABlKad1AY",
//             "start_time": "10:07",
//             "sub_service_type": null
//           },
//           "service_type": {
//             "can_change_regular_offer_state": false,
//             "can_use_voucher": true,
//             "description": "به صرفه",
//             "is_new": false,
//             "is_ride_options_enabled": true,
//             "is_surged": false,
//             "long_description": "",
//             "name": "اسنپ",
//             "need_additional_information": false,
//             "photo_url": "https://downloads.snapp.site/Service-types/Eco.png",
//             "surge": null,
//             "tooltip": "",
//             "type": "1"
//           },
//           "tips": [],
//           "waitings": [
//             {
//               "key": "0m-5m",
//               "price": 10000,
//               "text": "۰ تا ۵ دقیقه"
//             },
//             {
//               "key": "5m-10m",
//               "price": 20000,
//               "text": "۵ تا ۱۰ دقیقه"
//             },
//             {
//               "key": "10m-15m",
//               "price": 30000,
//               "text": "۱۰ تا ۱۵ دقیقه"
//             },
//             {
//               "key": "15m-20m",
//               "price": 40000,
//               "text": "۱۵ تا ۲۰ دقیقه"
//             },
//             {
//               "key": "20m-25m",
//               "price": 50000,
//               "text": "۲۰ تا ۲۵ دقیقه"
//             },
//             {
//               "key": "25m-30m",
//               "price": 60000,
//               "text": "۲۵ تا ۳۰ دقیقه"
//             },
//             {
//               "key": "30m-45m",
//               "price": 75000,
//               "text": "۳۰ تا ۴۵ دقیقه"
//             },
//             {
//               "key": "45m-1h",
//               "price": 100000,
//               "text": "۴۵ دقیقه تا ۱ ساعت"
//             },
//             {
//               "key": "1h-1h30m",
//               "price": 150000,
//               "text": "۱ تا ۱.۵ ساعت"
//             },
//             {
//               "key": "1h30m-2h",
//               "price": 200000,
//               "text": "۱.۵ تا ۲ ساعت"
//             },
//             {
//               "key": "2h-2h30m",
//               "price": 250000,
//               "text": "۲ تا ۲.۵ ساعت"
//             },
//             {
//               "key": "2h30m-3h",
//               "price": 300000,
//               "text": "۲.۵ تا ۳ ساعت"
//             },
//             {
//               "key": "3h-3h30m",
//               "price": 350000,
//               "text": "۳ تا ۳.۵ ساعت"
//             },
//             {
//               "key": "3h30m-4h",
//               "price": 400000,
//               "text": "۳.۵ تا ۴ ساعت"
//             }
//           ]
//         }
//       },
//       {
//         "type": "gabriel_new_message",
//         "evt_id": "7vHlc8Fgewm_G_M0ms7EhGiM2pdtW_rtLHuYqp8SboTn1900AZzgP0nG_qjZCEvS3tQdvrbBzDeTwczJ6wX_s9XpR2E730jq1HB5dkwNwZg305hfCBWGIUAkSEIWFQMs7VpvAtciaSMppbJKzlP24b9z76xECfhtUfuFsxN1CmhM733OOCNyuh4QyUQL1Ugu9DsDRl-rveXdRM-RLU4EfVw5iWgMEiJ89eyMTM9t9mOj8nkrjndkYWkgoOVHK2M9ZC67XbidRP8_TdEteuJcUy1y7maUzLMekKQOK6D-o7XVbUt7LY3Q8V1pXbC6p4I87T0ytWd5P5tQ-9cYsReHsTTmSogVMYtbBvmWKqxpbs4raG74rHPyTNGu4H3t0vzKer3H83oPfeqyvH3rrIqmPZta985Uby_aNYlGLs84AsjsWzBxiNGjNdSpvuabEFEkuIB0_76Ew2ei8A8Esjbwg7SZGl8=",
//         "expires_in": 1682663899,
//         "data": {
//           "content": {
//             "text": " در مسیر مبدأ هستم.",
//             "type": 1
//           },
//           "from": 2,
//           "id": 1,
//           "predicted_replies": null,
//           "ride_id": "SNP-230428-68044-9538",
//           "sent_time": "2023-04-28 10:07:49"
//         }
//       }
//     ],
//     "time": 1682663871
//   },
//   "status": 200
// }

const config = {
  data: {
    ap_wallet_content:
      "با فعال‌سازی کیف پول آپ، می‌توانید از موجودی آن برای پرداخت اسنپ!، خرید شارژ، سفارش غذا، رزرو هتل و … استفاده کنید.",
    app_data: {
      latest: "172",
      supported: "108",
      update_uri: "bazaar://details?id=cab.snapp.passenger",
    },
    arriving_eta: {
      is_enabled: false,
      reload_interval: 180,
    },
    call_center_number: "02191039000",
    call_center_number_biker: "02196642",
    cedar_map_data: {
      client_id: "snapp-15242641026894969453",
      client_secret: "aBXSlnNuYXBwlhd0JV09T4ySKvUelB-NwHVYz1rJtB7-qTcCGscfB3g=",
      key: "0b72659ec2cfefd0f4635b6286929299aa8020ae",
      map_id: "cedarmaps.streets",
      uri: "http://snapp.api.cedarmaps.com/v1",
    },
    corporate_enrollment_page_url:
      "https://business.snapp.ir?utm_source=jek&utm_medium=slider-native&utm_campaign=corporate-july22&utm_content=fixedbanner",
    credit_wallet_info: {
      eligible: false,
      open_in_browser_url: "https://pl.snapp.ir",
      pwa_back_url: "https://pl.snapp.ir",
      pwa_redirect_url: "https://pl.snapp.ir",
      registered: false,
      wallet_id: 0,
    },
    currency: {
      symbol: "﷼ً",
      text: "ریال",
    },
    direct_debit_info: {
      debit_id: "",
      open_in_browser_url: "https://pl.snapp.ir",
      pwa_back_url: "https://pl.snapp.ir",
      pwa_redirect_url: "https://pl.snapp.ir",
      registered: false,
    },
    driver_location_fallback_timeout: 10,
    event_interval: 10,
    followed_apps: [],
    hurry_delay: 0,
    is_ap_enabled: false,
    is_online_payment_enabled: true,
    live_preview_interval: 10,
    location_interval: 5,
    map_core_url_android: "https://web-cdn.snapp.ir/smapp/core-icons/",
    map_feedback_endpoint: "https://app.snapp.taxi/map-feedback",
    map_feedback_url: "https://mapfeedback.snapp.ir",
    map_search_config_url:
      "https://web-cdn.snapp.ir/smapp/search/icons-config.json",
    map_search_icons_url_android: "https://web-cdn.snapp.ir/smapp/search/",
    map_type: 2,
    mapbox_style_url: "https://tile.snappmaps.ir/styles/snapp-style/style.json",
    mapbox_token:
      "pk.eyJ1IjoicmFzaGVkbmFkZXIiLCJhIjoiY2p2a2xwZG14MGMycDQzbzQ3M2dwajhndCJ9.wJibw1I1rTVSEpTOQBx1GQ",
    payment_texts: {
      ap_wallet_content:
        "با فعال‌سازی کیف پول آپ، می‌توانید از موجودی آن برای پرداخت اسنپ!، خرید شارژ، سفارش غذا، رزرو هتل و … استفاده کنید.",
      ap_wallet_link: "https://api.snapp.site/finance/ap-wallet/more-info",
      ap_wallet_title: "کیف پول",
      direct_debit_title: "پرداخت مستقیم",
      online_payment_title: "پرداخت آنلاین",
      snapp_card_title: "اسنپ کارت",
    },
    pin: {
      cache_geohash_characters: 7,
      cache_reverse_geocode_ttl: 604800,
      cache_vehicles_ttl: 30,
      delay_in_request: 700,
    },
    rating_reasons_checksum: 2818948099,
    referral_base_url: "https://snapp.taxi/passenger/",
    referral_intro_text:
      "لینک دعوت یا کد معرفی خود را برای دوستانتان ارسال کنید تااولین سفرشان را تا سقف ۱۰٬۰۰۰ تومان مهمان اسنپ باشند و شما نیز بعد از پایان اولین سفرشان به تعداد افراد معرفی شده، سفرهای رایگان ۱۰٬۰۰۰ تومانی کسب کنید. ",
    referral_shareable_text: "",
    retry_with_higher_price: false,
    ride_message: [
      "الآن می‌آیم",
      "تا پنج دقیقه دیگر می‌آیم",
      "لطفاً با من تماس بگیرید",
    ],
    safety_center: {
      educational_content_screen_url: "https://app.snapp.taxi/safety/info",
      sos_phone_number: "02141849110",
    },
    skippable_rating: true,
    smooth_movement_buffersize: 0,
    smooth_movement_timeextender: 5,
    smooth_movement_timeout: 0,
    snapp_card: {
      is_enabled: true,
    },
    time: {
      current: "2023-05-02T12:43:09+03:30",
    },
    ussd: {
      is_enabled: false,
      is_jiring_enabled: false,
      mci_text: "*733#",
      none_mci_text: "*733#",
      pattern: "*733*4*76277*[-AMT-]#",
      ussd_text: "USSD",
    },
    waiting_gif: "https://downloads.snapp.site/waitings/General-Android.gif",
    waiting_gif_checksum: "",
    waiting_package_gif:
      "https://downloads.snapp.site/waitings/General-Android.gif",
    waiting_tips: [
      {
        desc: "پیش از سوار شدن یا تحویل مرسوله، پلاک خودرو یا موتور و چهره کاربر راننده را با اطلاعات ثبت‌شده در اپلیکیشن تطبیق دهید. در صورت مطابقت نداشتن، سفر را لغو کنید و به پشتیبانی اطلاع دهید.",
        title: "",
      },
      {
        desc: "جابه‌جایی بار فقط از طریق سرویس باکس مجاز است. اسنپ ارسال مرسوله را از طریق سرویس مسافر تایید نمی‌کند. بارهای با ارزش بیش از ۵میلیون تومان را با اسنپ‌باکس جابه‌جا نکنید.",
        title: "",
      },
      {
        desc: "اسنپ تایید صلاحیت کاربران راننده‌ی خود را به پلیس ناجا سپرده‌ است و تمام رانندگان اسنپ پیش از شروع فعالیت توسط پلیس تایید صلاحیت می‌شوند.",
        title: "",
      },
      {
        desc: "در صورت بروز مشکل در سفر می‌توانید از سرویس امنیت سفر استفاده کنید. همچنین با استفاده از «تماس امن» می‌توانید شماره‌ی تماس خود را از دید کاربر راننده پنهان کنید.",
        title: "",
      },
    ],
  },
  status: 200,
};
