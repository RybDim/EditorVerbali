"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Presenza } from "@/types/types";

export function Presenze() {
	const [partecipanti, setPartecipanti] = useState<Presenza[]>([]);
	useEffect(() => {
		const scrape_page = async () => {
			const response = await axios.get("/api/proxy");
			const $ = cheerio.load(response.data);
			const results = $("b ~ ul");

			const ordinari = results
				.eq(0)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const associati = results
				.eq(1)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const ricercatori = results
				.eq(2)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const ricercatori_a = results
				.eq(3)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const ricercatori_b = results
				.eq(4)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const dottorandi = results
				.eq(5)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const amministrativi = results
				.eq(6)
				.find("li")
				.map((_, el) => $(el).text().trim())
				.get();

			const rappresentanti = results
				.eq(7)
				.find("li")
				.map((_, el) => {
					const text = $(el).text().trim();
					return text.split(" -")[0].trim();
				})
				.get();

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
		};

		scrape_page();
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
