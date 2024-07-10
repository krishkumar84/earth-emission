// import { auth } from '@clerk/nextjs/server';
import prisma from '../utils/prismaClient'

export const Co2eEmissions = async (q, page) => {
    const regex = new RegExp(q, 'i');
    // const {userId} = auth()
    const ITEM_PER_PAGE = 10
      try {
      const count = await prisma.co2e_emissions.count({
        where: {
          AND: [
            // {
            //   userId: userId // Add condition to fetch only api_keys belonging to a specific userId
            // },
            {
              Name: {
                contains: q, // for case-insensitive search
              }
            }
          ]
        }
    });
      const co2e_emissions = await prisma.co2e_emissions.findMany({
      skip: (ITEM_PER_PAGE * (page - 1)),
      take: (ITEM_PER_PAGE),
        where: {
          AND: [
            // {
            //   userId: userId // Add condition to fetch only api_keys belonging to a specific userId
            // },
            {
              Name: {
                contains: q, // for case-insensitive search
              }
            }
          ]
        },
      });
      return {count, co2e_emissions};
    }
    catch (err) {
      console.log(err);
      // Return a default value when an error occurs
      return { count: 0, co2e_emissions: [] };
    }
  };