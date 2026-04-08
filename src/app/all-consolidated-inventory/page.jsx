"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import assetInventory from "../../../Asset_Inventory.json";

export default function AllConsolidatedInventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Flatten the inventory data
    const flattenedData = [];
    assetInventory.categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.items.forEach(item => {
          flattenedData.push({
            category: category.category_name,
            subcategory: subcategory.subcategory_name,
            itemName: item.item_name,
            working: item.working,
            nonWorking: item.non_working,
            total: item.total
          });
        });
      });
    });
    setInventoryData(flattenedData);
    setFilteredData(flattenedData);
  }, []);

  useEffect(() => {
    let filtered = inventoryData;

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [inventoryData, selectedCategory, searchTerm]);

  const categories = [...new Set(inventoryData.map(item => item.category))];

  const totalWorking = filteredData.reduce((sum, item) => sum + item.working, 0);
  const totalNonWorking = filteredData.reduce((sum, item) => sum + item.nonWorking, 0);
  const totalItems = filteredData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="row justify-content-center">
        <div className="col-12 col-xl-12">
          {/* Header */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">ALL CONSOLIDATED INVENTORY REPORT</h2>
              <p className="mb-0 text-center small">{assetInventory.metadata.title}</p>
              <p className="mb-0 text-center small">{assetInventory.metadata.location}</p>
            </div>

            {/* Filters */}
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="categoryFilter" className="form-label fw-bold">
                      Filter by Category
                    </label>
                    <select
                      className="form-select"
                      id="categoryFilter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="searchFilter" className="form-label fw-bold">
                      Search Items
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchFilter"
                      placeholder="Search by item name, category, or subcategory..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h5 className="card-title">Working Items</h5>
                      <h3>{totalWorking}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-danger text-white">
                    <div className="card-body">
                      <h5 className="card-title">Non-Working Items</h5>
                      <h3>{totalNonWorking}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-info text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Items</h5>
                      <h3>{totalItems}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="card shadow">
            <div className="card-header bg-info text-white py-3">
              <h3 className="mb-0">Inventory Details ({filteredData.length} items)</h3>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Category</th>
                      <th scope="col">Subcategory</th>
                      <th scope="col">Item Name</th>
                      <th scope="col" className="text-center">Working</th>
                      <th scope="col" className="text-center">Non-Working</th>
                      <th scope="col" className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <span className="badge bg-primary">{item.category}</span>
                        </td>
                        <td>
                          <small className="text-muted">{item.subcategory}</small>
                        </td>
                        <td className="fw-bold">{item.itemName}</td>
                        <td className="text-center">
                          <span className="badge bg-success">{item.working}</span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-danger">{item.nonWorking}</span>
                        </td>
                        <td className="text-center">
                          <span className="badge bg-info">{item.total}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-5">
                  <h5 className="text-muted">No items found matching your criteria</h5>
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-3">
            <Link href="/" className="btn btn-outline-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}