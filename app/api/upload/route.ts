import { writeFile,mkdir } from "fs/promises";
import { join } from "path";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file:File | null = data.get('file') as unknown as File
  if (!file) {
    return {
      status: 400,
      body: { error: 'No files uploaded' }
    };
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dir = join(process.cwd(), 'tmp');
  await mkdir(dir, { recursive: true });

  const path = join(dir, file.name);
  console.log(`object written to ${path}`)
  return NextResponse.json('File uploaded');  
}