import React from 'react';
import { Link } from 'react-router-dom';

//Adbul

export const Reservation = () => {
  return (
    <>
    <h1>Reservation</h1>
    <Link to='form'><button>+ New</button></Link>
    <h2>History</h2>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
            <tr>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                =====================
                </th>
                <td className="px-6 py-4">
                =====================
                </td>
                <td className="px-6 py-4">
                =====================
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </>
  );
};