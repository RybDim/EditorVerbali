"use client";

import { Presenza } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import React from "react";

export const columns: ColumnDef<Presenza, unknown>[] = [
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
		header: "Presente",
		cell: ({ row }) => (
				<Input
					name={`presenze.${row.index}.presente`}
				/>
			)
	},
	{
		accessorKey: "assente",
		header: "Assente",
		cell: ({ row }) => (
				<Input
					name={`presenze.${row.index}.assente`}
				/>
			)
	},
	{
		accessorKey: "assente_giustificato",
		header: "Assente giustificato",
		cell: ({ row }) => (
				<Input
					name={`presenze.${row.index}.assente_giustificato`}
				/>
			)
	},
];