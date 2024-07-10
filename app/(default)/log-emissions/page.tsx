import { SelectedItemsProvider } from '@/app/selected-items-context'
// import DeleteButtonLogEmission from '@/components/delete-button-private-factor'
// import FilterButton from '@/components/dropdown-filter'
import Co2EmissionsTable from './log-emissions-table'
import PaginationClassic from '@/components/pagination-classic'
import { Co2eEmissions } from "@/app/lib/data";
import Addemissions from './add/logemissions-root'; 
// import Search from '@/components/search'

async function Co2EmissionsContent(searchParams:any) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const {count, co2e_emissions} = await Co2eEmissions(q, page)


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Log Emissions ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

          {/* Delete button */}
          {/* <DeleteButtonLogEmission /> */}

           {/* Search Option */}
          {/* <Search placeholder="Filter by name" /> */}

          {/* Add New API Keys button */}
          <Addemissions />

        </div>

      </div>

      {/* Table */}
      <Co2EmissionsTable co2emissions={co2e_emissions} count={count} />

      {/* Pagination */}
      {/* <div className="mt-8">
        <PaginationClassic count={count}/>
      </div>     */}
    </div>
  )
}

export default function Apikeys(searchParams:any) {
  return (
    <SelectedItemsProvider>
      <Co2EmissionsContent searchParams={searchParams}/>
    </SelectedItemsProvider>
  )
}