"use client";
import { useState, useEffect } from "react";
import inventoryData from "../../../Asset_Inventory.json";
import Link from "next/link";

export default function DisposeAssets() {
  const [brokenItems, setBrokenItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDispose, setItemToDispose] = useState(null);
  const [disposalReason, setDisposalReason] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  // Extract all broken items from the inventory
  useEffect(() => {
    const extractBrokenItems = () => {
      const broken = [];
      
      inventoryData.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.items.forEach((item) => {
            if (item.non_working > 0) {
              broken.push({
                ...item,
                category: category.category_name,
                subcategory: subcategory.subcategory_name,
                id: `${category.category_name}-${subcategory.subcategory_name}-${item.item_name}`.replace(/\s+/g, '-')
              });
            }
          });
        });
      });
      
      setBrokenItems(broken);
      setFilteredItems(broken);
    };

    extractBrokenItems();
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let filtered = brokenItems;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, brokenItems]);

  // Get unique categories
  const categories = [...new Set(brokenItems.map(item => item.category))];

  // Handle item selection
  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  // Handle dispose action
  const handleDispose = (item) => {
    setItemToDispose(item);
    setShowConfirmModal(true);
    setDisposalReason("");
    setVerificationCode("");
  };

  // Confirm disposal
  const confirmDisposal = () => {
    if (!disposalReason.trim()) {
      alert("Please provide a reason for disposal");
      return;
    }

    if (verificationCode !== "DISPOSE") {
      alert("Please enter the correct verification code: DISPOSE");
      return;
    }

    // Here you would typically update the database/JSON file
    console.log("Disposing item:", itemToDispose);
    console.log("Reason:", disposalReason);
    
    // Remove from current list
    setBrokenItems(prev => prev.filter(item => item.id !== itemToDispose.id));
    setSelectedItems(prev => prev.filter(id => id !== itemToDispose.id));
    
    alert(`Successfully disposed: ${itemToDispose.item_name}`);
    setShowConfirmModal(false);
    setItemToDispose(null);
  };

  // Bulk dispose
  const handleBulkDispose = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to dispose");
      return;
    }

    if (!confirm(`Are you sure you want to dispose ${selectedItems.length} item(s)?`)) {
      return;
    }

    const reason = prompt("Enter reason for bulk disposal:");
    if (!reason) return;

    const code = prompt("Enter verification code (DISPOSE):");
    if (code !== "DISPOSE") {
      alert("Incorrect verification code");
      return;
    }

    // Remove selected items
    setBrokenItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    
    alert(`Successfully disposed ${selectedItems.length} item(s)`);
  };

  return (
    <div className="container-fluid px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-2 fw-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash3 me-2 text-danger" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
            Dispose Broken Assets
          </h1>
          <p className="text-muted">
            Total Broken Items: <span className="fw-bold text-danger">{brokenItems.length}</span>
            {selectedItems.length > 0 && (
              <span className="ms-3">
                Selected: <span className="fw-bold">{selectedItems.length}</span>
              </span>
            )}
          </p>
        </div>
        <Link href="/" className="btn btn-outline-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by item name, category, or subcategory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Filter by Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              {selectedItems.length > 0 && (
                <button
                  className="btn btn-danger w-100"
                  onClick={handleBulkDispose}
                >
                  Dispose Selected ({selectedItems.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th className="text-center">Working</th>
                  <th className="text-center">Non-Working</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-inbox mb-3 d-block mx-auto" viewBox="0 0 16 16">
                        <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"/>
                      </svg>
                      <h5>No broken items found</h5>
                      <p>All items matching your criteria are in working condition.</p>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </td>
                      <td className="fw-semibold">{item.item_name}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.category}
                        </span>
                      </td>
                      <td className="text-muted">{item.subcategory}</td>
                      <td className="text-center">
                        <span className="badge bg-success">{item.working}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-danger">{item.non_working}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary">{item.total}</span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDispose(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash me-1" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                          Dispose
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && itemToDispose && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle me-2" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                  </svg>
                  Confirm Disposal
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning">
                  <strong>Warning:</strong> This action cannot be undone. Please verify all details before proceeding.
                </div>
                
                <div className="mb-3">
                  <h6 className="fw-bold">Item Details:</h6>
                  <ul className="list-unstyled ps-3">
                    <li><strong>Name:</strong> {itemToDispose.item_name}</li>
                    <li><strong>Category:</strong> {itemToDispose.category}</li>
                    <li><strong>Subcategory:</strong> {itemToDispose.subcategory}</li>
                    <li><strong>Non-Working Units:</strong> <span className="badge bg-danger">{itemToDispose.non_working}</span></li>
                  </ul>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason for Disposal <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter detailed reason for disposal (e.g., beyond repair, obsolete, damaged, etc.)"
                    value={disposalReason}
                    onChange={(e) => setDisposalReason(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Verification Code <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type DISPOSE to confirm"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <small className="text-muted">Type <code>DISPOSE</code> in capital letters to confirm</small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDisposal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle me-2" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                  </svg>
                  Confirm Disposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {brokenItems.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h3 className="text-danger fw-bold">{brokenItems.reduce((sum, item) => sum + item.non_working, 0)}</h3>
                <p className="text-muted mb-0">Total Broken Units</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h3 className="text-primary fw-bold">{categories.length}</h3>
                <p className="text-muted mb-0">Affected Categories</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h3 className="text-warning fw-bold">{brokenItems.length}</h3>
                <p className="text-muted mb-0">Unique Items</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
