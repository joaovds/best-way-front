import { atom } from "jotai";

import { FormSchemaType } from "@/components";

export const DataAtom = atom<FormSchemaType | null>(null);
