import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";

import { Button, Input } from "@/components";
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

      <form>
        <main
          className={cn(
            "mt-10 flex flex-col gap-6",
            "md:mt-16",
            "lg:flex-row lg:items-start",
          )}
        >
          <section
            className={cn(
              "flex-1 flex flex-col gap-2",
              "lg:gap-6"
            )}
          >
            <h2
              className={cn(
                "text-lg text-green-200 font-bold",
                "md:text-xl",
                "lg:text-2xl",
                "xl:text-3xl"
              )}
            >
              Pontos de entrega
            </h2>

            <div
              className={cn(
                "p-4 border border-dashed border-green-600 rounded-lg",
              )}
            >
              <table
                className="w-full rounded-lg"
              >
                <thead className="border-b border-dashed border-green-900 text-slate-500">
                  <tr>
                    <th className="py-2 w-1/4">
                      <span>Ponto Inicial</span>
                    </th>
                    <th className="py-2 w-3/4 text-left">
                      <span>Endereço</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4">
                      <div className={cn("flex items-center justify-center")}>
                        <Checkbox.Root
                          id=""
                          className={cn(
                            "w-10 h-10 flex items-center justify-center border border-slate-800 rounded bg-indigo-950 bg-opacity-20",
                            "data-[state=checked]:border-green-900 data-[state=checked]:bg-green-800 data-[state=checked]:bg-opacity-20",
                          )}
                        >
                          <Checkbox.Indicator>
                            <Check weight="bold" size={22} className="text-green-200" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                    </td>
                    <td className="py-4">
                      <Input name="address" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <Button
                text="Outro"
                iconLeft={<Plus />}
                className={cn(
                  "mt-4 text-green-100 bg-green-800 bg-opacity-20 border-green-700",
                  "hover:bg-opacity-30",
                )}
              />
            </div>
          </section>

          <section
            className={cn(
              "flex-1",
            )}
          >
            <h2>
              Section 2
            </h2>
          </section>
        </main>
      </form>
    </div>
  );
}
