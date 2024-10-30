"use client"
import React, { useEffect, useState } from "react";

type BlacklistedPhone = {
  id: number;
  phoneNumber: string;
};

const BlacklistedPhoneTable: React.FC = () => {
  const [blacklistedPhones, setBlacklistedPhones] = useState<BlacklistedPhone[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const apiUrl = process.env.NODE_ENV === "production"
    ? "https://production-url.com/black-listed-phnumber"
    : "http://localhost:2899/black-listed-phnumber";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setBlacklistedPhones(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchData();
  }, [apiUrl]);

  // Calculate pagination
  const totalPages = Math.ceil(blacklistedPhones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = blacklistedPhones.slice(startIndex, endIndex);

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Blacklisted phone numbers database
        </h2>
       
        {/* Table Container with fixed height and scroll */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="overflow-y-auto max-h-[600px]">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone Number (formatted in E.164)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((phone) => (
                  <tr
                    key={phone.id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                      {phone.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-800">
                      {phone.phoneNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlacklistedPhoneTable;