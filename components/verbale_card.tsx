import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Trash, Eye, FileText } from "lucide-react";
import { PdfViewer } from './pdf-viewer/pdfViewer';

interface VerbaleCardProps {
	verbale: {
		id: string;
		data: {
			numero: string;
			data: string;
			verbalizzante: string;
			direttore: string;
		};
		base64?: string; // base64 string
		createdAt: string;
	};
	onDelete?: (id: string) => void;
}

export function VerbaleCard({ verbale, onDelete }: VerbaleCardProps) {
	const router = useRouter();
	const { id, data, base64 } = verbale;
	const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

	const handleEdit = useCallback(() => {
		router.push(`/editor/${id}`);
	}, [router, id]);

	const handleDelete = useCallback(() => {
		onDelete?.(id);
	}, [onDelete, id]);

	const openPdfPreview = () => {
		setIsPdfModalOpen(true);
	};

	const closePdfPreview = () => {
		setIsPdfModalOpen(false);
	};

	return (
		<>
			<Card className="w-72 flex flex-col shadow-md hover:shadow-lg duration-300 border-gray-200 transition-all hover:scale-105">
				<CardHeader className="flex-row items-center justify-between border-b border-gray-100 pb-3">
					<div className="flex items-center space-x-3">
						<FileText className="w-6 h-6 text-blue-500" />
						<CardTitle className="text-lg font-semibold text-gray-800">
							Verbale n. {data.numero}
						</CardTitle>
					</div>
					<div className="flex items-center space-x-2">
						{base64 && (
							<Eye
								className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
								aria-label="Preview PDF"
								onClick={openPdfPreview}
							/>
						)}
						<Trash
							className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700 transition-colors"
							aria-label="Delete verbale"
							onClick={handleDelete}
						/>
					</div>
				</CardHeader>
				<CardContent className="flex-grow pt-4 pb-2 space-y-2 text-sm text-gray-600">
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-500">Data:</span>
						<span>{formatDate(data.data)}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-500">Verbalizzante:</span>
						<span className="text-right">{data.verbalizzante}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-medium text-gray-500">Direttore:</span>
						<span className="text-right">{data.direttore}</span>
					</div>
				</CardContent>
				<CardFooter className="border-t border-gray-100 pt-3 pb-3">
					<Button
						variant="outline"
						onClick={handleEdit}
						className="w-full hover:bg-gray-50 transition-colors"
					>
						Modifica
					</Button>
				</CardFooter>
			</Card>

			{base64 && (
				<Dialog open={isPdfModalOpen} onOpenChange={closePdfPreview}>
					<DialogContent className="max-w-4xl">
						<DialogHeader>
							<DialogTitle className="flex items-center space-x-2">
								<FileText className="w-6 h-6 text-blue-500" />
								<span>Anteprima Verbale n. {data.numero}</span>
							</DialogTitle>
						</DialogHeader>
						<div className="max-w-full h-[70vh] overflow-hidden">
							<PdfViewer base64={verbale.base64 as string} />
						</div>

					</DialogContent>
				</Dialog>
			)}
		</>
	);
}