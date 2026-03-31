"use client";
import { useState } from "react";
import Link from "next/link";

export default function MapInventoryEmployee() {
  // Employee data
  const [employeeTypes] = useState([
    "Permanent Staff",
    "Contract Staff",
    "Consultant",
    "Intern",
    "Visiting Faculty",
  ]);

  const [employees] = useState([
    { id: 1, name: "John Doe", type: "Permanent Staff", department: "IT" },
    { id: 2, name: "Jane Smith", type: "Contract Staff", department: "Admin" },
    { id: 3, name: "Robert Johnson", type: "Permanent Staff", department: "HR" },
    { id: 4, name: "Emily Davis", type: "Consultant", department: "Finance" },
    { id: 5, name: "Michael Brown", type: "Intern", department: "IT" },
  ]);

  const [itemCategories] = useState([
    "Computer",
    "Laptop",
    "Printer",
    "Scanner",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Other",
  ]);

  // Inventory items with allocation status
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, itemName: "Dell Laptop", category: "Laptop", serialNumber: "DL001", manufacturer: "Dell", allottedTo: null, allottedDate: null },
    { id: 2, itemName: "HP Printer", category: "Printer", serialNumber: "HP001", manufacturer: "HP", allottedTo: null, allottedDate: null },
    { id: 3, itemName: "Lenovo Desktop", category: "Computer", serialNumber: "LN001", manufacturer: "Lenovo", allottedTo: null, allottedDate: null },
    { id: 4, itemName: "Dell Monitor", category: "Monitor", serialNumber: "DL002", manufacturer: "Dell", allottedTo: null, allottedDate: null },
    { id: 5, itemName: "HP Laptop", category: "Laptop", serialNumber: "HP002", manufacturer: "HP", allottedTo: null, allottedDate: null },
    { id: 6, itemName: "Canon Scanner", category: "Scanner", serialNumber: "CN001", manufacturer: "Canon", allottedTo: null, allottedDate: null },
    { id: 7, itemName: "Logitech Keyboard", category: "Keyboard", serialNumber: "LG001", manufacturer: "Logitech", allottedTo: null, allottedDate: null },
    { id: 8, itemName: "Dell Mouse", category: "Mouse", serialNumber: "DL003", manufacturer: "Dell", allottedTo: null, allottedDate: null },
  ]);

  const [formData, setFormData] = useState({
    employeeType: "",
    employeeId: "",
    itemName: "",
    itemCategory: "",
    serialNumber: "",
  });

  // Filter employees by type
  const filteredEmployees = formData.employeeType
    ? employees.filter((emp) => emp.type === formData.employeeType)
    : employees;

  // Filter items by category
  const filteredItems = formData.itemCategory
    ? inventoryItems.filter(
        (item) => item.category === formData.itemCategory && !item.allottedTo
      )
    : inventoryItems.filter((item) => !item.allottedTo);

  // Get available serial numbers for selected item name
  const availableSerialNumbers = formData.itemName
    ? inventoryItems.filter(
        (item) => item.itemName === formData.itemName && !item.allottedTo
      )
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Reset dependent fields when parent field changes
      if (name === "employeeType") {
        newData.employeeId = "";
      }
      if (name === "itemCategory") {
        newData.itemName = "";
        newData.serialNumber = "";
      }
      if (name === "itemName") {
        newData.serialNumber = "";
      }

      return newData;
    });
  };

  const handleAllot = (e) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.serialNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const employee = employees.find((emp) => emp.id === parseInt(formData.employeeId));
    const item = inventoryItems.find((item) => item.serialNumber === formData.serialNumber);

    if (!employee || !item) {
      alert("Invalid employee or item selection");
      return;
    }

    // Update inventory item with allotment details
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.serialNumber === formData.serialNumber
          ? {
              ...item,
              allottedTo: employee.name,
              allottedToId: employee.id,
              allottedDate: new Date().toLocaleDateString(),
            }
          : item
      )
    );

    alert(`${item.itemName} (${item.serialNumber}) successfully allotted to ${employee.name}`);

    // Reset form
    setFormData({
      employeeType: "",
      employeeId: "",
      itemName: "",
      itemCategory: "",
      serialNumber: "",
    });
  };

  // Get unallotted items
  const unallottedItems = inventoryItems.filter((item) => !item.allottedTo);

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Allot Item Form */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">ALLOT INVENTORY TO EMPLOYEE</h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleAllot}>
                <div className="row">
                  {/* Employee Section */}
                  <div className="col-md-6">
                    <h5 className="mb-3 text-primary">Employee Details</h5>

                    {/* Select Employee Type */}
                    <div className="mb-3">
                      <label htmlFor="employeeType" className="form-label fw-bold">
                        Select Employee Type *
                      </label>
                      <select
                        className="form-select"
                        id="employeeType"
                        name="employeeType"
                        value={formData.employeeType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose employee type...</option>
                        {employeeTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select Employee Name */}
                    <div className="mb-3">
                      <label htmlFor="employeeId" className="form-label fw-bold">
                        Select Employee Name *
                      </label>
                      <select
                        className="form-select"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        disabled={!formData.employeeType}
                      >
                        <option value="">Choose employee...</option>
                        {filteredEmployees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name} - {employee.department}
                          </option>
                        ))}
                      </select>
                      {!formData.employeeType && (
                        <small className="form-text text-muted">
                          Please select employee type first
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Item Section */}
                  <div className="col-md-6">
                    <h5 className="mb-3 text-success">Item Details</h5>

                    {/* Item Category */}
                    <div className="mb-3">
                      <label htmlFor="itemCategory" className="form-label fw-bold">
                        Item Category *
                      </label>
                      <select
                        className="form-select"
                        id="itemCategory"
                        name="itemCategory"
                        value={formData.itemCategory}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose category...</option>
                        {itemCategories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Item Name */}
                    <div className="mb-3">
                      <label htmlFor="itemName" className="form-label fw-bold">
                        Item Name *
                      </label>
                      <select
                        className="form-select"
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                        disabled={!formData.itemCategory}
                      >
                        <option value="">Choose item...</option>
                        {[...new Set(filteredItems.map((item) => item.itemName))].map(
                          (itemName, index) => (
                            <option key={index} value={itemName}>
                              {itemName}
                            </option>
                          )
                        )}
                      </select>
                      {!formData.itemCategory && (
                        <small className="form-text text-muted">
                          Please select item category first
                        </small>
                      )}
                    </div>

                    {/* Select Serial Number */}
                    <div className="mb-3">
                      <label htmlFor="serialNumber" className="form-label fw-bold">
                        Select Serial Number *
                      </label>
                      <select
                        className="form-select"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                        disabled={!formData.itemName}
                      >
                        <option value="">Choose serial number...</option>
                        {availableSerialNumbers.map((item) => (
                          <option key={item.id} value={item.serialNumber}>
                            {item.serialNumber} - {item.manufacturer}
                          </option>
                        ))}
                      </select>
                      {!formData.itemName && (
                        <small className="form-text text-muted">
                          Please select item name first
                        </small>
                      )}
                      {formData.itemName && availableSerialNumbers.length === 0 && (
                        <small className="form-text text-danger">
                          No available items for this selection
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                {/* Allot Button */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success flex-grow-1 btn-lg">
                        Allot Item to Employee
                      </button>
                      <Link href="/" className="btn btn-outline-secondary btn-lg">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Unallotted Items Table */}
          <div className="card shadow">
            <div className="card-header bg-warning text-dark py-3">
              <h2 className="mb-0 text-center">UNALLOTTED ITEMS</h2>
            </div>

            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Serial Number</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unallottedItems.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          All items have been allotted. No unallotted items remaining.
                        </td>
                      </tr>
                    ) : (
                      unallottedItems.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="fw-bold">{item.itemName}</td>
                          <td>
                            <span className="badge bg-info">{item.category}</span>
                          </td>
                          <td>
                            <code>{item.serialNumber}</code>
                          </td>
                          <td>{item.manufacturer}</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              Available
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {unallottedItems.length > 0 && (
                <div className="mt-3">
                  <div className="alert alert-info mb-0">
                    <strong>{unallottedItems.length}</strong> item(s) available for
                    allotment out of <strong>{inventoryItems.length}</strong> total items
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
