"use client";
import { useState } from "react";
import * as z from "zod";
import { PlusIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { VerbaleCard } from "@/components/verbale_card";
import { verbaleSchema } from "@/lib/schemas/verbale_schema";
import { useVerbali } from "@/hooks/useVerbali";
import { VerbaleForm } from "@/components/dashboard/verbale_form";

export type VerbaleFormData = z.infer<typeof verbaleSchema>;

export default function Dashboard() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { verbali, createVerbale, deleteVerbale, isLoading } = useVerbali();

	const onDelete = async (id: string) => {
		try {
			await deleteVerbale(id);
		} catch (error) {
			console.error("Error deleting verbale: ", error);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Verbali Dashboard</h1>

					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button
								className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
							>
								<PlusIcon className="w-5 h-5" />
								Nuovo Verbale
							</Button>
						</DialogTrigger>

						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle className="text-2xl font-semibold text-gray-800">
									Crea nuovo verbale
								</DialogTitle>
							</DialogHeader>
							<VerbaleForm createVerbale={createVerbale} isLoading={isLoading} setIsDialogOpen={setIsDialogOpen} />
						</DialogContent>
					</Dialog>
				</header>

				{verbali.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{verbali.map((verbale) => (
							verbale && verbale.id ? (
								<VerbaleCard
									key={verbale.id}
									verbale={verbale}
									onDelete={onDelete}
								/>
							) : null
						))}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-lg shadow-md">
						<FileTextIcon className="mx-auto w-16 h-16 text-gray-300 mb-4" />
						<p className="text-xl text-gray-600">
							Nessun verbale creato. Inizia creando il tuo primo verbale!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}