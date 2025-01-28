"use client";

import { Presenza } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Presenza>[] = [
	{
		accessorKey: "nome",
		header: "Nome",
	},
	{
		accessorKey: "ruolo",
		header: "Ruolo",
	},
	{
		accessorKey: "presente",
		header: "Presenza",
	},
	{
		accessorKey: "assente",
		header: "Assente",
	},
	{
		accessorKey: "assente_giustificato",
		header: "Assente giustificato",
	},
];
