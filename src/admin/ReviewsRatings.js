import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2 } from "lucide-react";

const initialReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Excellent franchise support and customer service.",
    date: "2025-07-28",
    status: "Pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Great opportunities, but could improve training materials.",
    date: "2025-08-02",
    status: "Approved",
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 3,
    comment: "Decent overall, but customer support was slow sometimes.",
    date: "2025-07-30",
    status: "Rejected",
  },
  // Add more dummy reviews here if needed
];

const PAGE_SIZE = 5;

const ReviewsAndRatings = () => {
  const [filterRating, setFilterRating] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [reviews, setReviews] = useState(initialReviews);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter by rating & status
  const filteredReviews = reviews.filter((r) => {
    const ratingMatch =
      filterRating === "All" || r.rating === Number(filterRating);
    const statusMatch = filterStatus === "All" || r.status === filterStatus;
    return ratingMatch && statusMatch;
  });

  // Pagination
  const pageCount = Math.ceil(filteredReviews.length / PAGE_SIZE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changePage = (page) => {
    if (page >= 1 && page <= pageCount) setCurrentPage(page);
  };

  // Moderation actions
  const updateStatus = (id, status) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 text-[#8b2f2f]">
        <Star size={36} />
        <h1 className="text-2xl font-bold">Reviews & Ratings - Admin</h1>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#8b2f2f]">Filter by Rating:</span>
          {["All", "5", "4", "3", "2", "1"].map((rating) => (
            <button
              key={rating}
              onClick={() => {
                setFilterRating(rating);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full border transition ${
                filterRating === rating
                  ? "bg-[#8b2f2f] text-white border-[#8b2f2f]"
                  : "bg-white text-[#8b2f2f] border-[#8b2f2f] hover:bg-[#8b2f2f] hover:text-white"
              }`}
            >
              {rating === "All"
                ? "All Ratings"
                : `${rating} Star${rating > 1 ? "s" : ""}`}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#8b2f2f]">Filter by Status:</span>
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full border transition ${
                filterStatus === status
                  ? "bg-[#8b2f2f] text-white border-[#8b2f2f]"
                  : "bg-white text-[#8b2f2f] border-[#8b2f2f] hover:bg-[#8b2f2f] hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {paginatedReviews.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews found.</p>
      ) : (
        paginatedReviews.map(({ id, user, rating, comment, date, status }) => (
          <div
            key={id}
            className="border rounded-lg p-4 mb-4 shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-[#8b2f2f]">{user}</h3>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i <= rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{comment}</p>
            <p className="text-sm text-gray-500 mb-2">
              Reviewed on {new Date(date).toLocaleDateString()}
            </p>
            <p className="mb-3">
              <strong>Status: </strong>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status}
              </span>
            </p>

            {/* Moderation buttons */}
            <div className="flex gap-4">
              {status !== "Approved" && (
                <button
                  onClick={() => updateStatus(id, "Approved")}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  title="Approve Review"
                >
                  <CheckCircle size={18} /> Approve
                </button>
              )}
              {status !== "Rejected" && (
                <button
                  onClick={() => updateStatus(id, "Rejected")}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  title="Reject Review"
                >
                  <XCircle size={18} /> Reject
                </button>
              )}
              <button
                onClick={() => deleteReview(id)}
                className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                title="Delete Review"
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1 rounded border transition ${
                currentPage === i + 1
                  ? "bg-[#8b2f2f] text-white border-[#8b2f2f]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsAndRatings;
