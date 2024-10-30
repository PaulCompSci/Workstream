"use client"
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";



export const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: { "text/csv": [".csv"] },
    onDrop: handleFileChange,
    onDropRejected: () => {
      alert("Only .csv files are allowed.");
    },
  });

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload a file before submitting.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", files[0]);
  
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_UPLOAD_URL || "http://localhost:2899/black-listed-phnumber/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        alert("File uploaded successfully!");
        window.location.reload();
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg"> 
      <div className="p-6">
        <div {...getRootProps()}>
          <motion.div
            onClick={handleClick}
            whileHover="animate"
            className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 transition-colors duration-200"
          >
            <input
              ref={fileInputRef}
              id="file-upload-handle"
              type="file"
              accept=".csv"
              onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="mb-4 rounded-full bg-blue-50 p-3">
                <IconUpload className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Upload CSV File
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop your .csv file here or click to browse
              </p>
            </div>

            <div className="relative w-full mt-4 max-w-xl mx-auto">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <motion.div
                    key={"file" + idx}
                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                    className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded">
                          <IconUpload className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                        Ready to upload
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={files.length === 0}
            className={cn(
              "px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200",
              files.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow"
            )}
          >
            {files.length === 0 ? "Upload File to Continue" : "Upload and Process"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;