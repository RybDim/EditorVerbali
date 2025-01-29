import { atom } from "jotai";

export interface Verbale {
	url: string;
	isLoading: boolean;
	isError: boolean;
}

export const verbaleAtom = atom({
	url: "",
	isLoading: false,
	isError: false,
});
