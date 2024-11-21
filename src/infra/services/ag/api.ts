import { apiAG } from "@/infra/ky";
import { GetBestRouteAG } from "./dtos";

export const getBestRouteAG = async (params: GetBestRouteAG.Request): Promise<{ result: GetBestRouteAG.Response | null; error: boolean }> => {
  const formData = new FormData();
  formData.append('mutation_rate', String(params.mutation_rate))
  formData.append('elitism', String(params.elitism))
  formData.append('max_generations', String(params.max_generations))
  formData.append('max_population', String(params.max_population))
  formData.append("locations", params.locations.toString())

  try {
    const res = await apiAG.post<{
      statusCode: number;
      data: GetBestRouteAG.ResponseProps;
    }>('plan', {
      body: formData,
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
      result: new GetBestRouteAG.Response(result.data),
      error: false,
    };
  } catch (err) {
    return {
      result: null,
      error: true,
    };
  }
}
