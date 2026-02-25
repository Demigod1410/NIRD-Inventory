"use client";
import { useState } from "react";
import Link from "next/link";
import Calendar from "@/components/Calender";

export default function AddInventory() {
  const [formData, setFormData] = useState({
    itemCategory: "",
    serialNumber: "",
    numberOnItem: "",
    efileComputerNumber: "",
    procuredUnder: "",
    itemType: "",
    warranty: "",
    purchaseDate: "",
    billNumber: "",
    supplier: "",
    manufacturer: "",
    warrantyExpiryDate: "",
    status: "",
    sectionCenter: "",
    phoneNumber: "",
    billFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      billFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend/database
    console.log("Form Data:", formData);
    
    // Example: Add to Asset_Inventory.json or send to API
    alert("Inventory item added successfully!");
    
    // Reset form
    setFormData({
      itemCategory: "",
      serialNumber: "",
      numberOnItem: "",
      efileComputerNumber: "",
      procuredUnder: "",
      itemType: "",
      warranty: "",
      purchaseDate: "",
      billNumber: "",
      supplier: "",
      manufacturer: "",
      warrantyExpiryDate: "",
      status: "",
      sectionCenter: "",
      phoneNumber: "",
      billFile: null,
    });
  };

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <div className="row justify-content-center">
        <div className="col-12 col-xl-11">
          <div className="card shadow">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">ADD CIT INVENTORY</h2>
            </div>
            
            <div className="card-body p-4">
              <div className="text-end mb-3">
                <Link href="/bulk-add" className="btn btn-outline-primary btn-sm">
                  Want to add in Bulk? Click here
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Column 1 */}
                  <div className="col-md-6 col-lg-4">
                    {/* Item Category */}
                    <div className="mb-3">
                      <label htmlFor="itemCategory" className="form-label fw-bold">
                        Item Category
                      </label>
                      <select
                        className="form-select"
                        id="itemCategory"
                        name="itemCategory"
                        value={formData.itemCategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Computer">Computer</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Printer">Printer</option>
                        <option value="Scanner">Scanner</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Serial Number */}
                    <div className="mb-3">
                      <label htmlFor="serialNumber" className="form-label fw-bold">
                        Serial Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        placeholder="Enter serial number"
                        required
                      />
                    </div>

                    {/* Number on Item */}
                    <div className="mb-3">
                      <label htmlFor="numberOnItem" className="form-label fw-bold">
                        Number on Item
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="numberOnItem"
                        value={formData.numberOnItem}
                        onChange={handleChange}
                        placeholder="Number on Item"
                      />
                    </div>

                    {/* e-file Computer Number */}
                    <div className="mb-3">
                      <label htmlFor="efileComputerNumber" className="form-label fw-bold">
                        e-file Computer Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="efileComputerNumber"
                        value={formData.efileComputerNumber}
                        onChange={handleChange}
                        placeholder="e-file Computer Number"
                      />
                    </div>

                    {/* Procured Under */}
                    <div className="mb-3">
                      <label htmlFor="procuredUnder" className="form-label fw-bold">
                        Procured Under
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="procuredUnder"
                        name="procuredUnder"
                        value={formData.procuredUnder}
                        onChange={handleChange}
                        placeholder="Enter procurement details"
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="col-md-6 col-lg-4">
                    {/* Item Type */}
                    <div className="mb-3">
                      <label htmlFor="itemType" className="form-label fw-bold">
                        Item Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="itemType"
                        name="itemType"
                        value={formData.itemType}
                        onChange={handleChange}
                        placeholder="Enter item type"
                        required
                      />
                    </div>

                    {/* Warranty */}
                    <div className="mb-3">
                      <label htmlFor="warranty" className="form-label fw-bold">
                        Warranty
                      </label>
                      <select
                        className="form-select"
                        id="warranty"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleChange}
                      >
                        <option value="">Select Warranty</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                        <option value="5 Years">5 Years</option>
                        <option value="No Warranty">No Warranty</option>
                      </select>
                    </div>

                    {/* Purchase Date */}
                    <Calendar
                      label="Purchase Date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      required={true}
                      className="mb-0"
                    />

                    {/* Bill Number */}
                    <div className="mb-3">
                      <label htmlFor="billNumber" className="form-label fw-bold">
                        Bill Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="billNumber"
                        name="billNumber"
                        value={formData.billNumber}
                        onChange={handleChange}
                        placeholder="Enter bill number"
                        required
                      />
                    </div>

                    {/* Supplier */}
                    <div className="mb-3">
                      <label htmlFor="supplier" className="form-label fw-bold">
                        Supplier
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="supplier"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        placeholder="Enter supplier name"
                        required
                      />
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="col-md-6 col-lg-4">
                    {/* Manufacturer */}
                    <div className="mb-3">
                      <label htmlFor="manufacturer" className="form-label fw-bold">
                        Manufacturer
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        placeholder="Enter manufacturer name"
                        required
                      />
                    </div>

                    {/* Warranty Expiry Date */}
                    <Calendar
                      label="Warranty Expiry Date"
                      name="warrantyExpiryDate"
                      value={formData.warrantyExpiryDate}
                      onChange={handleChange}
                      className="mb-0"
                      min={formData.purchaseDate}
                    />

                    {/* Status */}
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label fw-bold">
                        Status
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="In Use">In Use</option>
                        <option value="Available">Available</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Disposed">Disposed</option>
                      </select>
                    </div>

                    {/* Section/Center */}
                    <div className="mb-3">
                      <label htmlFor="sectionCenter" className="form-label fw-bold">
                        Section/Center
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sectionCenter"
                        name="sectionCenter"
                        value={formData.sectionCenter}
                        onChange={handleChange}
                        placeholder="Enter section or center name"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label fw-bold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Bill Upload - Full Width */}
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="billFile" className="form-label fw-bold">
                        Bill Upload
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="billFile"
                        name="billFile"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <small className="form-text text-muted">
                        Accepted formats: PDF, JPG, PNG
                      </small>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary flex-grow-1">
                        Add Inventory Item
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
        </div>
      </div>
    </div>
  );
}
