"use client";

export default function InventoryTable({ data }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0 fw-bold">Inventory Details</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: '0.875rem' }}>Device Type</th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Total</th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Active</th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Idle</th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Inactive</th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: '0.875rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const activePercentage = ((item.active / item.total) * 100).toFixed(1);
                return (
                  <tr key={index} style={{ transition: 'background-color 0.2s' }}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div 
                          className={`${item.colorClass} d-flex align-items-center justify-content-center rounded-2 me-3`}
                          style={{
                            width: '45px',
                            height: '45px',
                            backgroundColor: item.backgroundColor,
                            fontSize: '1.25rem',
                            flexShrink: 0
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="fw-semibold">{item.title}</div>
                          <small className="text-muted">{activePercentage}% operational</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-secondary bg-opacity-10 text-dark fw-semibold px-3 py-2">
                        {item.total}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2">
                        {item.active}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-warning bg-opacity-10 text-warning fw-semibold px-3 py-2">
                        {item.idle}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge bg-danger bg-opacity-10 text-danger fw-semibold px-3 py-2">
                        {item.inactive}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex flex-column align-items-center">
                        <span className={`fw-semibold mb-2 ${activePercentage >= 80 ? 'text-success' : activePercentage >= 60 ? 'text-warning' : 'text-danger'}`}>
                          {activePercentage}%
                        </span>
                        <div className="progress" style={{ height: '6px', width: '100px' }}>
                          <div 
                            className={`progress-bar ${activePercentage >= 80 ? 'bg-success' : activePercentage >= 60 ? 'bg-warning' : 'bg-danger'}`}
                            role="progressbar" 
                            style={{ width: `${activePercentage}%` }}
                            aria-valuenow={activePercentage} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-light">
              <tr className="fw-bold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-center">
                  {data.reduce((sum, item) => sum + item.total, 0)}
                </td>
                <td className="px-4 py-3 text-center text-success">
                  {data.reduce((sum, item) => sum + item.active, 0)}
                </td>
                <td className="px-4 py-3 text-center text-warning">
                  {data.reduce((sum, item) => sum + item.idle, 0)}
                </td>
                <td className="px-4 py-3 text-center text-danger">
                  {data.reduce((sum, item) => sum + item.inactive, 0)}
                </td>
                <td className="px-4 py-3 text-center">
                  <small className="text-muted">
                    {((data.reduce((sum, item) => sum + item.active, 0) / 
                      data.reduce((sum, item) => sum + item.total, 0)) * 100).toFixed(1)}%
                  </small>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
