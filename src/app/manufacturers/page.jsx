"use client";
import { useState } from "react";
import Link from "next/link";

export default function Manufacturers() {
  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: "Dell", country: "USA", contact: "support@dell.com" },
    { id: 2, name: "HP", country: "USA", contact: "support@hp.com" },
    { id: 3, name: "Lenovo", country: "China", contact: "support@lenovo.com" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contact: "",
    address: "",
    website: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new manufacturer object
    const newManufacturer = {
      id: manufacturers.length + 1,
      ...formData,
    };
    
    // Add to manufacturers list
    setManufacturers((prev) => [...prev, newManufacturer]);
    
    // Show success message
    alert("Manufacturer added successfully!");
    
    // Reset form
    setFormData({
      name: "",
      country: "",
      contact: "",
      address: "",
      website: "",
      notes: "",
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this manufacturer?")) {
      setManufacturers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Add Manufacturer Form */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">ADD MANUFACTURER</h2>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Column 1 */}
                  <div className="col-md-6">
                    {/* Manufacturer Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-bold">
                        Manufacturer Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter manufacturer name"
                        required
                      />
                    </div>

                    {/* Country */}
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label fw-bold">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                      />
                    </div>

                    {/* Contact */}
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label fw-bold">
                        Contact (Email/Phone)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter email or phone"
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="col-md-6">
                    {/* Website */}
                    <div className="mb-3">
                      <label htmlFor="website" className="form-label fw-bold">
                        Website
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://www.example.com"
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label fw-bold">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        rows="2"
                      />
                    </div>

                    {/* Notes */}
                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label fw-bold">
                        Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Additional notes or information"
                        rows="2"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary flex-grow-1">
                        Add Manufacturer
                      </button>
                      <Link href="/" className="btn btn-outline-secondary">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Manufacturers List Table */}
          <div className="card shadow">
            <div className="card-header bg-success text-white py-3">
              <h2 className="mb-0 text-center">MANUFACTURERS LIST</h2>
            </div>
            
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Country</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Website</th>
                      <th scope="col">Address</th>
                      <th scope="col">Notes</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manufacturers.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No manufacturers found. Add one above to get started.
                        </td>
                      </tr>
                    ) : (
                      manufacturers.map((manufacturer, index) => (
                        <tr key={manufacturer.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="fw-bold">{manufacturer.name}</td>
                          <td>{manufacturer.country || "-"}</td>
                          <td>{manufacturer.contact || "-"}</td>
                          <td>
                            {manufacturer.website ? (
                              <a 
                                href={manufacturer.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary"
                              >
                                Visit
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>{manufacturer.address || "-"}</td>
                          <td>{manufacturer.notes || "-"}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(manufacturer.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {manufacturers.length > 0 && (
                <div className="mt-3">
                  <p className="text-muted mb-0">
                    Total Manufacturers: <strong>{manufacturers.length}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
