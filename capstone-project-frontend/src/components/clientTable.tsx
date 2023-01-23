import * as React from 'react';
import { Link } from 'react-router-dom';

export const Table = () => {
  return (
    <div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-white-200">
                    <tbody className="divide-y divide-white-200">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-white-400/100 #27272a">
                                        Landscapers
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        Brookfield
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        HLI
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-white-400/100 #27272a">
                                        ASSINIBOINE
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        STONE HENGE
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        PETER HUGHES LANDSCAPING
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-white-400/100 #27272a">
                                        Builders:
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        housebrand
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        Homes by AVI
                                        </td>
                                    </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-white-400/100 #27272a">
                                        LUCIDA
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
                                        CIDEX Signature Homes
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white-400/100 #27272a">
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
