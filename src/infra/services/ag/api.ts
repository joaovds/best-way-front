import { apiAG } from "@/infra/ky";
import { GetBestRouteAG } from "./dtos";

export const getBestRouteAG = async (params: GetBestRouteAG.Request): Promise<{ result: GetBestRouteAG.Response | null; error: boolean }> => {
  try {
    const res = await apiAG.post<GetBestRouteAG.ResponseProps>('get-route', {
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
