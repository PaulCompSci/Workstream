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
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this phone number?")) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete phone number');
      }

      // Remove the deleted item from the state
      setBlacklistedPhones(prev => prev.filter(phone => phone.id !== id));
    } catch (error) {
      alert('Error deleting phone number');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(null);
    }
  };

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Blacklisted phone numbers database
          </h2>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-700 font-medium">
              Total Numbers: {blacklistedPhones.length.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Current page info */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {startIndex + 1} to {Math.min(endIndex, blacklistedPhones.length)} of {blacklistedPhones.length} numbers
        </div>
       
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
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                    Actions
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
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-right">
                      <button
                        onClick={() => handleDelete(phone.id)}
                        disabled={isDeleting === phone.id}
                        className={`
                          px-3 py-1 rounded
                          ${isDeleting === phone.id 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'}
                          transition-colors duration-200 text-sm font-medium
                        `}
                        title="Delete phone number"
                      >
                        {isDeleting === phone.id ? "..." : "Delete"}
                      </button>
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