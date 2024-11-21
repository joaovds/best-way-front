import { GetBestRouteAG } from "@/infra/services/ag";
import { cn } from "@/lib/cn";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";

type RouteTableProps = { data: GetBestRouteAG.RoutePointRes[] };

export const RouteTable: React.FC<RouteTableProps> = ({ data }) => {
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
        {data.map((point, i) => (
          <tr className={cn("text-slate-200")} key={`${point.is_starting}-${i}`}>
            <td className="p-3 text-center w-[100px]">
              {i}
            </td>
            <td className="p-3 w-[100px]">
              <SealCheck size={28} weight={point.is_starting ? "duotone" : "regular"} className={cn(" mx-auto", point.is_starting ? "text-green-300" : "opacity-40")} />
            </td>
            <td className="p-3 min-w-[200px] max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
              {point.address}
            </td>
            <td className="p-3 text-center w-[300px]">
              {point.distance_human_readable}
            </td>
            <td className="p-3 text-center w-[300px]">
              {point.time_human_readable}
            </td>
          </tr>
        ))}
      </tbody>
    </table >
  );
}
