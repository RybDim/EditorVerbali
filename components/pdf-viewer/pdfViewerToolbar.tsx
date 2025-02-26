import { PlusIcon, MinusIcon, ArrowUp, ArrowDown, DownloadIcon } from "lucide-react";

interface PdfViewerToolbarProps {
	currentPage: number;
	numPages: number;
	scale: number;
	loading: boolean;
	nextPage: () => void;
	prevPage: () => void;
	zoomIn: () => void;
	zoomOut: () => void;
	setCurrentPage: (page: number) => void;
	downloadPdf: () => void;
}

export function PdfViewerToolbar({
	currentPage,
	numPages,
	scale,
	loading,
	nextPage,
	prevPage,
	zoomIn,
	zoomOut,
	setCurrentPage,
	downloadPdf,
}: PdfViewerToolbarProps) {
	return (
		// <div className="flex items-center bg-gray-200 p-2 border-b border-gray-300 shadow-sm">
		<div className="flex items-center bg-accent p-2 border-b border-gray-300 shadow-sm">

			<button
				onClick={zoomOut}
				className="px-3 py-2 mx-1 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-50"
				disabled={loading}
			>
				<MinusIcon className="h-4 w-4" />
			</button>
			<span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
			<button
				onClick={zoomIn}
				className="px-3 py-2 mx-1 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-50"
				disabled={loading}
			>
				<PlusIcon className="h-4 w-4" />
			</button>

			<button
				onClick={prevPage}
				className="px-3 py-2 mx-1 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-50 ml-auto"
				disabled={loading || currentPage <= 1}
			>
				<ArrowUp className="h-4 w-4" />
			</button>
			<input
				type="number"
				value={currentPage}
				onChange={(e) => {
					const value = parseInt(e.target.value);
					if (value >= 1 && value <= numPages) {
						setCurrentPage(value);
					}
				}}
				className="w-14 text-center text-sm font-medium border rounded-lg px-1 py-1"
				disabled={loading}
			/>
			<span className="text-sm font-medium"> / {numPages}</span>
			<button
				onClick={nextPage}
				className="px-3 py-2 mx-1 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-50"
				disabled={loading || currentPage >= numPages}
			>
				<ArrowDown className="h-4 w-4" />
			</button>

			<button
				onClick={downloadPdf}
				className="px-3 py-2 mx-1 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition disabled:opacity-50 ml-auto"
				disabled={loading}
				title="Download PDF"
			>
				<DownloadIcon className="h-4 w-4" />
			</button>
		</div>
	);
}