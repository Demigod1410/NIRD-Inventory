'use client';

import { useState, useEffect } from 'react';
import inventoryData from '../../../Asset_Inventory.json';

export default function ItemTypePage() {
  const [itemTypes, setItemTypes] = useState([]);
  const [newItemType, setNewItemType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Flatten the data to get items with their types
    const flattened = [];
    inventoryData.categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.items.forEach(item => {
          flattened.push({
            itemType: subcategory.subcategory_name,
            itemName: item.item_name,
            working: item.working,
            nonWorking: item.non_working,
            total: item.total
          });
        });
      });
    });
    // Sort by item type
    flattened.sort((a, b) => a.itemType.localeCompare(b.itemType));
    setItemTypes(flattened);
  }, []);

  const handleAddItemType = () => {
    if (newItemType.trim()) {
      // For demo, add a dummy item under the new type
      const newItem = {
        itemType: newItemType.trim(),
        itemName: 'New Item',
        working: 0,
        nonWorking: 0,
        total: 0
      };
      setItemTypes(prev => {
        const updated = [...prev, newItem].sort((a, b) => a.itemType.localeCompare(b.itemType));
        setCurrentPage(1); // Reset to first page when adding
        return updated;
      });
      setNewItemType('');
    }
  };

  const totalPages = Math.ceil(itemTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = itemTypes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Item Types Management</h1>

          {/* Add Item Type Section */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Add New Item Type</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="itemTypeTextarea" className="form-label">Item Type Name</label>
                <textarea
                  className="form-control"
                  id="itemTypeTextarea"
                  rows="3"
                  value={newItemType}
                  onChange={(e) => setNewItemType(e.target.value)}
                  placeholder="Enter the name of the new item type..."
                ></textarea>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddItemType}
                disabled={!newItemType.trim()}
              >
                Add Item Type
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Items Ordered by Item Type</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: '0.875rem' }}>Item Type</th>
                      <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: '0.875rem' }}>Item Name</th>
                      <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Working</th>
                      <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Non-Working</th>
                      <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index} style={{ transition: 'background-color 0.2s' }}>
                        <td className="px-4 py-3 fw-semibold">{item.itemType}</td>
                        <td className="px-4 py-3">{item.itemName}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2">
                            {item.working}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="badge bg-danger bg-opacity-10 text-danger fw-semibold px-3 py-2">
                            {item.nonWorking}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="badge bg-secondary bg-opacity-10 text-dark fw-semibold px-3 py-2">
                            {item.total}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3 mb-3">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
