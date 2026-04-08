'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MakeWiseInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data.');
        }

        const payload = await response.json();
        const items = payload?.items ?? [];

        setInventory(items);

        const uniqueManufacturers = [
          ...new Set(items.map(item => item.product_manufacture).filter(Boolean)),
        ];
        setManufacturers(uniqueManufacturers.sort());
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load inventory.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    if (selectedManufacturer) {
      const filtered = inventory.filter(
        item => item.product_manufacture === selectedManufacturer
      );
      setFilteredInventory(filtered);
    } else {
      setFilteredInventory([]);
    }
  }, [selectedManufacturer, inventory]);

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
              {error ? (
                <div className="alert alert-danger mb-0" role="alert">
                  {error}
                </div>
              ) : isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
                  <p className="mt-3 mb-0 text-muted">Loading inventory from backend...</p>
                </div>
              ) : (
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
              )}
            </div>
          </div>

          {!isLoading && !error && selectedManufacturer && (
            <div className="card shadow">
              <div className="card-header bg-info text-white py-3">
                <h3 className="mb-0">{selectedManufacturer} ({filteredInventory.length} items)</h3>
              </div>
              <div className="card-body p-0">
                {filteredInventory.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">Product ID</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Manufacturer</th>
                          <th scope="col">Product Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInventory.map(item => (
                          <tr key={item.product_ID}>
                            <td>{item.product_ID}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_manufacture}</td>
                            <td>{item.product_type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
