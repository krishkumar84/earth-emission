'use client'

import { SelectedItemsProvider } from '@/app/selected-items-context'
import DeleteButton from '@/components/delete-button'
import DateSelect from '@/components/date-select'
import FilterButton from '@/components/dropdown-filter'
import CustomersTable from './customers-table'
import PaginationClassic from '@/components/pagination-classic'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Toast02 from '../../../../components/toast-02';

function CustomersContent() {
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/fetch');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data)
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, [trigger]);

  console.log(customers)

  const [files, setFiles] = useState<File| null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        setError('Please upload a CSV file.');
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

      const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
      });

      setLoading(true);
      if (!res.ok) {
          throw new Error(`Network response was not ok`);
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
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Customers ✨
          </h1>
        </div>
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

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Delete button */}
          <DeleteButton />

          {/* Dropdown */}
          <DateSelect />

          {/* Filter button */}
          <FilterButton align="right" />

          {/* Add customer button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
              >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add Customer</span>
          </button>
        </div>

      </div>
        <Toast02 type="error" open={toastOpen} setOpen={setToastOpen}> {error} </Toast02>
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
        <CustomersTable customers={customers} />
      )}

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic />
      </div>
    </div>
  );
}

export default function Customers() {
  return (
    <SelectedItemsProvider>
      <CustomersContent />
    </SelectedItemsProvider>
  )
}