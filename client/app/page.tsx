import React from 'react';
import { FileUpload } from "@/components/dropbox/file-upload";
import DisplayTable from '@/components/table/displayTable';
import Image from 'next/image';

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="https://www.workstream.us/hubfs/default.svg" 
              alt="Logo"
              width={100} 
              height={100}
              className="h-20 mb-4 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-800">Take Home Assignment</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-blue-500 rounded"></div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="w-full max-w-4xl mx-auto min-h-96 bg-white dark:bg-slate-50 rounded-lg">
          <FileUpload />
        </div>

        {/* Phone Number List Section */}
        <DisplayTable />
      </div>
    </main>
  );
};

export default Home;
