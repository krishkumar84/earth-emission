import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export  async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
      const customers = await prisma.order.findMany();
       return NextResponse.json(customers);      
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching customer data' }, { status: 500 })
    }
}
