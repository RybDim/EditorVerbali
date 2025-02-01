import { AssegniDiRicerca, FormValues, RinunciaBorsaDiRicerca } from "@/types/types";
import { source, stripIndent } from "common-tags";
import { rinunciaBorsaTemplate } from "./templates/rinunciaBorsaTemplate";
import { getDefaultStore } from "jotai";
import { activeSectionsVerbaleAtom } from "@/atoms/verbale";

const generator = {
	assegniDiRicercaSection(subsecitons: AssegniDiRicerca) {
		return this.rinunciaBorsaSubsection(subsecitons.rinunce);
	},

	rinunciaBorsaSubsection(rinunciaBorsa: Array<RinunciaBorsaDiRicerca>) {
		return source`
			${rinunciaBorsa.map((rinuncia) => {
				return stripIndent(rinunciaBorsaTemplate(rinuncia));
			})}
		`;
	},
};

export function template(values: FormValues) {
	const normalizzaData = (data: string) => {
		const [anno, mese, giorno] = data.split("-");
		return `${giorno}/${mese}/${anno}`;
	};

    const store = getDefaultStore();
    const currentSections = store.get(activeSectionsVerbaleAtom);

	return stripIndent`
		\\documentclass[a4paper]{article}

		\\usepackage[utf8]{inputenc}
		\\usepackage{graphicx}
		\\usepackage{fancyhdr}
		\\usepackage{geometry}
		\\usepackage{lipsum}

		\\geometry{top=2cm, bottom=5cm, left=2.5cm, right=2.5cm}
		\\setlength{\\headheight}{80pt}
		\\setlength{\\headsep}{0.5cm}
		\\setlength{\\footskip}{0.5cm}   

		\\pagestyle{fancy}
		\\renewcommand{\\headrulewidth}{0pt}
		\\fancyhf{}

		\\fancyhead[CO]{
			\\includegraphics[scale=0.2]{logo_dmi.png}\\\\[0.5em] 
			\\textbf{Verbale n. ${values.numero} — ${normalizzaData(values.data)}}
		}

		\\fancyfoot[C]{
			\\hrule
			\\vspace{0.5em}
			\\begin{tabular}{p{0.5\\textwidth}c p{0.4\\textwidth}}
			La segretaria verbalizzante & & Il Direttore \\\\
			Prof./Prof.ssa ${values.verbalizzante} & & Prof./Prof.ssa ${values.direttore}
			\\end{tabular}
			\\\\ \\vspace{1em}
			Pag. \\thepage
		}



        \\begin{document}

		Verbale dell'adunanza del Consiglio di Dipartimento di Matematica e Informatica, convocata per
		il giorno ${normalizzaData(
			values.data
		)} alle ore 08:00 in prima convocazione e per il giorno 25.09.2024 alle ore 11:00
		in seconda convocazione, presso l'aula Magna del DMI in viale A. Doria 6, per discutere il
		seguente ordine del giorno:
        ${currentSections
					.map((section) => {
						switch (section) {
							case "Assegni di ricerca":
								return (
									"\\section{Assegni di ricerca}" +
									generator.assegniDiRicercaSection(
										values.assegniDiRicerca as AssegniDiRicerca
									)
								);
						}
					})
					.join("\n\n")}
        \\end{document}
		`;
}