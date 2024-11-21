"use client";

import { MathOperations } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/cn";
import { AGResults } from "./ag";
import { ACOResults } from "./aco";
import { useData } from "@/infra/jotai";

type ResultsProps = {};

export const Results: React.FC<ResultsProps> = () => {
  const { data } = useData();

  return data ? (
    <section className={cn("pb-20 flex flex-col gap-12")}>
      <header className={cn("px-10 py-3 flex gap-5 items-center justify-center text-violet-100 bg-violet-600 rounded outline-2 outline-dashed outline-offset-2 outline-violet-800")}>
        <MathOperations size={40} />
        <h2
          className={cn(
            "text-xl font-bold",
            "md:text-2xl",
            "lg:text-3xl",
            "xl:text-4xl"
          )}
        >
          Resultados
        </h2>
      </header>

      <AGResults />
      <ACOResults />
    </section>
  ) : null;
}
