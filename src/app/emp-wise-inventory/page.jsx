"use client";
import { useState } from "react";
import Link from "next/link";
import employeesData from "../../../Employee.json";

export default function EmployeeWiseInventory() {
  // Employee data (same as in map-inventory-employee)
  const [employeeTypes] = useState([
    "Permanent Staff",
    "Contract Staff",
    "Consultant",
    "Intern",
    "Visiting Faculty",
  ]);

  const [employees] = useState(employeesData);

  // Sample inventory items with employee allocations
  const [inventoryItems] = useState([
    { 
      id: 1, 
      itemName: "Dell Laptop", 
      category: "Laptop", 
      serialNumber: "DL001", 
      manufacturer: "Dell", 
      allottedToId: 101, 
      allottedTo: "John Doe",
      allottedDate: "2024-01-15" 
    },
    { 
      id: 2, 
      itemName: "HP Printer", 
      category: "Printer", 
      serialNumber: "HP001", 
      manufacturer: "HP", 
      allottedToId: 102, 
      allottedTo: "Jane Smith",
      allottedDate: "2024-02-10" 
    },
    { 
      id: 3, 
      itemName: "Lenovo Desktop", 
      category: "Computer", 
      serialNumber: "LN001", 
      manufacturer: "Lenovo", 
      allottedToId: 101, 
      allottedTo: "John Doe",
      allottedDate: "2024-01-20" 
    },
    { 
      id: 4, 
      itemName: "Dell Monitor", 
      category: "Monitor", 
      serialNumber: "DL002", 
      manufacturer: "Dell", 
      allottedToId: 103, 
      allottedTo: "Robert Johnson",
      allottedDate: "2024-01-25" 
    },
    { 
      id: 5, 
      itemName: "HP Laptop", 
      category: "Laptop", 
      serialNumber: "HP002", 
      manufacturer: "HP", 
      allottedToId: 101, 
      allottedTo: "John Doe",
      allottedDate: "2024-02-01" 
    },
    { 
      id: 6, 
      itemName: "Canon Scanner", 
      category: "Scanner", 
      serialNumber: "CN001", 
      manufacturer: "Canon", 
      allottedToId: 104, 
      allottedTo: "Emily Davis",
      allottedDate: "2024-02-05" 
    },
    { 
      id: 7, 
      itemName: "Logitech Keyboard", 
      category: "Keyboard", 
      serialNumber: "LG001", 
      manufacturer: "Logitech", 
      allottedToId: 102, 
      allottedTo: "Jane Smith",
      allottedDate: "2024-02-15" 
    },
    { 
      id: 8, 
      itemName: "Dell Mouse", 
      category: "Mouse", 
      serialNumber: "DL003", 
      manufacturer: "Dell", 
      allottedToId: 105, 
      allottedTo: "Michael Brown",
      allottedDate: "2024-03-01" 
    },
  ]);

  const [formData, setFormData] = useState({
    employeeType: "",
    employeeId: "",
  });

  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Filter employees by type
  const availableEmployees = formData.employeeType
    ? employees.filter((emp) => emp.type === formData.employeeType)
    : employees;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Reset employee selection when type changes
      if (name === "employeeType") {
        newData.employeeId = "";
      }

      return newData;
    });
    
    // Reset search when user changes fields
    setSearchPerformed(false);
  };

  const handleCheckItems = (e) => {
    e.preventDefault();

    if (!formData.employeeId) {
      alert("Please select both Employee Type and Employee Name");
      return;
    }

    // Filter items for the selected employee
    const items = inventoryItems.filter(
      (item) => item.allottedToId === parseInt(formData.employeeId)
    );

    setFilteredItems(items);
    setSearchPerformed(true);
  };

  const selectedEmployee = employees.find(
    (emp) => emp.emp_id === parseInt(formData.employeeId)
  );

  return (
    <div className="container-fluid py-4 h-screen overflow-auto">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          {/* Search Form */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">EMPLOYEE-WISE INVENTORY</h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleCheckItems}>
                <div className="row">
                  {/* Select Employee Type */}
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label htmlFor="employeeType" className="form-label fw-bold">
                        Employee Type *
                      </label>
                      <select
                        className="form-select form-select-lg"
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
                  </div>

                  {/* Select Employee Name */}
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label htmlFor="employeeId" className="form-label fw-bold">
                        Employee Name *
                      </label>
                      <select
                        className="form-select form-select-lg"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                        disabled={!formData.employeeType}
                      >
                        <option value="">Choose employee...</option>
                        {availableEmployees.map((employee) => (
                          <option key={employee.emp_id} value={employee.emp_id}>
                            {employee.emp_name} - {employee.department}
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

                  {/* Check Items Button */}
                  <div className="col-md-2 d-flex align-items-end">
                    <div className="mb-3 w-100">
                      <button 
                        type="submit" 
                        className="btn btn-success w-100 btn-lg"
                        disabled={!formData.employeeId}
                      >
                        Check Items
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Results Table */}
          {searchPerformed && (
            <div className="card shadow">
              <div className="card-header bg-info text-white py-3">
                <h3 className="mb-0">
                  Items Allotted to {selectedEmployee?.emp_name}
                  {selectedEmployee && (
                    <span className="ms-2">
                      <small className="badge bg-white text-info">
                        {selectedEmployee.type} - {selectedEmployee.department}
                      </small>
                    </span>
                  )}
                </h3>
              </div>

              <div className="card-body p-4">
                {filteredItems.length === 0 ? (
                  <div className="alert alert-warning text-center py-4">
                    <h5 className="mb-0">
                      No items allotted to {selectedEmployee?.emp_name}
                    </h5>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Serial Number</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Allotted Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredItems.map((item, index) => (
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
                              <td>{item.allottedDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3">
                      <div className="alert alert-info mb-0">
                        <strong>{filteredItems.length}</strong> item(s) allotted to{" "}
                        {selectedEmployee?.emp_name}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

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
