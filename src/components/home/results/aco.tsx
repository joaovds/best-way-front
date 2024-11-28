"use client";

import { useEffect, useState } from "react";
import { BugBeetle, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";

import { cn } from "@/lib/cn";
import { useData } from "@/infra/jotai";
import { GetBestRouteACO, getBestRouteACO } from "@/infra/services/aco";

type ACOResultsProps = {};

export const ACOResults: React.FC<ACOResultsProps> = () => {
  const { data } = useData();
  const [acoResponse, setAcoResponse] = useState<GetBestRouteACO.ResponseProps | null>(null);

  const fetchBestRoute = async () => {
    const { result, error } = await getBestRouteACO({
      alfa: data?.alpha ?? 0,
      beta: data?.beta ?? 0,
      taxaEvaporacao: data?.evaporationRate ?? 0,
      locations: data?.points.map(p => p.address) ?? [],
    });

    if (error) {
      toast.error("Houve algum erro ao buscar a melhor rota no AG");
    } else {
      toast.success('Rota no AG encontrada com sucesso!');
      result && setAcoResponse(result.props)
    }
  };

  useEffect(() => {
    if (data && (data.algotithm === "ACO" || data.algotithm === "AMBOS")) {
      fetchBestRoute();
    }
  }, [data]);

  return (
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

      {!data && <CircleNotch size={48} className={cn('m-10 self-center animate-spin text-violet-100')} />}
    </section>
  );
}
