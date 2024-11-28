import { apiAG } from "@/infra/ky";
import { GetBestRouteAG } from "./dtos";

export const getBestRouteAG = async (params: GetBestRouteAG.Request): Promise<{ result: GetBestRouteAG.Response | null; error: boolean }> => {
  try {
    const url = params.calculator === "MAPS" ? "get-route" : "get-route-test-mock";
    const res = await apiAG.post<GetBestRouteAG.ResponseProps>(url, {
      json: params,
      timeout: 60000,
    });
    if (res.status !== 200) {
      return {
        result: null,
        error: true,
      };
    }
    const result = await res.json();
    return {
      result: new GetBestRouteAG.Response(result),
      error: false,
    };
  } catch (err) {
    return {
      result: null,
      error: true,
    };
  }
}
