import * as React from 'react';
import { Link } from 'react-router-dom';

export const Table = () => {
  return (
    <div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="border-double border border-color hover:border-collapse divide-x-4 table-fixed">
                    <tbody className="divide-y divide-white-200">
                                <tr>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        Landscapers
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        Brookfield
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        HLI
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        ASSINIBOINE
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        STONE HENGE
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        PETER HUGHES LANDSCAPING
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        Builders:
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        housebrand
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        Homes by AVI
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        LUCIDA
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        CIDEX Signature Homes
                                    </td>
                                    <td className="px-6 py-4 text-sm border border-color divide-x-4 ">
                                        CALBRIDGE
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
        </div>           
   );
};
