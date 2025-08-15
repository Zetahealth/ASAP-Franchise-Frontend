import React, { useState } from "react";
import {
    CreditCard,
    Search,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    FileText,
    Eye
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaymentsTransactions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const transactions = [
        {
            id: "TXN001",
            date: "2025-08-01",
            customer: "John Doe",
            franchiseName: "ASAP Pizza",
            franchiseDetail: "Main Branch, New York",
            amount: 250.0,
            status: "Completed",
            method: "Credit Card"
        },
        {
            id: "TXN002",
            date: "2025-08-03",
            customer: "Jane Smith",
            franchiseName: "ASAP Coffee",
            franchiseDetail: "Downtown Branch, Chicago",
            amount: 500.0,
            status: "Pending",
            method: "Bank Transfer"
        },
        {
            id: "TXN003",
            date: "2025-08-05",
            customer: "Mike Johnson",
            franchiseName: "ASAP Burgers",
            franchiseDetail: "West End, Los Angeles",
            amount: 120.0,
            status: "Refunded",
            method: "PayPal"
        }
    ];

    const filteredTransactions = transactions.filter((txn) => {
        const matchesSearch =
            txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ? true : txn.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Export to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredTransactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Payments");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `payments_report_${new Date().toISOString().split("T")[0]}.xlsx`);
    };

    // Export to PDF with watermark & branding
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Payments & Transactions Report", 14, 20);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        // Watermark
        doc.setFontSize(60);
        doc.setTextColor(200, 200, 200);
        doc.text("ASAP FRANCHISE", 35, 150, { angle: 45, opacity: 0.2 });

        const tableData = filteredTransactions.map((txn) => [
            txn.id,
            txn.date,
            txn.customer,
            txn.franchiseName,
            `$${txn.amount.toFixed(2)}`,
            txn.method,
            txn.status
        ]);

        doc.autoTable({
            head: [["Transaction ID", "Date", "Customer", "Franchise", "Amount", "Method", "Status"]],
            body: tableData,
            startY: 35,
            theme: "striped",
            headStyles: { fillColor: [139, 47, 47] },
        });

        doc.save(`payments_report_${new Date().toISOString().split("T")[0]}.pdf`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <CreditCard size={36} className="text-[#8b2f2f]" />
                    <h1 className="text-2xl font-bold text-[#8b2f2f]">
                        Payments & Transactions
                    </h1>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 bg-[#8b2f2f] text-white px-4 py-2 rounded-lg hover:bg-[#732525] transition"
                    >
                        <Download size={18} />
                        Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        <FileText size={18} />
                        PDF
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={28} />
                    <div>
                        <p className="text-sm text-gray-600">Total Completed</p>
                        <p className="text-lg font-semibold">$250.00</p>
                    </div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg flex items-center gap-3">
                    <Clock className="text-yellow-600" size={28} />
                    <div>
                        <p className="text-sm text-gray-600">Pending Payments</p>
                        <p className="text-lg font-semibold">$500.00</p>
                    </div>
                </div>
                <div className="bg-red-100 p-4 rounded-lg flex items-center gap-3">
                    <XCircle className="text-red-600" size={28} />
                    <div>
                        <p className="text-sm text-gray-600">Refunds</p>
                        <p className="text-lg font-semibold">$120.00</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full md:w-1/3">
                    <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by customer or transaction ID"
                        className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-[#8b2f2f]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:border-[#8b2f2f]"
                >
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                </select>

                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                    <Calendar size={18} className="text-gray-500" />
                    <input type="date" className="focus:outline-none" />
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#8b2f2f] text-white text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Transaction ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Franchise</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((txn) => (
                                <tr
                                    key={txn.id}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4">{txn.id}</td>
                                    <td className="px-6 py-4">{txn.date}</td>
                                    <td className="px-6 py-4">{txn.customer}</td>
                                    <td className="px-6 py-4">{txn.franchiseName}</td>
                                    <td className="px-6 py-4">${txn.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${txn.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : txn.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => setSelectedTransaction(txn)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            {selectedTransaction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold text-[#8b2f2f] mb-4">
                            Transaction Details
                        </h2>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Transaction ID:</strong> {selectedTransaction.id}</p>
                            <p><strong>Date:</strong> {selectedTransaction.date}</p>
                            <p><strong>Customer:</strong> {selectedTransaction.customer}</p>
                            <p><strong>Franchise Name:</strong> {selectedTransaction.franchiseName}</p>
                            <p><strong>Franchise Details:</strong> {selectedTransaction.franchiseDetail}</p>
                            <p><strong>Amount:</strong> ${selectedTransaction.amount.toFixed(2)}</p>
                            <p><strong>Payment Method:</strong> {selectedTransaction.method}</p>
                            <p><strong>Status:</strong> {selectedTransaction.status}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedTransaction(null)}
                                className="bg-[#8b2f2f] hover:bg-[#732525] text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentsTransactions;
