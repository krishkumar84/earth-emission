import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req:NextApiRequest,res:NextApiResponse){
  try{
    const LogEmissions = await prisma.emissionData.findMany();
    return NextResponse.json(LogEmissions);      
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching log data' }, { status: 500 })
    }
}