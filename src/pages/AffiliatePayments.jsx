import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { FaDownload } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';
import { PiPlusBold } from 'react-icons/pi';

export const pendingPaymentRequests = [
    {
        id: 1,
        doctorName: "Isabel Wiza",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "4,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar.jpg",
    },
    {
        id: 2,
        doctorName: "Soumya Maheswari",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "5,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar2.png",
    },
    {
        id: 3,
        doctorName: "Margie O’Reilley",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "4,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar3.png",
    },
    {
        id: 4,
        doctorName: "Lucas Legros",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "4,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar.jpg",
    },
    {
        id: 5,
        doctorName: "Shanelle Ziermann",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "5,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar2.png",
    },
    {
        id: 6,
        doctorName: "William Stephan",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "5,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar3.png",
    },
    {
        id: 7,
        doctorName: "Smith Birkin",
        email: "alinamath@gmail.com",
        mobile: "+91 8805322849",
        amountWithdrawal: "5,290",
        requestedDate: "1 Feb 2024",
        walletAmount: "30,000",
        avatar: "/avatar.jpg",
    },
];

const AffiliatePayments = () => {
    return (
        <div className="px-7 py-0 space-y-6 w-full min-h-full">
            {/* Breadcrumbs */}
            <BreadCrumb
                items={[
                    { label: "Affiliate", path: "/affiliate/dashboard" },
                    { label: "Payments" },
                ]}
            />

            <div className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-4">
                {/* Header row with search + actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <h2 className="text-lg font-semibold text-zinc-800">
                            Special Commission
                        </h2>
                        {/* Search */}
                        <div className="flex-1 md:w-72 relative">
                            <div className='search-input ml-3 bg-zinc-100 mx-4 rounded-lg px-3 flex gap-2 py-2'>
                                <img src="/search-icon.png" alt="" />
                                <input type="text" placeholder='Search here' className='border-none outline-none text-sm text-[#3A643B]' />
                            </div>
                        </div>

                        {/* Add (dummy) */}
                        <button className="h-8 w-8 rounded-lg font-bold bg-zinc-100 text-[#28643B] text-xl flex items-center justify-center shadow-sm">
                            <PiPlusBold />
                        </button>

                        {/* Refresh (just clears search) */}
                        <button
                            onClick={() => setSearch("")}
                            className="h-8 w-8 rounded-lg ml-3 shadow-sm font-bold border-zinc-300 bg-zinc-100 text-[#28643B] text-base flex items-center justify-center"
                            title="Reset"
                        >
                            <IoReload />
                        </button>

                    </div>
                    {/* Export */}
                    <button
                        // onClick={handleExport}
                        className="h-8 w-8 rounded-lg text-[#28643B] bg-zinc-100 text-xs flex items-center justify-center"
                        title="Export CSV"
                    >
                        <FaDownload />
                    </button>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-xl border border-zinc-100 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                    <table className="min-w-[850px] w-full whitespace-nowrap text-sm">

                        <thead className="bg-zinc-50 text-xs text-zinc-500">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Doctor Name
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    email-Id
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Mobile
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Amount Withdrawal
                                </th>
                                <th className="px-4 py-3 text-left font-medium">Requested Date</th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Wallet Amount
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Approval
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Approval
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {pendingPaymentRequests.map((row) => (
                                <tr key={row.id} className="hover:bg-zinc-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={row.avatar}
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-zinc-800">{row.doctorName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.email}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.mobile}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.amountWithdrawal}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.requestedDate}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.walletAmount}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        <button className="text-xs text-emerald-600 hover:underline">
                                            View All
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        <button className="text-xs text-emerald-600 hover:underline">
                                            Accept
                                        </button>
                                        <button className="text-xs text-emerald-600 hover:underline">
                                            Decline
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {pendingPaymentRequests.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-xs text-zinc-400"
                                    >
                                        No data found for this search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer (rows per page / pagination dummy) */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-3">
                    <span>Rows per page: 5</span>
                    <div className="flex items-center gap-2">
                        <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                            {"<"}
                        </button>
                        <span>1</span>
                        <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AffiliatePayments