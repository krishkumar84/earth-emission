"use client"
import { SelectedItemsProvider } from '@/app/selected-items-context'
// import DeleteButtonLogEmission from '@/components/delete-button-private-factor'
// import FilterButton from '@/components/dropdown-filter'
import Co2EmissionsTable from './log-emissions-table'
import PaginationClassic from '@/components/pagination-classic'
import { Co2eEmissions } from "@/app/lib/data";
import Addemissions from './add/logemissions-root'; 
// import Search from '@/components/search'
import { useEffect,useState} from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Toast02 from '../../../components/toast-02';

function Co2EmissionsContent({ searchParams }: any) {
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [Logs, setLogs] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [co2e_emissions, setCo2eEmissions] = useState([]);
  const [count, setCount] = useState(0);

  const [files, setFiles] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/fetchlog');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data)
        const mappedData = data.map((item:any) => ({
          id: item.id,
          Name: item.name,
          sector: item.sector,
          category: item.category,
          region: item.region,
          co2e_unit: item.co2e_unit,
          year: parseInt(item.year),
          co2e: item.co2e,
        }));
        setLogs(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchLogs();
  }, [trigger]);

  useEffect(() => {
    const fetchData = async () => {
      const { count, co2e_emissions } = await Co2eEmissions(q, page);
      setCo2eEmissions(co2e_emissions);
      setCount(count);
    };
    fetchData();
  }, [q, page, trigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setError('Please upload a CSV or XLSX file.');
        setFiles(null);
        setToastOpen(true);
      } else {
        setError(null);
        setFiles(file);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) {
      return;
    }

    setUploading(true);
    setTrigger(!trigger);

    try {
      const formData = new FormData();
      console.log(formData)
      formData.set('file', files);

      const res = await fetch('/api/computeapi', {
        method: 'POST',
        body: formData
      });

      setLoading(true);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

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
          <form onSubmit={handleUpload} className="flex items-center space-x-2">
            <div className="flex items-center bg-indigo-500  rounded-md">
              <label
                htmlFor="file-upload"
                className="btn bg-gray-500 hover:bg-indigo-600 text-white cursor-pointer"
              >
                <span>{uploading ? "Uploading..." : "Select File"}</span>
                <input
                  id="file-upload"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {files && <span className="ml-2 text-white">{files.name}</span>}
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {uploading ? "Uploading..." : "Bulk Import"}
            </button>
            <a
              href="/random_data.csv"
              download
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md ml-2"
            >
              Download Template
            </a>
          </form>

          {/* Delete button */}
          {/* <DeleteButtonLogEmission /> */}

          {/* Search Option */}
          {/* <Search placeholder="Filter by name" /> */}

          {/* Add New API Keys button */}
          <Addemissions />

        </div>

      </div>

      <Toast02 type="error" open={toastOpen} setOpen={setToastOpen}>{error}</Toast02>
      {loading ? (
        <SkeletonTheme baseColor="#2d3748" highlightColor="#4a5568">
          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow"
              >
                <Skeleton width={50} height={20} />
                <Skeleton width={100} height={20} />
                <Skeleton width={200} height={20} />
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          </div>
        </SkeletonTheme>
      ) : (
        <Co2EmissionsTable co2emissions={Logs} count={count} />
      )}

      {/* Table */}

      {/* Pagination */}
      {/* <div className="mt-8">
        <PaginationClassic count={count} />
      </div> */}
    </div>
  )
}

export default function Apikeys({ searchParams }: any) {
  return (
    <SelectedItemsProvider>
      <Co2EmissionsContent searchParams={searchParams} />
    </SelectedItemsProvider>
  )
}
