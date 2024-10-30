"use client";
import React, { useEffect, useState } from "react";

type BlacklistedPhone = {
  id: number;
  phoneNumber: string;
};

const BlacklistedPhoneTable: React.FC = () => {
  const [blacklistedPhones, setBlacklistedPhones] = useState<BlacklistedPhone[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Define the API URL directly in the component
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

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Blacklisted Phone Numbers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left font-medium text-gray-700">
                ID
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left font-medium text-gray-700">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody>
            {blacklistedPhones.map((phone) => (
              <tr key={phone.id} className="border-b last:border-none">
                <td className="py-2 px-4">{phone.id}</td>
                <td className="py-2 px-4">{phone.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlacklistedPhoneTable;
