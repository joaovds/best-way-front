"use client";

import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { Calculator, CircleNotch, Dna, Info } from "@phosphor-icons/react/dist/ssr";

const DynamicCharts = dynamic(() => import('./charts'), {
  ssr: false,
});

import { cn } from "@/lib/cn";
import { Input } from "@/components/input";
import { RouteTable } from "./table";
import { useData } from "@/infra/jotai";
import { GetBestRouteAG, getBestRouteAG } from "@/infra/services/ag";

type AGResultsProps = {};

export const AGResults: React.FC<AGResultsProps> = () => {
  const { data } = useData();
  const [agResponse, setAgResponse] = useState<GetBestRouteAG.ResponseProps | null>(null);

  const fetchBestRoute = async () => {
    const { result, error } = await getBestRouteAG({
      max_generations: data?.max_generations ?? 0,
      max_population: data?.max_population ?? 0,
      mutation_rate: data?.mutation_rate ?? 0,
      elitism: data?.elitism ?? 0,
      locations: data?.points ?? [],
    });

    if (error) {
      toast.error("Houve algum erro ao buscar a melhor rota no AG");
    } else {
      toast.success('Rota no AG encontrada com sucesso!');
      result && setAgResponse(result.props)
      console.log(result)
    }
  };

  useEffect(() => {
    if (data) {
      fetchBestRoute();
    }
  }, [data]);

  return (
    <section className={cn("flex flex-col gap-5 py-4 border-2 border-dotted border-violet-800 border-opacity-50 rounded")}>
      <header className={cn("px-4 pb-4 flex gap-5 items-center border-b-2 border-dotted border-violet-800 border-opacity-50 text-violet-200")}>
        <Dna size={32} />
        <h4
          className={cn(
            "text-lg font-semibold ",
            "md:text-xl",
            "lg:text-2xl",
            "xl:text-3xl"
          )}
        >
          Algorítmo Genético
        </h4>
      </header>

      {agResponse && (
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
                  label="Tam. População"
                  name=""
                  value={agResponse.population_size}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
                <Input
                  label="Máx. Gerações"
                  name=""
                  value={agResponse.max_generations}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
                <Input
                  label="Elitismo"
                  name=""
                  value={agResponse.elitism_number}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
                <Input
                  label="Taxa de Mutação"
                  name=""
                  value={agResponse.mutation_rate}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
                <Input
                  label="Tempo de Execução"
                  name=""
                  value={agResponse.algorithm_time}
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
                  value={agResponse.total_distance_human_readable}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
                <Input
                  label="Tempo Médio"
                  name=""
                  value={agResponse.total_time_human_readable}
                  containerClassName="min-w-48 flex-1"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div
            className={cn("p-4 w-full overflow-x-auto")}
          >
            <DynamicCharts html={agResponse.charts_html} />
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
            <RouteTable data={agResponse.route} />
          </div>
        </>
      )}

      {!agResponse && <CircleNotch size={48} className={cn('m-10 self-center animate-spin text-violet-100')} />}
    </section>
  );
}
