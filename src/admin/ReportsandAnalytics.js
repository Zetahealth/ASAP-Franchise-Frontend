import React, { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { Calendar, Download, FileText, BarChart3, DollarSign, Store, Users, MessageSquare } from "lucide-react";

const BRAND_COLOR = "#8b2f2f";

const formatDate = (date) => date.toISOString().slice(0, 10);

// Inline dummy data generator for 6 months
const generateDummyData = () => {
  const today = new Date();
  const data = {
    sales: [],
    franchisePerformance: [],
    userGrowth: [],
  };

  for (let i = 180; i >= 0; i -= 7) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const label = date.toISOString().slice(0, 10);

    data.sales.push({
      date: label,
      revenue: Math.floor(5000 + Math.random() * 8000),
      orders: Math.floor(50 + Math.random() * 100),
    });

    data.franchisePerformance.push({
      date: label,
      score: Math.floor(60 + Math.random() * 40),
      locations: Math.floor(5 + Math.random() * 10),
    });

    data.userGrowth.push({
      date: label,
      newUsers: Math.floor(20 + Math.random() * 50),
      activeUsers: Math.floor(100 + Math.random() * 200),
    });
  }

  return data;
};

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    from: formatDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)), // 90 days ago
    to: formatDate(new Date()),
  });
  const [data, setData] = useState(generateDummyData());
  const [filteredData, setFilteredData] = useState(data);

  // Refs to capture charts for PDF export
  const salesChartRef = useRef(null);
  const franchiseChartRef = useRef(null);
  const userGrowthChartRef = useRef(null);

  // Filter data by date range
  useEffect(() => {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const filterByRange = (arr) =>
      arr.filter(({ date }) => {
        const d = new Date(date);
        return d >= fromDate && d <= toDate;
      });

    setFilteredData({
      sales: filterByRange(data.sales),
      franchisePerformance: filterByRange(data.franchisePerformance),
      userGrowth: filterByRange(data.userGrowth),
    });
  }, [dateRange, data]);

  // Excel Export
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Summary sheet
    const totalRevenue = filteredData.sales.reduce((a, c) => a + c.revenue, 0);
    const totalOrders = filteredData.sales.reduce((a, c) => a + c.orders, 0);
    const avgFranchiseScore =
      filteredData.franchisePerformance.reduce((a, c) => a + c.score, 0) /
      filteredData.franchisePerformance.length || 0;
    const totalNewUsers = filteredData.userGrowth.reduce(
      (a, c) => a + c.newUsers,
      0
    );

    const summaryData = [
      ["Metric", "Value"],
      ["Total Revenue", totalRevenue],
      ["Total Orders", totalOrders],
      ["Average Franchise Score", avgFranchiseScore.toFixed(2)],
      ["Total New Users", totalNewUsers],
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    // Sales sheet
    const salesSheetData = [
      ["Date", "Revenue", "Orders"],
      ...filteredData.sales.map((d) => [d.date, d.revenue, d.orders]),
    ];
    const wsSales = XLSX.utils.aoa_to_sheet(salesSheetData);
    XLSX.utils.book_append_sheet(wb, wsSales, "Sales");

    // Franchise Performance sheet
    const franchiseSheetData = [
      ["Date", "Score", "Locations"],
      ...filteredData.franchisePerformance.map((d) => [d.date, d.score, d.locations]),
    ];
    const wsFranchise = XLSX.utils.aoa_to_sheet(franchiseSheetData);
    XLSX.utils.book_append_sheet(wb, wsFranchise, "Franchise Performance");

    // User Growth sheet
    const userGrowthSheetData = [
      ["Date", "New Users", "Active Users"],
      ...filteredData.userGrowth.map((d) => [d.date, d.newUsers, d.activeUsers]),
    ];
    const wsUserGrowth = XLSX.utils.aoa_to_sheet(userGrowthSheetData);
    XLSX.utils.book_append_sheet(wb, wsUserGrowth, "User Growth");

    XLSX.writeFile(wb, `ASAP_Reports_${dateRange.from}_to_${dateRange.to}.xlsx`);
  };

  // PDF Export
  const exportToPDF = async () => {
    const doc = new jsPDF("landscape", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add header
    doc.setFontSize(18);
    doc.setTextColor(BRAND_COLOR);
    doc.text("ASAP FRANCHISE", 40, 40);
    doc.setFontSize(12);
    doc.setTextColor("#333");
    doc.text(
      `Reports & Analytics: ${dateRange.from} to ${dateRange.to}`,
      40,
      60
    );
    doc.setDrawColor(BRAND_COLOR);
    doc.setLineWidth(1);
    doc.line(40, 70, pageWidth - 40, 70);

    // Add watermark (light & semi-transparent)
    doc.setTextColor("rgba(139,47,47,0.1)");
    doc.setFontSize(72);
    doc.text("ASAP FRANCHISE", pageWidth / 4, pageHeight / 2, { angle: 45, align: "center" });
    doc.setTextColor("#000");

    // Helper to add chart image
    const addChartImage = async (ref, x, y, width, height) => {
      if (!ref.current) return;
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", x, y, width, height);
    };

    // Chart image sizes (fit 3 charts side-by-side)
    const chartWidth = (pageWidth - 120) / 3;
    const chartHeight = chartWidth * 0.75;

    // Add charts
    await addChartImage(salesChartRef, 40, 90, chartWidth, chartHeight);
    await addChartImage(franchiseChartRef, 60 + chartWidth, 90, chartWidth, chartHeight);
    await addChartImage(userGrowthChartRef, 80 + chartWidth * 2, 90, chartWidth, chartHeight);

    // Save PDF
    doc.save(`ASAP_Reports_${dateRange.from}_to_${dateRange.to}.pdf`);
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-[#8b2f2f]">
          <BarChart3 size={36} />
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
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
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition"
          >
            <FileText size={18} />
            PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#8b2f2f] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <DollarSign size={32} />
            <span className="text-lg">Total Sales</span>
          </div>
          <p className="text-right text-2xl font-bold mt-2">$45,000</p>
        </div>
        <div className="bg-[#8b2f2f] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <Store size={32} />
            <span className="text-lg">Franchises</span>
          </div>
          <p className="text-right text-2xl font-bold mt-2">15</p>
        </div>
        <div className="bg-[#8b2f2f] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <Users size={32} />
            <span className="text-lg">Customers</span>
          </div>
          <p className="text-right text-2xl font-bold mt-2">1,200</p>
        </div>
        <div className="bg-[#8b2f2f] text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <MessageSquare size={32} />
            <span className="text-lg">Inquiries</span>
          </div>
          <p className="text-right text-2xl font-bold mt-2">320</p>
        </div>
      </div>
      {/* Date Range Filter */}
      <div className="flex items-center gap-4 mb-8">
        <Calendar size={18} className="text-gray-600" />
        <label className="flex items-center gap-2">
          <span>From:</span>
          <input
            type="date"
            value={dateRange.from}
            max={dateRange.to}
            onChange={(e) =>
              setDateRange((d) => ({ ...d, from: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          />
        </label>
        <label className="flex items-center gap-2">
          <span>To:</span>
          <input
            type="date"
            value={dateRange.to}
            min={dateRange.from}
            max={formatDate(new Date())}
            onChange={(e) =>
              setDateRange((d) => ({ ...d, to: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#8b2f2f]"
          />
        </label>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div
          ref={salesChartRef}
          className="bg-white rounded-lg shadow p-4"
          style={{ minHeight: 320 }}
        >
          <h2 className="text-lg font-semibold mb-2 text-[#8b2f2f]">
            Sales Over Time
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={filteredData.sales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={BRAND_COLOR}
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#555"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Franchise Performance Chart */}
        <div
          ref={franchiseChartRef}
          className="bg-white rounded-lg shadow p-4"
          style={{ minHeight: 320 }}
        >
          <h2 className="text-lg font-semibold mb-2 text-[#8b2f2f]">
            Franchise Performance
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={filteredData.franchisePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill={BRAND_COLOR} name="Score" />
              <Bar dataKey="locations" fill="#555" name="Locations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div
          ref={userGrowthChartRef}
          className="bg-white rounded-lg shadow p-4"
          style={{ minHeight: 320 }}
        >
          <h2 className="text-lg font-semibold mb-2 text-[#8b2f2f]">
            User Growth
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={filteredData.userGrowth}>
              <defs>
                <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorActiveUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#555" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#555" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="newUsers"
                stroke={BRAND_COLOR}
                fillOpacity={1}
                fill="url(#colorNewUsers)"
                name="New Users"
              />
              <Area
                type="monotone"
                dataKey="activeUsers"
                stroke="#555"
                fillOpacity={1}
                fill="url(#colorActiveUsers)"
                name="Active Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
