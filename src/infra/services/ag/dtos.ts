import { LocationReq } from "@/infra/services/shared";

export namespace GetBestRouteAG {
  export type Request = {
    locations_quantity: number;
    mutation_rate: number;
    elitism: number;
    max_generations: number;
    max_population: number;
    locations: LocationReq[];
    calculator: "MAPS" | "MOCKED";
  }

  export type ResponseProps = {
    charts_html: string;
    algorithm_time: string;
    total_distance_human_readable: string;
    total_time_human_readable: string;
    route: RoutePointRes[];
    total_time: number;
    population_size: number;
    max_generations: number;
    elitism_number: number;
    total_distance: number;
    mutation_rate: number;
  }

  export type RoutePointRes = {
    address: string;
    distance_human_readable: string;
    time_human_readable: string;
    is_starting: boolean;
    distance_to_next_point: number;
    time_in_seconds: number;
  };

  export class Response {
    constructor(public readonly props: ResponseProps) { }
  }
}
