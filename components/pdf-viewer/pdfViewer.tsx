"use client";
import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { PdfViewerToolbar } from "./pdfViewerToolbar";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

interface PdfViewerProps {
	base64: string;
}

export function PdfViewer({ base64 }: PdfViewerProps) {
	const [numPages, setNumPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [scale, setScale] = useState<number>(1.0);
	const [loading, setLoading] = useState<boolean>(true);
	const [pdfData, setPdfData] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const pagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {

		if (!base64) {
			console.log("NO PDF DATA PROVIDED");
			// setError("No PDF data provided");
			setLoading(false);
			return;
		}

		try {
			const dataPrefix = base64.startsWith('data:') ? '' : 'data:application/pdf;base64,';
			setPdfData(`${dataPrefix}${base64}`);
		} catch (error) {
			console.error("Error processing base64 data:", error);
			setLoading(false);
		}
	}, [base64]);

	useEffect(() => {
		const handleScroll = () => {
			if (!pagesContainerRef.current || numPages === 0) return;
			
			const container = pagesContainerRef.current;
			const pageElements = container.querySelectorAll('.react-pdf__Page');
			if (!pageElements.length) return;
			
			const containerRect = container.getBoundingClientRect();
			const containerMiddle = containerRect.top + containerRect.height / 3;
			
			let visiblePage = 1;
			for (let i = 0; i < pageElements.length; i++) {
				const pageRect = pageElements[i].getBoundingClientRect();
				if (pageRect.top <= containerMiddle && pageRect.bottom >= containerMiddle) {
					visiblePage = i + 1;
					break;
				}
			}
			
			if (visiblePage !== currentPage) {
				setCurrentPage(visiblePage);
			}
		};
		
		const container = pagesContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => container.removeEventListener('scroll', handleScroll);
		}
	}, [numPages, currentPage]);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
		setLoading(false);
	};

	const onDocumentLoadError = (error: Error) => {
		console.error("Error loading PDF:", error);
		setLoading(false);
	};

	const nextPage = () => {
		if (currentPage < numPages) {
			setCurrentPage(currentPage + 1);
			scrollToPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			scrollToPage(currentPage - 1);
		}
	};

	const scrollToPage = (pageNumber: number) => {
		if (!pagesContainerRef.current) return;
		
		const pageElement = pagesContainerRef.current.querySelector(
			`.page_${pageNumber}`
		);
		
		if (pageElement) {
			pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const handlePageChange = (page: number) => {
		const targetPage = Math.max(1, Math.min(page, numPages));
		setCurrentPage(targetPage);
		scrollToPage(targetPage);
	};

	const zoomIn = () => {
		setScale(prevScale => Math.min(prevScale + 0.1, 3.0));
	};

	const zoomOut = () => {
		setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
	};

	const downloadPdf = () => {
		if (!base64) return;

		try {	
			const dataUrl = base64.startsWith('data:')
				? base64
				: `data:application/pdf;base64,${base64}`;

			const a = document.createElement('a');
			a.href = dataUrl;
			a.download = `verbale.pdf`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error downloading PDF:", error);
		}
	};

	return (
		<div
			className="flex flex-col h-full overflow-hiddens"
			style={{
				border: "1px solid rgba(0, 0, 0, 0.3)",
			}}
			ref={containerRef}
		>
			<PdfViewerToolbar 
				currentPage={currentPage}
				numPages={numPages}
				scale={scale}
				loading={loading}
				nextPage={nextPage}
				prevPage={prevPage}
				zoomIn={zoomIn}
				zoomOut={zoomOut}
				setCurrentPage={handlePageChange}
				downloadPdf={downloadPdf}
			/>
			<div 
				className="flex-1 overflow-auto flex justify-center" 
				ref={pagesContainerRef}
			>
				{!pdfData ? (
					<div className="h-full w-full flex items-center justify-center">
						<p className="text-gray-500">No PDF document available</p>
					</div>
				) : (
					<div className="flex flex-col items-center my-2 mx-auto">
						<Document
							file={pdfData}
							onLoadSuccess={onDocumentLoadSuccess}
							onLoadError={onDocumentLoadError}
							loading={
								<Skeleton className="h-full w-full relative">
									<div className="absolute inset-0 flex items-center justify-center">
										<Loader2 className="animate-spin text-gray-500 w-8 h-8" />
									</div>
								</Skeleton>
							}
							error={
								<div className="text-red-500 p-4">
									Failed to load PDF document.
								</div>
							}
						>
							{Array.from(
								new Array(numPages),
								(_, index) => (
									<div key={`page_${index + 1}`} className={cn("mb-4", `page_${index+1}`)}>
										<Page
											pageNumber={index + 1}
											scale={scale}
											className="shadow-lg"
											renderTextLayer={true}
											renderAnnotationLayer={true}
											loading={
												<Skeleton className="h-64 w-48 relative">
													<div className="absolute inset-0 flex items-center justify-center">
														<Loader2 className="animate-spin text-gray-500 w-8 h-8" />
													</div>
												</Skeleton>
											}
										/>
									</div>
								)
							)}
						</Document>
					</div>
				)}
			</div>
		</div>
	);
}