"use server";
import { revalidatePath } from "next/cache";
import { auth } from '@clerk/nextjs/server';
import prisma from '../utils/prismaClient'

export const addCo2eEmissions = async (formData) => {
  const { Name, sector, category, methodology, year, region, co2e_unit, co2e} =
  Object.fromEntries(Object.entries(formData));
    // const activity_id = `${name}_${sector}_${category}`.replace(/ /g, '_');
    const {userId} = auth()
    // console.log(activity_id)
    console.log(Name)
    console.log(co2e_unit)
    console.log(co2e)
    console.log(category)
    console.log(sector)
  try {
    await prisma.co2e_emissions.create({
        data:{
          Name,
          sector,
          category,
          methodology,
          year:parseInt(year),
          region,
          co2e_unit,
          co2e:parseFloat(co2e),
          userId:userId
        }
    });
  } catch (err) {
    console.log(err);
  }
  revalidatePath('/log-emissions?');
  // redirect('http://localhost:3000/');
};