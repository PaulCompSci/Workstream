import React, { useState } from 'react';
import { FileUpload } from "@/components/dropbox/file-upload"
import SubmitButton from '@/components/dropbox/button';
// import { Upload } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {


  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile && selectedFile.type === 'text/csv') {
  //     setFile(selectedFile);
  //   }
  // };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Take Home Assignment</h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-blue-500 rounded"></div>
          </div>
        </div>

     
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload  />
     
    </div>
   

       {/*Phone number list section */}
      </div>
    </main>
  );
};

export default Home;