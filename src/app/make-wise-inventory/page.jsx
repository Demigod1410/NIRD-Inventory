'use client';
import { useState, useEffect } from 'react';
import inventoryData from '../../../Asset_Inventory.json';
import InventoryTable from '../../components/InventoryTable';
import Link from 'next/link';

const MakeWiseInventory = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    const allItems = inventoryData.categories.flatMap(category =>
      category.subcategories.flatMap(subcategory => subcategory.items)
    );
    const uniqueManufacturers = [...new Set(allItems.map(item => item.make).filter(Boolean))];
    setManufacturers(uniqueManufacturers.sort());
  }, []);

  useEffect(() => {
    if (selectedManufacturer) {
      const allItems = inventoryData.categories.flatMap(category =>
        category.subcategories.flatMap(subcategory =>
          subcategory.items.map(item => ({
            ...item,
            category: category.category_name,
            subcategory: subcategory.subcategory_name,
          }))
        )
      );
      const filtered = allItems.filter(item => item.make === selectedManufacturer);
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory([]);
    }
  }, [selectedManufacturer]);

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="row justify-content-center">
        <div className="col-12 col-xl-12">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">Make-wise Inventory</h2>
            </div>

            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="manufacturerFilter" className="form-label fw-bold">
                      Filter by Manufacturer
                    </label>
                    <select
                      id="manufacturerFilter"
                      value={selectedManufacturer}
                      onChange={e => setSelectedManufacturer(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select a Manufacturer</option>
                      {manufacturers.map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}>
                          {manufacturer}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedManufacturer && (
            <div className="card shadow">
              <div className="card-header bg-info text-white py-3">
                <h3 className="mb-0">{selectedManufacturer} ({filteredInventory.length} items)</h3>
              </div>
              <div className="card-body p-0">
                {filteredInventory.length > 0 ? (
                  <div className="table-responsive">
                    <InventoryTable inventory={filteredInventory} />
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <h5 className="text-muted">No inventory found for this manufacturer.</h5>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-3">
            <Link href="/" className="btn btn-outline-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeWiseInventory;
