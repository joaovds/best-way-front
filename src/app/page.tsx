import { Form } from "@/components";
import { cn } from "@/lib/cn";

export default function Home() {
  return (
    <div
      className={cn(
        "px-6",
        "md:px-10",
        "lg:px-20",
      )}
    >
      <header
        className={cn("border-b border-dashed border-slate-800 py-10 flex flex-col gap-6 items-center", "md:gap-8")}
      >
        <h1
          className={cn(
            "text-yellow-300 font-bold text-3xl tracking-wider",
            "md:text-4xl",
            "lg:text-5xl",
          )}
        >
          Best Way
        </h1>

        <i
          className={cn(
            "text-center max-w-[1000px] text-slate-400 text-lg",
            "md:text-xl",
          )}
        >
          Descubra a melhor rota para os endereços informados usando técnicas de <br className={"hidden md:block"} /> <b>algoritmos genéticos</b> e/ou <b>colônia de formigas</b>
        </i>
      </header>

      <Form />
    </div >
  );
}
