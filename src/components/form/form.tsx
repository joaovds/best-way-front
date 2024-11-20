"use client";

import { z } from 'zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";

import { Button, Input } from "@/components";
import { cn } from "@/lib/cn";
import { fields } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';

const formSchema = z.object({
  points: z.object({
    address: z.string().min(10, "Deve conter pelo menos 10 caracteres"),
    is_starting: z.boolean().default(false),
  }).array().min(3, "Deve haver o mínimo de 3 endereços").refine(data => {
    return data.some(point => point.is_starting)
  }, "Pelo menos um endereço deve ser marcado como ponto de início"),
});

type FormSchemaType = z.infer<typeof formSchema>;

type FormProps = {};

export const Form: React.FC<FormProps> = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
  });

  const { fields: points, append: pointsAppend, update } = useFieldArray({
    control,
    name: "points",
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(JSON.stringify(data, null, 2))
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
                            "w-10 h-10 flex items-center justify-center border border-slate-800 rounded bg-indigo-950 bg-opacity-20",
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

            {errors.points?.root?.message && <span className="text-2xs text-red-400">{errors.points.root.message}</span>}
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
  );
}
