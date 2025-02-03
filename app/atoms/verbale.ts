import { atom } from "jotai";

export interface Verbale {
	url: string;
	sections: string[];
}

export const verbaleAtom = atom<Verbale>({
	url: "",
	sections: [],
});
