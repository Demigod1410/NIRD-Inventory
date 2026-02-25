"use client";

export default function InventoryCard({ title, icon, total, active, idle, inactive, bgColor = "primary" }) {
  const colorMap = {
    primary: { text: "text-primary", bg: "rgba(13, 110, 253, 0.1)" },
    success: { text: "text-success", bg: "rgba(25, 135, 84, 0.1)" },
    warning: { text: "text-warning", bg: "rgba(255, 193, 7, 0.1)" },
    info: { text: "text-info", bg: "rgba(13, 202, 240, 0.1)" },
    danger: { text: "text-danger", bg: "rgba(220, 53, 69, 0.1)" }
  };

  const colors = colorMap[bgColor] || colorMap.primary;

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm hover-card" style={{ 
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px', fontWeight: '600' }}>
                {title}
              </h6>
              <h2 className="mb-0 fw-bold" style={{ fontSize: '2.5rem' }}>{total}</h2>
              <small className="text-muted">Total Devices</small>
            </div>
            <div 
              className={`${colors.text} d-flex align-items-center justify-content-center rounded-3`} 
              style={{ 
                fontSize: '2rem',
                backgroundColor: colors.bg,
                width: '70px',
                height: '70px',
                flexShrink: 0
              }}
            >
              {icon}
            </div>
          </div>
          
          <div className="row g-2 mt-3">
            <div className="col-4">
              <div className="text-center p-2 rounded" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                <div className="fw-bold text-success" style={{ fontSize: '1.25rem' }}>{active}</div>
                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Active</small>
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 rounded" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                <div className="fw-bold text-warning" style={{ fontSize: '1.25rem' }}>{idle}</div>
                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Idle</small>
              </div>
            </div>
            <div className="col-4">
              <div className="text-center p-2 rounded" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                <div className="fw-bold text-danger" style={{ fontSize: '1.25rem' }}>{inactive}</div>
                <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Inactive</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
