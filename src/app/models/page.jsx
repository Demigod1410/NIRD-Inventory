"use client";
import { useState } from "react";
import Link from "next/link";

export default function Models() {
  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: "Dell" },
    { id: 2, name: "HP" },
    { id: 3, name: "Lenovo" },
    { id: 4, name: "Apple" },
    { id: 5, name: "Asus" },
  ]);

  const [models, setModels] = useState([
    { id: 1, manufacturerId: 1, manufacturerName: "Dell", modelName: "Latitude 5420", category: "Laptop" },
    { id: 2, manufacturerId: 1, manufacturerName: "Dell", modelName: "OptiPlex 7090", category: "Desktop" },
    { id: 3, manufacturerId: 2, manufacturerName: "HP", modelName: "EliteBook 840", category: "Laptop" },
    { id: 4, manufacturerId: 2, manufacturerName: "HP", modelName: "LaserJet Pro M404", category: "Printer" },
    { id: 5, manufacturerId: 3, manufacturerName: "Lenovo", modelName: "ThinkPad X1 Carbon", category: "Laptop" },
  ]);

  const [formData, setFormData] = useState({
    manufacturerId: "",
    modelName: "",
    category: "",
    specifications: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterManufacturer, setFilterManufacturer] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find manufacturer name
    const manufacturer = manufacturers.find(m => m.id === parseInt(formData.manufacturerId));
    
    if (!manufacturer) {
      alert("Please select a manufacturer");
      return;
    }
    
    // Create new model object
    const newModel = {
      id: models.length + 1,
      manufacturerId: parseInt(formData.manufacturerId),
      manufacturerName: manufacturer.name,
      modelName: formData.modelName,
      category: formData.category,
      specifications: formData.specifications,
    };
    
    // Add to models list
    setModels((prev) => [...prev, newModel]);
    
    // Show success message
    alert("Model added successfully!");
    
    // Reset form
    setFormData({
      manufacturerId: "",
      modelName: "",
      category: "",
      specifications: "",
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this model?")) {
      setModels((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Filter models based on search and manufacturer filter
  const filteredModels = models.filter((model) => {
    const matchesSearch = model.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesManufacturer = filterManufacturer === "" || model.manufacturerId === parseInt(filterManufacturer);
    return matchesSearch && matchesManufacturer;
  });

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Add Model Form */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">ADD MODEL</h2>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Column 1 */}
                  <div className="col-md-6">
                    {/* Select Manufacturer */}
                    <div className="mb-3">
                      <label htmlFor="manufacturerId" className="form-label fw-bold">
                        Select Manufacturer *
                      </label>
                      <select
                        className="form-select"
                        id="manufacturerId"
                        name="manufacturerId"
                        value={formData.manufacturerId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose a manufacturer...</option>
                        {manufacturers.map((manufacturer) => (
                          <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                        Don't see your manufacturer? <Link href="/manufacturers" className="text-primary">Add one here</Link>
                      </small>
                    </div>

                    {/* Model Name */}
                    <div className="mb-3">
                      <label htmlFor="modelName" className="form-label fw-bold">
                        Model Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="modelName"
                        name="modelName"
                        value={formData.modelName}
                        onChange={handleChange}
                        placeholder="Enter model name"
                        required
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="col-md-6">
                    {/* Category */}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label fw-bold">
                        Category
                      </label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Printer">Printer</option>
                        <option value="Scanner">Scanner</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Server">Server</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Specifications */}
                    <div className="mb-3">
                      <label htmlFor="specifications" className="form-label fw-bold">
                        Specifications
                      </label>
                      <textarea
                        className="form-control"
                        id="specifications"
                        name="specifications"
                        value={formData.specifications}
                        onChange={handleChange}
                        placeholder="e.g., Intel i5, 8GB RAM, 256GB SSD"
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
                        Add Model
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

          {/* Models List Table */}
          <div className="card shadow">
            <div className="card-header bg-success text-white py-3">
              <h2 className="mb-0 text-center">MODELS LIST</h2>
            </div>
            
            <div className="card-body p-4">
              {/* Search and Filter Section */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="searchTerm" className="form-label fw-bold">
                    Search Models
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="searchTerm"
                    placeholder="Search by model name or manufacturer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="filterManufacturer" className="form-label fw-bold">
                    Filter by Manufacturer
                  </label>
                  <select
                    className="form-select"
                    id="filterManufacturer"
                    value={filterManufacturer}
                    onChange={(e) => setFilterManufacturer(e.target.value)}
                  >
                    <option value="">All Manufacturers</option>
                    {manufacturers.map((manufacturer) => (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Model Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Specifications</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredModels.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          {searchTerm || filterManufacturer 
                            ? "No models found matching your search criteria."
                            : "No models found. Add one above to get started."}
                        </td>
                      </tr>
                    ) : (
                      filteredModels.map((model, index) => (
                        <tr key={model.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="fw-bold">{model.manufacturerName}</td>
                          <td>{model.modelName}</td>
                          <td>
                            {model.category ? (
                              <span className="badge bg-info">{model.category}</span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>{model.specifications || "-"}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(model.id)}
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
              
              {filteredModels.length > 0 && (
                <div className="mt-3">
                  <p className="text-muted mb-0">
                    Showing <strong>{filteredModels.length}</strong> of <strong>{models.length}</strong> models
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
