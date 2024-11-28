export namespace GetBestRouteACO {
  export type Request = {
    alfa: number;
    beta: number;
    taxaEvaporacao: number;
    locations: { endereco: string; is_starting: boolean }[];
  }

  export type ResponseProps = {
    charts_html: string;
    totalDistanceHumanReadable: string;
    totalTimeHumanReadable: string;
    totalTime: number;
    totalDistance: number;
    locations: RoutePointRes[];
    convergenceData: { iteration: number; bestSolutionCost: number }[];
  }

  export type RoutePointRes = {
    address: string;
    distanceHumanReadable: string;
    timeHumanReadable: string;
    starting: boolean;
    distanceToNextPoint: number;
    timeInSeconds: number;
  };

  export class Response {
    constructor(public readonly props: ResponseProps) { }
  }
}
