import { cn } from "@/lib/cn";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";

type RouteTableProps = {};

export const RouteTable: React.FC<RouteTableProps> = () => {
  return (
    <table className="w-full outline-dashed outline-1 rounded outline-offset-1 outline-blue-300">
      <thead>
        <tr className={cn("bg-indigo-950 text-blue-100")}>
          <th className="p-3 text-center">
            Parada
          </th>
          <th className="p-3 text-center">
            Start
          </th>
          <th className="p-3 text-left  overflow-hidden text-ellipsis whitespace-nowrap">
            Endereço
          </th>
          <th className="p-3 text-center">
            Distância Prox. Parada
          </th>
          <th className="p-3 text-center">
            Tempo Prox. Parada
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={cn("text-slate-200")}>
          <td className="p-3 text-center w-[100px]">
            0
          </td>
          <td className="p-3 w-[100px]">
            <SealCheck size={28} weight={true ? "duotone" : "regular"} className={cn(" mx-auto", true ? "text-green-300" : "opacity-40")} />
          </td>
          <td className="p-3 min-w-[200px] max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
            Universidade Católica de Santos - Campus Dom Idílio
          </td>
          <td className="p-3 text-center w-[300px]">
            106 m
          </td>
          <td className="p-3 text-center w-[300px]">
            0m26s
          </td>
        </tr>
        <tr className={cn("text-slate-200")}>
          <td className="p-3 text-center w-[100px]">
            1
          </td>
          <td className="p-3 w-[100px]">
            <SealCheck size={28} weight={false ? "duotone" : "regular"} className={cn(" mx-auto", false ? "text-green-300" : "opacity-40")} />
          </td>
          <td className="p-3 min-w-[200px] max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
            Universidade Católica de Santos - Campus Dom Idílio
          </td>
          <td className="p-3 text-center w-[300px]">
            106 m
          </td>
          <td className="p-3 text-center w-[300px]">
            0m26s
          </td>
        </tr>
        <tr className={cn("text-slate-200")}>
          <td className="p-3 text-center w-[100px]">
            2
          </td>
          <td className="p-3 w-[100px]">
            <SealCheck size={28} weight={false ? "duotone" : "regular"} className={cn(" mx-auto", false ? "text-green-300" : "opacity-40")} />
          </td>
          <td className="p-3 min-w-[200px] max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
            Universidade Católica de Santos - Campus Dom Idílio
          </td>
          <td className="p-3 text-center w-[300px]">
            106 m
          </td>
          <td className="p-3 text-center w-[300px]">
            0m26s
          </td>
        </tr>
      </tbody>
    </table>
  );
}
