"use client";

import { z } from 'zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, PersonSimpleRun, Plus, Smiley } from "@phosphor-icons/react/dist/ssr";

import { Button, Input } from "@/components";
import { cn } from "@/lib/cn";
import { useData } from '@/infra/jotai';

const formSchema = z.object({
  algotithm: z.enum(["AG", "ACO", "AMBOS"]).default("AG"),
  mutation_rate: z.number().positive().optional(),
  elitism: z.number().optional(),
  max_generations: z.number().int({ message: "Deve ser um número inteiro" }).positive().optional(),
  max_population: z.number().int({ message: "Deve ser um número inteiro" }).positive().optional(),
  points: z.object({
    address: z.string().min(10, "Deve conter pelo menos 10 caracteres"),
    is_starting: z.boolean().default(false),
  }).array().min(3, "Deve haver o mínimo de 3 endereços").refine(data => {
    return data.some(point => point.is_starting)
  }, "Pelo menos um endereço deve ser marcado como ponto de início"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export type FormProps = {};

export const Form: React.FC<FormProps> = () => {
  const { setData } = useData();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    resetField,
    watch,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      points: [{ address: "", is_starting: true }],
    },
    values: {
      algotithm: "AG",
      points: [],
      elitism: 4,
      mutation_rate: 0.2,
      max_generations: 700,
      max_population: 7000,
    },
  });

  const { fields: points, append: pointsAppend, update } = useFieldArray({
    control,
    name: "points",
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setData(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              "p-4 border border-dashed border-green-600 rounded-lg flex flex-col gap-4",
              errors.points?.message && "border-red-400",
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
                {points.map((point, pointIdx) => (
                  <tr key={point.id}>
                    <td className="py-4">
                      <div className={cn("flex h-full justify-center")}>
                        <Checkbox.Root
                          id=""
                          className={cn(
                            "w-10 h-10 flex items-center justify-center border border-slate-700 rounded bg-indigo-950 bg-opacity-20",
                            "data-[state=checked]:border-green-900 data-[state=checked]:bg-green-800 data-[state=checked]:bg-opacity-20",
                          )}
                          checked={points[pointIdx].is_starting}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              points.forEach((_, i) => {
                                if (i != pointIdx) {
                                  update(i, {
                                    address: points[i].address,
                                    is_starting: false,
                                  });
                                }
                              })
                            }

                            update(pointIdx, {
                              address: points[pointIdx].address,
                              is_starting: !!checked,
                            });
                          }}
                        >
                          <Checkbox.Indicator>
                            <Check weight="bold" size={22} className="text-green-200" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                    </td>
                    <td className="py-4">
                      <Input
                        name={`points.${pointIdx}.address`}
                        register={register}
                        error={errors.points && errors.points[pointIdx]?.address?.message}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button
              type='button'
              text="Outro"
              iconLeft={<Plus />}
              className={cn(
                "mt-4 text-green-100 bg-green-800 bg-opacity-20 border-green-700",
                "hover:bg-opacity-30",
              )}
              onClick={() => {
                pointsAppend({
                  address: "",
                  is_starting: false,
                })
              }}
            />

            <Button
              type='button'
              text="Exemplo"
              iconLeft={<Smiley />}
              className={cn(
                "mt-4 text-purple-100 bg-purple-800 bg-opacity-20 border-purple-700",
                "hover:bg-opacity-30",
              )}
              onClick={() => {
                resetField("points");

                [
                  "Universidade Católica de Santos - Campus Dom Idílio",
                  "Av. Conselheiro Nébias, 320 - Vila Matias",
                  "Av. Ana Costa, 340 - Vila Matias, Santos",
                  "Av. Dr. Pedro Lessa, 905 - Ponta da Praia, Santos",
                  "Av. Presidente Wilson - Gonzaguinha, São Vicente",
                  "Prç. dos Expedicionários - Gonzaga",
                  "Praça da Independência - Gonzaga",
                  "Universidade Santa Cecília",
                ].forEach((p, i) => {
                  pointsAppend({
                    address: p,
                    is_starting: i === 0,
                  })
                })
              }}
            />

            {errors.points?.root?.message && <span className="text-2xs text-red-400">{errors.points.root.message}</span>}
          </div>
        </section>

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
            Configurações
          </h2>

          <div
            className={cn(
              "p-4 pt-8 border border-dashed border-green-600 rounded-lg flex flex-col gap-4",
            )}
          >
            <div className={cn("flex flex-col gap-3")}>
              <span className='text-slate-500 font-semibold'>
                Algoritmo
              </span>

              <ToggleGroup.Root
                type="single"
                value={watch("algotithm")}
                onValueChange={(value: "AG" | "ACO" | "AMBOS") => setValue("algotithm", value)}
                className={cn(
                  "flex flex-col",
                  "sm:flex-row text-green-100 tracking-wider",
                )}
              >
                <ToggleGroup.Item
                  value="AG"
                  className={cn(
                    "flex-1 py-3 bg-green-800  bg-opacity-20 data-[state=on]:bg-green-800 text-green-100 border border-green-800 hover:bg-opacity-40",
                    "rounded-t sm:rounded-t-none sm:rounded-l sm:rounded-tl"
                  )}
                >
                  Algoritmo Genético
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="ACO"
                  className={cn(
                    "flex-1 py-3 bg-green-800 bg-opacity-20 data-[state=on]:bg-green-800 text-green-100 border border-green-800 hover:bg-opacity-40",
                  )}
                >
                  Colônia de Formigas
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="AMBOS"
                  className={cn(
                    "flex-1 py-3 bg-green-800 bg-opacity-20 data-[state=on]:bg-green-800 text-green-100 border border-green-800 hover:bg-opacity-40",
                    "rounded-b sm:rounded-b-none sm:rounded-r"
                  )}
                >
                  Ambos
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>


            {(watch("algotithm") === "ACO") && (
              <strong
                className={cn(
                  "text-2xl text-red-900"
                )}
              >
                Sem configurações disponíveis
              </strong>
            )}

            {(watch("algotithm") === "AG" || watch("algotithm") === "AMBOS") && (
              <div
                className={cn("flex flex-col gap-3")}
              >
                <div
                  className={cn(
                    "flex flex-col gap-3",
                    "sm:flex-row",
                  )}
                >
                  <Input
                    label="Máximo de gerações"
                    name="max_generations"
                    type='number'
                    register={register}
                  />

                  <Input
                    label="Máximo de indivíduos"
                    name="max_population"
                    type='number'
                    register={register}
                  />
                </div>

                <div
                  className={cn(
                    "flex flex-col gap-3",
                    "sm:flex-row",
                  )}
                >
                  <Input
                    label="Taxa de mutação"
                    name="mutation_rate"
                    type='number'
                    step={0.001}
                    register={register}
                  />

                  <Input
                    label="Elitismo"
                    name="elitism"
                    type='number'
                    register={register}
                  />
                </div>
              </div>
            )}

            <Button
              type='submit'
              text='Encontrar Rota'
              iconLeft={<PersonSimpleRun weight='bold' size={22} />}
              className={cn(
                "mt-10 text-yellow-50 bg-yellow-600 border-yellow-700 font-semibold",
                "hover:bg-opacity-80",
              )}
            />
          </div>
        </section>
      </main>
    </form>
  );
}
