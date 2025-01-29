"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { Loader2 } from "lucide-react";
import type {
	ToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useAtom } from "jotai";
import { verbaleAtom } from "@/atoms/verbale";
import { Skeleton } from "../ui/skeleton";

export function PdfViewer() {
	const [verbale] = useAtom(verbaleAtom);

	const toolbarPluginInstance = toolbarPlugin();
	const { Toolbar } = toolbarPluginInstance;

	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
			<div
				className="rpv-core__viewer flex flex-col h-screen overflow-hidden"
				style={{
					border: "1px solid rgba(0, 0, 0, 0.3)",
				}}
			>
				<div
					className="items-center bg-gray-200 flex p-1"
					style={{
						borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
					}}
				>
					<Toolbar>
						{(props: ToolbarSlot) => {
							const {
								CurrentPageInput,
								Download,
								EnterFullScreen,
								GoToNextPage,
								GoToPreviousPage,
								NumberOfPages,
								Print,
								ShowSearchPopover,
								Zoom,
								ZoomIn,
								ZoomOut,
							} = props;
							return (
								<>
									<div style={{ padding: "0px 2px" }}>
										<ShowSearchPopover />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<ZoomOut />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<Zoom />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<ZoomIn />
									</div>
									<div style={{ padding: "0px 2px", marginLeft: "auto" }}>
										<GoToPreviousPage />
									</div>
									<div style={{ padding: "0px 2px", width: "4rem" }}>
										<CurrentPageInput />
									</div>
									<div style={{ padding: "0px 2px" }}>
										/ <NumberOfPages />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<GoToNextPage />
									</div>
									<div style={{ padding: "0px 2px", marginLeft: "auto" }}>
										<EnterFullScreen />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<Download />
									</div>
									<div style={{ padding: "0px 2px" }}>
										<Print />
									</div>
								</>
							);
						}}
					</Toolbar>
				</div>
				<div className="h-screen overflow-hidden">
					{verbale.url ? (
						<Viewer fileUrl={verbale.url} plugins={[toolbarPluginInstance]} />
					) : (
						<Skeleton className="h-full w-full relative">
							<div className="absolute inset-0 flex items-center justify-center">
								<Loader2 className="animate-spin text-gray-500 w-8 h-8" />
							</div>
						</Skeleton>
					)}
				</div>
			</div>
		</Worker>
	);
}
