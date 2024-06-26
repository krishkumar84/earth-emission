import csvtojson from "csvtojson";
import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(request: NextRequest) {


  const data = await request.formData();
  const file:File | null = data.get('file') as unknown as File
  if (!file) {
    return {
      status: 400,
      body: { error: 'No files uploaded' }
    };
  }

  const fileBuffer = await file.arrayBuffer();
  const fileContent = Buffer.from(fileBuffer).toString("utf-8");

  let jsonArrays;

  jsonArrays = await csvtojson({
    noheader: false,
    trim: true,
    output: "json",
  }).fromString(fileContent);

  const headers = Object.keys(jsonArrays[0]);

    const requiredColumns = [
      "order_id",
      "email",
      "location",
      "orders",
      "lastOrder",
      "spent",
      "refunds",
    ];

    const columnIndices = requiredColumns.map((column) =>
      headers.indexOf(column)
    );
    const newData = jsonArrays.map((record) => {
      columnIndices.forEach((index, i) => {
        const value = record[headers[index]];
        record[requiredColumns[i]] =
          value !== undefined && value !== null ? value : "";
      });
      return record;
    });

    console.log(newData)
  // Save data to MySQL using Prisma
  try {
    await prisma.order.createMany({
      data: newData,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to save data to database' }, { status: 500 });
  }

  return NextResponse.json({ message: 'File uploaded and data saved to database' });
}