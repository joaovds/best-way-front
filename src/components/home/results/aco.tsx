"use client";

import { BugBeetle, CircleNotch } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/cn";
import { useData } from "@/infra/jotai";

type ACOResultsProps = {};

export const ACOResults: React.FC<ACOResultsProps> = () => {
  const { data } = useData();

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
