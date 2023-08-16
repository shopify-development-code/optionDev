import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

export async function DynamicApi(url, data, method, app) {
  const sessionToken = await getSessionToken(app);
  const res = axios({
    method: method,
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  return res;
}
