// @ts-ignore
import csvtojson from "csvtojson";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";


const prisma = new PrismaClient();

const requiredHeaders: { [key: string]: string[] } = {
  cloud_cpu: [
    "name", "sector", "category", "cloud_provider", "year", "cpu_load", 
    "region", "duration", "duration_unit", "cpu_count"
  ],
  // Add more sheet names and required headers here as needed
};

interface JsonRecord {
  [key: string]: string;
}

async function sendDataToAPI(data: JsonRecord, metric: string, provider: string) {
   const response = await fetch(`http://localhost:3000/api/compute/${provider}/${metric}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //  console.log("hello",JSON.stringify(data))
    console.log("response",response);
}

async function parseCSV(fileContent: string): Promise<JsonRecord[]> {
  return csvtojson({
    noheader: false,
    trim: true,
    output: "json",
  }).fromString(fileContent);
}

async function parseXLSX(fileBuffer: ArrayBuffer): Promise<{ [key: string]: JsonRecord[] }> {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const data: { [key: string]: JsonRecord[] } = {};

  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    // console.log(sheet)
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as Array<any[]>;
    const headers = json[0] as string[];
    const rows = json.slice(1);
    data[sheetName] = rows.map(row => {
      const record: JsonRecord = {};
      headers.forEach((header, index) => {
        record[header] = row[index] !== undefined && row[index] !== null ? row[index].toString() : "";
      });
       console.log(record)
      return record;
    });
  });
   //console.log(data)
  return data;
}

function validateHeaders(headers: string[], sheetName: string): boolean {
  const required = requiredHeaders[sheetName];
  if (!required) return false;
  return required.every(header => headers.includes(header));
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileType = file.name.split('.').pop();

  let parsedData: { [key: string]: JsonRecord[] } | JsonRecord[];

  try {
    if (fileType === 'csv') {
      const fileContent = Buffer.from(fileBuffer).toString("utf-8");
      parsedData = await parseCSV(fileContent);
    } else if (fileType === 'xlsx') {
      parsedData = await parseXLSX(fileBuffer);
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    return NextResponse.json({ error: 'Failed to parse file' }, { status: 500 });
  }

  try {
    if (fileType === 'csv') {
      const headers = Object.keys((parsedData as JsonRecord[])[0]);
      if (!validateHeaders(headers, 'default')) {
        return NextResponse.json({ error: 'Invalid CSV headers' }, { status: 400 });
      }
    //   await prisma.order.createMany({ data: parsedData });
    } else if (fileType === 'xlsx') {
      for (const [sheetName, records] of Object.entries(parsedData)) {
        const headers = Object.keys(records[0]);
        if (!validateHeaders(headers, sheetName)) {
          return NextResponse.json({ error: `Invalid headers in sheet: ${sheetName}` }, { status: 400 });
        }
        await sendDataToAPI(records, 'cpu', 'azure');
        // await prisma[sheetName].createMany({ data: records });
      }
    }
  } catch (error) {
    console.error('Error saving data to database:', error);
    return NextResponse.json({ error: 'Failed to save data to database' }, { status: 500 });
  }

  return NextResponse.json({ message: 'File uploaded and data saved to database' });
}
