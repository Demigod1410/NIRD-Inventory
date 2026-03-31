"use client";
import { useState } from "react";
import Link from "next/link";

export default function MapInventoryExcel() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mappedItems, setMappedItems] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      setFileName(file.name);
      parseExcelFile(file);
    }
  };

  const parseExcelFile = async (file) => {
    setIsProcessing(true);
    try {
      // Dynamic import of xlsx library
      const XLSX = await import("xlsx");
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          
          // Get first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          setExcelData(jsonData);
          setIsProcessing(false);
        } catch (error) {
          alert("Error parsing Excel file: " + error.message);
          setIsProcessing(false);
        }
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      alert("Error loading Excel library. Please make sure xlsx is installed.");
      setIsProcessing(false);
    }
  };

  const handleMapInventory = () => {
    if (!excelData || excelData.length === 0) {
      alert("Please upload an Excel file first");
      return;
    }

    // Process the Excel data and map inventory
    const processed = excelData.map((row, index) => ({
      id: index + 1,
      employeeName: row["Employee Name"] || row.employeeName || "",
      employeeType: row["Employee Type"] || row.employeeType || "",
      itemName: row["Item Name"] || row.itemName || "",
      itemCategory: row["Item Category"] || row.itemCategory || "",
      serialNumber: row["Serial Number"] || row.serialNumber || "",
      manufacturer: row["Manufacturer"] || row.manufacturer || "",
      status: "Mapped",
    }));

    setMappedItems(processed);
    alert(`Successfully mapped ${processed.length} items from Excel file!`);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data?")) {
      setExcelFile(null);
      setExcelData(null);
      setFileName("");
      setMappedItems([]);
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
          {/* Upload Excel File Section */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">MAP INVENTORY BY EXCEL FILE</h2>
            </div>

            <div className="card-body p-4">
              {/* File Upload Section */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="alert alert-info">
                    <h5 className="alert-heading">📋 Excel File Format</h5>
                    <p className="mb-0">
                      Your Excel file should contain the following columns:
                      <strong> Employee Name, Employee Type, Item Name, Item Category, 
                      Serial Number, Manufacturer</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="excelFile" className="form-label fw-bold">
                      Upload Excel File *
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="excelFile"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                    />
                    <small className="form-text text-muted">
                      Accepted formats: .xlsx, .xls, .csv
                    </small>
                  </div>

                  {fileName && (
                    <div className="alert alert-success d-flex align-items-center">
                      <span className="me-2">✓</span>
                      <strong>File loaded: {fileName}</strong>
                      {excelData && (
                        <span className="ms-2 badge bg-primary">
                          {excelData.length} rows
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="d-grid gap-2 w-100">
                    <button
                      type="button"
                      className="btn btn-success btn-lg"
                      onClick={handleMapInventory}
                      disabled={!excelData || isProcessing}
                    >
                      {isProcessing ? "Processing..." : "MAP Inventory by Excel File"}
                    </button>
                    {excelData && (
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleClearData}
                      >
                        Clear Data
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 text-end">
                  <Link href="/" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Excel Data Preview */}
          {excelData && excelData.length > 0 && (
            <div className="card shadow mb-4">
              <div className="card-header bg-info text-white py-3">
                <h2 className="mb-0 text-center">EXCEL DATA PREVIEW</h2>
              </div>

              <div className="card-body p-4">
                <div className="alert alert-warning">
                  <strong>Preview:</strong> Showing first {Math.min(5, excelData.length)} rows
                  of {excelData.length} total rows
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        {Object.keys(excelData[0]).map((key, index) => (
                          <th key={index} scope="col">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <th scope="row">{rowIndex + 1}</th>
                          {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value || "-"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {excelData.length > 5 && (
                  <div className="text-muted text-center mt-3">
                    ... and {excelData.length - 5} more rows
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mapped Items Table */}
          {mappedItems.length > 0 && (
            <div className="card shadow">
              <div className="card-header bg-success text-white py-3">
                <h2 className="mb-0 text-center">MAPPED INVENTORY ITEMS</h2>
              </div>

              <div className="card-body p-4">
                <div className="alert alert-success">
                  <strong>✓ Success!</strong> {mappedItems.length} items have been
                  successfully mapped from the Excel file.
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Employee Type</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mappedItems.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="fw-bold">{item.employeeName}</td>
                          <td>
                            <span className="badge bg-primary">
                              {item.employeeType}
                            </span>
                          </td>
                          <td>{item.itemName}</td>
                          <td>
                            <span className="badge bg-info">{item.itemCategory}</span>
                          </td>
                          <td>
                            <code>{item.serialNumber}</code>
                          </td>
                          <td>{item.manufacturer}</td>
                          <td>
                            <span className="badge bg-success">{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3">
                  <p className="text-muted mb-0">
                    Total Mapped Items: <strong>{mappedItems.length}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
