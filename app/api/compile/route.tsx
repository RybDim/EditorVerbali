import { NextRequest, NextResponse } from "next/server";
import latex from "node-latex";
import { Readable } from "stream";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export async function POST(req: NextRequest){
    try{
        const { tex_string } = await req.json();
    
        if(!tex_string){
            return NextResponse.json({ error: "No latex string provided!"}, { status: 400});
        }
    
        const tempDir = path.join(process.cwd(), "tmp", uuidv4());
        await fs.mkdir(tempDir, { recursive: true });

        const logoPath = path.join(process.cwd(), "public", "logo_dmi.png");
        const tempLogoPath = path.join(tempDir, "logo_dmi.png");
        await fs.copyFile(logoPath, tempLogoPath);
    
        try { 
            const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
                const inputStram = Readable.from(tex_string);
    
                const options = {
                    inputs: tempDir,
                    cmd: "pdflatex"
                }
    
                const pdf = latex(inputStram, options);
    
                const chunks: Buffer[] = [];
                pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
                pdf.on("end", () => resolve(Buffer.concat(chunks)));
                pdf.on("error", reject);
            });
    
            const base64Pdf = pdfBuffer.toString("base64");
    
    
            await cleanup(tempDir);
    
            return NextResponse.json({
                pdf: base64Pdf,
            });
        }catch(error: unknown){
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            await cleanup(tempDir);
            return NextResponse.json(
                { error: "Latex compilation failed", details: errorMessage },
                { status: 500 }
            )
        }
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: "Internal server error", details: errorMessage },
            { status: 500 }
        )
    }
}

async function cleanup(dir: string){
    try {
        await fs.rm(dir, { recursive: true, force: true });
    } catch (error) {
        console.error('Cleanup failed:', error);
    }
}