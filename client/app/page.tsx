import React, { useState } from 'react';
import { FileUpload } from "@/components/dropbox/file-upload"
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

        {/* Upload Section */}
        {/* <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700">Upload CSV File</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <label className="block w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-white">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 text-slate-600">
                    <Upload size={20} />
                    <span>{file ? file.name : 'Choose a CSV file to upload'}</span>
                  </div>
                </label>
              </div>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Upload
              </button>
            </div>
          </CardContent>
        </Card> */}
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload  />
    </div>

        {/* Phone Numbers List Section */}
        {/* <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700">Phone Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-200">
              {phoneNumbers.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {entry.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{entry.name}</p>
                      <p className="text-slate-600">{entry.number}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
};

export default Home;