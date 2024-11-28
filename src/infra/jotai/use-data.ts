import { useAtom } from "jotai"
import { DataAtom } from "./atoms"

export const useData = () => {
  const [data, setData] = useAtom(DataAtom);

  return { data, setData };
}
