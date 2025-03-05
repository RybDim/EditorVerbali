import { SectionSelector } from './section_selector';

interface VerbaleHeaderProps {
	numero: string;
	sezioni: string[];
	setSezioni: React.Dispatch<React.SetStateAction<string[]>>;
}

export function VerbaleHeader({ numero, sezioni, setSezioni }: VerbaleHeaderProps) {
	return (
		<div className="sticky top-0 z-50 bg-slate-50 flex items-center justify-between w-full p-2 border-b border-border shadow-md">
			<SectionSelector sezioni={sezioni} setSezioni={setSezioni} />
			<div className="text-center w-full">
				Verbale n. {numero}
			</div>
		</div>
	);
}