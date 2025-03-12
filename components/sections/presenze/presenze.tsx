"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useFormContext } from "react-hook-form";
import { DbVerbaleData, Presenza } from "@/types/types";

export function Presenze({ verbale }: { verbale: DbVerbaleData }) {
	const [partecipanti, setPartecipanti] = useState<Presenza[]>([]);
	const formContext = useFormContext();

	useEffect(() => {
		const scrape_page = async () => {
			const response = await axios.get("/api/proxy");
			const $ = cheerio.load(response.data);
			const results = $("b ~ ul");

			const extractParticipants = (index: number) =>
				results.eq(index)
					.find("li")
					.map((_, el) => {
						const text = $(el).text().trim();
						return index === 7 ? text.split(" -")[0].trim() : text;
					})
					.get();

			const ordinari = extractParticipants(0);
			const associati = extractParticipants(1);
			const ricercatori = extractParticipants(2);
			const ricercatori_a = extractParticipants(3);
			const ricercatori_b = extractParticipants(4);
			const dottorandi = extractParticipants(5);
			const amministrativi = extractParticipants(6);
			const rappresentanti = extractParticipants(7);

			const creaDizionario = (nomi: string[], ruolo: string) => {
				return nomi.map((nome) => ({
					nome: nome,
					ruolo: ruolo,
					presente: "",
					assente: "",
					assente_giustificato: "",
				}));
			};

			let partecipanti = [
				...creaDizionario(ordinari, "O"),
				...creaDizionario(associati, "A"),
				...creaDizionario(ricercatori, "RU"),
				...creaDizionario(ricercatori_a, "RTD-a"),
				...creaDizionario(ricercatori_b, "RTD-b"),
			];

			partecipanti.sort((a, b) => a.nome.localeCompare(b.nome));


			partecipanti = [
				...partecipanti,
				...creaDizionario(rappresentanti, "STUD"),
				...creaDizionario(dottorandi, "DOTTND"),
				...creaDizionario(amministrativi, "T.A."),
			];

			setPartecipanti(partecipanti);
			
			if (verbale.data?.presenze) {
				if (verbale.data?.presenze.length > 0) {
					formContext.setValue("presenze", verbale.data?.presenze);
				}
			} else {
				formContext.setValue("presenze", partecipanti);
			}
		};

		scrape_page();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card className="shadow-none rounded-sm hover:shadow-md ">
			<CardHeader className="border-b p-3">
				<CardTitle className="text-lg">Presenze</CardTitle>
			</CardHeader>
			<CardContent className="rounded-sm p-5">
				<DataTable columns={columns} data={partecipanti} />
			</CardContent>
		</Card>
	);
}
