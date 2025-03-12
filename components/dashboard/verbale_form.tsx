import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { VerbaleFormData } from "@/app/dashboard/page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verbaleSchema } from "@/lib/schemas/verbale_schema";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";


interface VerbaleFormProps {
	isLoading: boolean;
	createVerbale: (data: {
		numero: string;
    data: string;
    verbalizzante: string;
    direttore: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}) => Promise<any>;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const FORM_FIELDS = [
	{ name: 'numero', type: 'text', label: 'Numero' },
	{ name: 'data', type: 'date', label: 'Data' },
	{ name: 'verbalizzante', type: 'text', label: 'Verbalizzante' },
	{ name: 'direttore', type: 'text', label: 'Direttore' }
] as const;

export function VerbaleForm({ createVerbale, isLoading, setIsDialogOpen }: VerbaleFormProps) {
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

	const onSubmit = async (data: VerbaleFormData) => {
		try {
			const result = await createVerbale(data);
			console.log(result.id);
			setIsDialogOpen(false);
			form.reset();
			router.push(`/editor/${result.id}`);
		} catch (error) {
			console.error("Error creating verbale:", error);
		}
	};

	return (
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
	)
}