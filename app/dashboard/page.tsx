"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { VerbaleCard } from "@/components/verbale_card";
import { verbaleSchema } from "@/lib/schemas/verbale_schema";
import { useVerbali } from "@/hooks/useVerbali";

type VerbaleFormData = z.infer<typeof verbaleSchema>;

const FORM_FIELDS = [
	{ name: 'numero', type: 'text', label: 'Numero' },
	{ name: 'data', type: 'date', label: 'Data' },
	{ name: 'verbalizzante', type: 'text', label: 'Verbalizzante' },
	{ name: 'direttore', type: 'text', label: 'Direttore' }
] as const;

export default function Dashboard() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	const { verbali, createVerbale, deleteVerbale, isLoading } = useVerbali();

	const form = useForm<VerbaleFormData>({
		resolver: zodResolver(verbaleSchema),
		defaultValues: {
			numero: "",
			data: "",
			verbalizzante: "",
			direttore: "",
		},
	});

	const onSubmit = async (data: VerbaleFormData) => {
		try {
			const result = await createVerbale(data);
			setIsDialogOpen(false);
			form.reset();
			router.push(`/editor/${result.id}`);
		} catch (error) {
			console.error("Error creating verbale:", error);
		}
	};

	const onDelete = async (id: string) => {
		try {
			await deleteVerbale(id);
		} catch(error) {
			console.error("Error deleting verbale: ", error);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Verbali Dashboard</h1>
					
					{/* Create New Verbale Dialog */}
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

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="flex flex-col gap-6"
								>
									<div className="space-y-4">
										{FORM_FIELDS.map(({ name, type, label }) => (
											<FormField
												key={name}
												control={form.control}
												name={name}
												render={({ field }) => (
													<FormItem>
														<div className="flex items-center gap-3">
															{/* <Icon className="w-5 h-5 text-gray-500" /> */}
															<FormLabel className="text-gray-700">{label}</FormLabel>
														</div>
														<FormControl>
															<Input
																type={type}
																placeholder={`Inserisci il ${label.toLowerCase()}`}
																className="mt-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
																{...field}
															/>
														</FormControl>
														<FormMessage className="text-red-500 text-sm mt-1" />
													</FormItem>
												)}
											/>
										))}
									</div>

									<DialogFooter>
										<Button
											type="submit"
											disabled={form.formState.isSubmitting || isLoading}
											className="w-full bg-blue-600 hover:bg-blue-700 text-white"
										>
											{form.formState.isSubmitting || isLoading
												? "Creazione in corso..."
												: "Crea Verbale"}
										</Button>
									</DialogFooter>
								</form>
							</Form>
						</DialogContent>
					</Dialog>
				</header>

				{/* Verbali Grid */}
				{verbali.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{verbali.map((verbale) => (
							<VerbaleCard 
								key={verbale.id} 
								verbale={verbale}
								onDelete={onDelete}
								// className="transition-all duration-300 hover:shadow-lg hover:scale-105" 
							/>
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