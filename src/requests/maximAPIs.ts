import axios from "axios";

export async function getCitiesRequest(){
  const url = `https://cabinet.taximaxim.ir/0000/Services/Public.svc/CitiesEx?device=samsung%2FSM-A525F%2F11&locale=en&source=orderacar&udid=dbdd557d8431b68e&version=3.14.6o&density=xxhdpi&platform=CLAPP_ANDROID&rt=142634.797&sig=caa7ed7f0292f418b7798ca2ea5bc963`;
  const response = await axios.get(url)
  return response.data
}


export async function sendMaximVerifyCodeRequest(
  body: any,
  deviceName: string,
  udid: string
) {
  const source = "orderacar";
  const version = "3.14.6o";
  const response = await axios.post(
    `https://cabinet.taximaxim.ir/0000/Services/Public.svc/api/v2/login/code/sms/send?device=${deviceName}&source=${source}&udid=${udid}&version=${version}`,
    body
  );
  return response.data;
}

export async function verifyMaximCode(
  body: any,
  deviceName: string,
  udid: string
) {
  const maybeLater =
    "&city=1615&locale=en&density=xxhdpi&platform=CLAPP_ANDROID&rt=003452.718&sig=8a56c8fb2fd4ddd8f19d6cfcb78c16ec";
  const source = "orderacar";
  const version = "3.14.6o";
  const response = await axios.post(
    `https://cabinet.taximaxim.ir/0000/Services/Public.svc/api/v2/login/code/Sms/confirm?device=${deviceName}&source=${source}&udid=${udid}&version=${version}`,
    body
  );

  return response.data;
}

export async function tapsiNewPriceRequest(body, udid) {
  const source = "orderacar";
  const version = "3.14.6o";
  const url = `https://cabinet.taximaxim.ir/0000/Services/Public.svc/api/CLAPP_ANDROID/v2/order/price/calculate?source=${source}&city=1615&udid=${udid}&version=${version}&platform=CLAPP_ANDROID`;
  const response = await axios.post(url, body);
  return response.data;
}
