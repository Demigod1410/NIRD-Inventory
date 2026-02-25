"use client";
import { useState, useRef, useEffect } from "react";

export default function DatePicker({
  label,
  value,
  onChange,
  name,
  required = false,
  min = "",
  max = "",
  className = "",
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayValue, setDisplayValue] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const calendarRef = useRef(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value + "T00:00:00");
      setDisplayValue(formatDate(date));
      setCurrentDate(date);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
    } else {
      setDisplayValue("");
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const toISODate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const handleDateSelect = (date) => {
    const isoDate = toISODate(date);
    
    if (min && isoDate < min) return;
    if (max && isoDate > max) return;

    setDisplayValue(formatDate(date));
    setShowCalendar(false);
    
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: isoDate,
        },
      });
    }
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setCurrentDate(new Date(year, selectedMonth));
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    setSelectedMonth(month);
    setCurrentDate(new Date(selectedYear, month));
  };

  const isDisabled = (date) => {
    const isoDate = toISODate(date);
    if (min && isoDate < min) return true;
    if (max && isoDate > max) return true;
    return false;
  };

  const isSelected = (date) => {
    return value && toISODate(date) === value;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate year options (from 1950 to current year + 10)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1950; year <= currentYear + 10; year++) {
    years.push(year);
  }

  const days = getDaysInMonth(selectedYear, selectedMonth);

  return (
    <div className={`mb-3 ${className}`} ref={calendarRef}>
      {label && (
        <label className="form-label fw-bold">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      <div className="input-group" style={{ position: "relative" }}>
        <span className="input-group-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </span>
        <input
          type="text"
          className="form-control"
          value={displayValue}
          onClick={() => setShowCalendar(!showCalendar)}
          readOnly
          placeholder="Select a date"
          required={required}
          style={{ cursor: "pointer", backgroundColor: "white" }}
        />
        <input
          type="hidden"
          name={name}
          value={value}
        />

        {showCalendar && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 1000,
              backgroundColor: "white",
              border: "1px solid #dee2e6",
              borderRadius: "0.375rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
              marginTop: "0.25rem",
              padding: "0.75rem",
              minWidth: "320px",
            }}
          >
            {/* Calendar Header with dropdowns */}
            <div className="row g-2 mb-3">
              <div className="col-7">
                <select
                  className="form-select form-select-sm"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-5">
                <select
                  className="form-select form-select-sm"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {years.reverse().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Day Headers */}
            <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-muted" style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
              {days.map((date, index) => (
                <div key={index}>
                  {date ? (
                    <button
                      type="button"
                      className={`btn btn-sm w-100 ${
                        isSelected(date)
                          ? "btn-primary"
                          : isDisabled(date)
                          ? "btn-light text-muted"
                          : "btn-outline-light text-dark"
                      }`}
                      onClick={() => !isDisabled(date) && handleDateSelect(date)}
                      disabled={isDisabled(date)}
                      style={{
                        padding: "0.25rem",
                        fontSize: "0.875rem",
                        cursor: isDisabled(date) ? "not-allowed" : "pointer",
                      }}
                    >
                      {date.getDate()}
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mt-2 text-center">
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none"
                onClick={() => {
                  const today = new Date();
                  setSelectedYear(today.getFullYear());
                  setSelectedMonth(today.getMonth());
                  setCurrentDate(today);
                  handleDateSelect(today);
                }}
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
