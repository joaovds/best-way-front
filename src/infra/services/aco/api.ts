import { apiACO } from "@/infra/ky";
import { GetBestRouteACO } from "./dtos";

export const getBestRouteACO = async (params: GetBestRouteACO.Request): Promise<{ result: GetBestRouteACO.Response | null; error: boolean }> => {
  try {
    const url = "aco/optimize";
    const res = await apiACO.post<GetBestRouteACO.ResponseProps>(url, {
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
    console.log(result);
    return {
      result: new GetBestRouteACO.Response(result),
      error: false,
    };
  } catch (err) {
    return {
      result: null,
      error: true,
    };
  }
}
