"use client";

import { useEffect, useState } from "react";
import { BugBeetle, Calculator, CircleNotch, Info } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";

import { cn } from "@/lib/cn";
import { useData } from "@/infra/jotai";
import { GetBestRouteACO, getBestRouteACO } from "@/infra/services/aco";
import { Input } from "@/components";
import { RouteTable } from "./table";

type ACOResultsProps = {};

export const ACOResults: React.FC<ACOResultsProps> = () => {
  const { data } = useData();
  const [acoResponse, setAcoResponse] = useState<GetBestRouteACO.ResponseProps | null>(null);

  const fetchBestRoute = async () => {
    const { result, error } = await getBestRouteACO({
      alfa: data?.alpha ?? 0,
      beta: data?.beta ?? 0,
      taxaEvaporacao: data?.evaporationRate ?? 0,
      locations: data?.points.map(p => ({ endereco: p.address, is_starting: p.is_starting })) ?? [],
    });

    if (error) {
      toast.error("Houve algum erro ao buscar a melhor rota no AG");
    } else {
      toast.success('Rota no ACO encontrada com sucesso!');
      result && setAcoResponse(result.props)
    }
  };

  useEffect(() => {
    if (data && (data.algotithm === "ACO" || data.algotithm === "AMBOS")) {
      fetchBestRoute();
    }
  }, [data]);

  return (data!.algotithm === "ACO" || data!.algotithm === "AMBOS") ? (
    <section className={cn("flex flex-col py-4 border-2 border-dotted border-violet-800 border-opacity-50 rounded")}>
      <header className={cn("px-4 pb-4 flex gap-5 items-center border-b-2 border-dotted border-violet-800 border-opacity-50 text-violet-200")}>
        <BugBeetle size={32} />
        <h4
          className={cn(
            "text-lg font-semibold ",
            "md:text-xl",
            "lg:text-2xl",
            "xl:text-3xl"
          )}
        >
          Colônia de Formigas
        </h4>
      </header>

      <>
        {acoResponse && (
          <>
            <div
              className={cn("px-4 flex flex-col gap-3")}
            >
              <div
                className={cn("flex flex-col gap-6")}
              >
                <h5
                  className={cn(
                    "mt-10 flex items-center gap-2 self-start px-10 py-2 rounded-full bg-violet-600 bg-opacity-20 border-2 border-dotted border-violet-600",
                    "text-sm text-violet-200 font-semibold",
                    "md:text-base",
                    "lg:text-xl",
                  )}
                >
                  <Info size={28} />
                  Algorítmo
                </h5>

                <div
                  className={cn(
                    "flex flex-wrap gap-3",
                  )}
                >
                  <Input
                    label="Alfa"
                    name=""
                    value={data?.alpha}
                    containerClassName="min-w-48 flex-1"
                    readOnly
                  />
                  <Input
                    label="Beta"
                    name=""
                    value={data?.beta}
                    containerClassName="min-w-48 flex-1"
                    readOnly
                  />
                  <Input
                    label="Taxa de Evaporação"
                    name=""
                    value={data?.evaporationRate}
                    containerClassName="min-w-48 flex-1"
                    readOnly
                  />
                </div>
              </div>

              <div
                className={cn("flex flex-col gap-6")}
              >
                <h5
                  className={cn(
                    "mt-10 flex items-center gap-2 self-start px-10 py-2 rounded-full bg-violet-600 bg-opacity-20 border-2 border-dotted border-violet-600",
                    "text-sm text-violet-200 font-semibold",
                    "md:text-base",
                    "lg:text-xl",
                  )}
                >
                  <Calculator size={28} />
                  Resultado
                </h5>

                <div
                  className={cn(
                    "flex flex-wrap gap-3",
                  )}
                >
                  <Input
                    label="Distância Total"
                    name=""
                    value={acoResponse.totalDistanceHumanReadable}
                    containerClassName="min-w-48 flex-1"
                    readOnly
                  />
                  <Input
                    label="Tempo Médio"
                    name=""
                    value={acoResponse.totalTimeHumanReadable}
                    containerClassName="min-w-48 flex-1"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div
              className={cn("p-4 w-full overflow-x-auto")}
            >
              {/* <DynamicCharts html={agResponse.charts_html} /> */}
            </div>

            <div className={cn("w-full p-4 flex flex-col gap-4 overflow-x-auto")}>
              <h4
                className={cn(
                  "text-base text-indigo-200 font-semibold",
                  "md:text-xl",
                  "lg:text-2xl",
                )}
              >
                Rota
              </h4>
              <RouteTable
                data={acoResponse.locations.map(l => ({
                  is_starting: l.starting,
                  address: l.address,
                  time_in_seconds: l.timeInSeconds,
                  time_human_readable: l.timeHumanReadable,
                  distance_to_next_point: l.distanceToNextPoint,
                  distance_human_readable: l.distanceHumanReadable,
                }))}
              />
            </div>
          </>
        )}

        {!acoResponse && <CircleNotch size={48} className={cn('m-10 self-center animate-spin text-violet-100')} />}
      </>
    </section>
  ) : null;
}
