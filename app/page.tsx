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
import * as React from "react";
import Form from "next/form";
// import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function App() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Nuovo verbale</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crea nuovo verbale</DialogTitle>
				</DialogHeader>
				<Form action="/editor" className="flex flex-col gap-6">
					<fieldset className="space-y-4">
						<legend className="sr-only">Dettagli del verbale</legend>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="numero_verbale"
								className="text-sm font-medium text-foreground"
							>
								Numero verbale
							</label>
							<input
								type="number"
								id="numero_verbale"
								name="numero_verbale"
								step={1}
								className={cn(
									"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								)}
								placeholder="Inserisci il numero del verbale"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="data"
								className="text-sm font-medium text-foreground"
							>
								Data adunanza
							</label>
							<input
								type="date"
								id="data"
								name="data"
								className={cn(
									"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								)}
							/>
						</div>
					</fieldset>

					<fieldset className="space-y-4">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="verbalizzante"
								className="text-sm font-medium text-foreground"
							>
								Verbalizzante
							</label>
							<input
								type="text"
								id="verbalizzante"
								name="verbalizzante"
								className={cn(
									"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								)}
								placeholder="Inserisci il verbalizzante"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="direttore"
								className="text-sm font-medium text-foreground"
							>
								Direttore
							</label>
							<input
								type="text"
								id="direttore"
								name="direttore"
								className={cn(
									"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								)}
								placeholder="Inserisci il direttore"
							/>
						</div>
					</fieldset>

					<DialogFooter>
						<Button type="submit">Crea</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
