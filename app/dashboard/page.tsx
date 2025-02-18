"use client";

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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { VerbaleCard } from "@/components/verbale_card";
import { useRouter } from "next/navigation";
import { verbaleSchema } from "@/lib/schemas/verbale_schema";
import { useEffect, useState } from "react";

type VerbaleFormData = z.infer<typeof verbaleSchema>;

interface Verbale {
	id: string;
	data: {
		numero: string;
		data: string;
		verbalizzante: string;
		direttore: string;
	};
	createdAt: string;
}

export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const [verbali, setVerbali] = useState<Verbale[]>([]);
	const router = useRouter();

	const form = useForm<VerbaleFormData>({
		resolver: zodResolver(verbaleSchema),
		defaultValues: {
			numero: "",
			data: "",
			verbalizzante: "",
			direttore: "",
		},
	});

	useEffect(() => {
		const getVerbali = async () => {
			const response = await fetch("/api/verbale", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});

			const data = await response.json();
			setVerbali(data.verbali);
		}
		
		getVerbali();
	}, [])

	const onSubmit = async (data: VerbaleFormData) => {
		try {
			const response = await fetch('/api/verbale', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('Verbale created:', result);
			setOpen(false);
			form.reset();
			router.push(`/editor/${result.id}`);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Error creating verbale:', error.message);
			} else {
				console.error('Error creating verbale:', String(error));
			}
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Nuovo verbale</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Crea nuovo verbale</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
							<fieldset className="space-y-4">
								<legend className="sr-only">Dettagli del verbale</legend>

								<FormField
									control={form.control}
									name="numero"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Numero verbale</FormLabel>
											<FormControl>
												<input
													className={cn(
														"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
													)}
													type="number"
													placeholder="Inserisci il numero del verbale"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="data"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Data adunanza</FormLabel>
											<FormControl>
												<input
													className={cn(
														"flex h-9 w-full rounded-md border border-input bg-accent focus:bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
													)}
													type="date"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>

							<fieldset className="space-y-4">
								<FormField
									control={form.control}
									name="verbalizzante"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Verbalizzante</FormLabel>
											<FormControl>
												<Input
													placeholder="Inserisci il verbalizzante"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="direttore"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Direttore</FormLabel>
											<FormControl>
												<Input
													placeholder="Inserisci il direttore"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>

							<DialogFooter>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? 'Creazione...' : 'Crea'}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
			<div className="flex flex-wrap space-x-4 p-5">
				{verbali.map((verbale) => (
					<VerbaleCard 
						key={verbale.id} 
						verbale={{
							id: verbale.id,
							data: {
								numero: verbale.data.numero,
								data: verbale.data.data,
								verbalizzante: verbale.data.verbalizzante,
								direttore: verbale.data.direttore,
							},
							createdAt: verbale.createdAt
						}
					}/>
				))}
			</div>
		</>
	);
}
