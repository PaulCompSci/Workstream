"use client"
import React from 'react'


type BlacklistedPhone = {
  id: number;
  phoneNumber: string;
};

const blacklistedPhones: BlacklistedPhone[] = [
  { id: 1, phoneNumber: "+1234567890" },
  { id: 2, phoneNumber: "+0987654321" },
];

const DisplayTable = () => {
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
  )
}

export default DisplayTable