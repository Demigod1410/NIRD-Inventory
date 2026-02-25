"use client";
import React, { useState } from "react";

export default function DetailedInventoryTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Flatten the hierarchical data
  const flattenData = () => {
    const flattened = [];
    data.categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.items.forEach((item) => {
          flattened.push({
            category: category.category_name,
            subcategory: subcategory.subcategory_name,
            item_name: item.item_name,
            working: item.working,
            non_working: item.non_working,
          });
        });
      });
    });
    return flattened;
  };

  const allData = flattenData();

  // Filter data based on search term
  const filteredData = allData.filter(
    (item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
      <div className="card-header bg-white border-0 py-4" style={{ borderRadius: "12px 12px 0 0" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h5 className="mb-1 fw-bold">Detailed Asset Inventory</h5>
            <p className="mb-0 text-muted small">
              Complete list of all items ({filteredData.length} items)
            </p>
          </div>
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <span className="input-group-text bg-white border-end-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search text-muted"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th className="fw-semibold text-muted text-uppercase" style={{ fontSize: "0.75rem", padding: "1rem" }}>
                  Category
                </th>
                <th className="fw-semibold text-muted text-uppercase" style={{ fontSize: "0.75rem", padding: "1rem" }}>
                  Sub Category
                </th>
                <th className="fw-semibold text-muted text-uppercase" style={{ fontSize: "0.75rem", padding: "1rem" }}>
                  Item Name
                </th>
                <th className="fw-semibold text-muted text-uppercase text-center" style={{ fontSize: "0.75rem", padding: "1rem", width: "120px" }}>
                  Working
                </th>
                <th className="fw-semibold text-muted text-uppercase text-center" style={{ fontSize: "0.75rem", padding: "1rem", width: "120px" }}>
                  Not Working
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={index} className="align-middle">
                    <td className="px-4 py-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary fw-normal px-3 py-2">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{item.subcategory}</td>
                    <td className="px-4 py-3 fw-medium">{item.item_name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2">
                        {item.working}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`badge ${item.non_working > 0 ? 'bg-danger' : 'bg-secondary'} bg-opacity-10 ${item.non_working > 0 ? 'text-danger' : 'text-secondary'} fw-semibold px-3 py-2`}>
                        {item.non_working}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      className="bi bi-inbox mb-3 opacity-50"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
                    </svg>
                    <p className="mb-0">No items found matching your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="card-footer bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} items
            </small>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {getPageNumbers().map((pageNum, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
                  >
                    {pageNum === '...' ? (
                      <span className="page-link">...</span>
                    ) : (
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )}
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
