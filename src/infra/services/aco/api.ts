import { apiACO, apiAG } from "@/infra/ky";
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

    const { result: graphHtml, error } = await getGraphACO(result);
    if (!error && graphHtml) {
      result.charts_html = graphHtml;
    }

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

const getGraphACO = async (params: GetBestRouteACO.ResponseProps): Promise<{ result: string | null; error: boolean }> => {
  try {
    const url = "chart-html-generate";
    const res = await apiAG.post<{ data: string }>(url, {
      json: {
        title: "Convergence - ACO",
        x: params.convergenceData.map(d => d.iteration),
        y: params.convergenceData.map(d => d.bestSolutionCost),
      },
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
      result: result.data,
      error: false,
    };
  } catch (err) {
    return {
      result: null,
      error: true,
    };
  }
}
