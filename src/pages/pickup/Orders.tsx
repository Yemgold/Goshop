


import React from "react";

const PickupOrders = () => {
  const orders = [
    {
      id: "ORD-1001",
      customer: "John Doe",
      phone: "08012345678",
      address: "Lekki Phase 1, Lagos",
      amount: "₦25,000",
      status: "Assigned",
      date: "25 Jun 2026",
    },
    {
      id: "ORD-1002",
      customer: "Mary James",
      phone: "08087654321",
      address: "Yaba, Lagos",
      amount: "₦18,500",
      status: "Awaiting Pickup",
      date: "25 Jun 2026",
    },
    {
      id: "ORD-1003",
      customer: "Michael Johnson",
      phone: "08023456789",
      address: "Ikeja, Lagos",
      amount: "₦32,000",
      status: "Collected",
      date: "24 Jun 2026",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Assigned Orders</h1>
        <p>Manage and track all orders assigned to you.</p>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <h2>125</h2>
          <p>Total Assigned</p>
        </div>

        <div style={styles.summaryCard}>
          <h2>18</h2>
          <p>Awaiting Pickup</p>
        </div>

        <div style={styles.summaryCard}>
          <h2>12</h2>
          <p>Collected Today</p>
        </div>

        <div style={styles.summaryCard}>
          <h2>9</h2>
          <p>Pending</p>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.customer}</td>
                <td style={styles.td}>{order.phone}</td>
                <td style={styles.td}>{order.address}</td>
                <td style={styles.td}>{order.amount}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background:
                        order.status === "Collected"
                          ? "#dcfce7"
                          : order.status === "Assigned"
                          ? "#dbeafe"
                          : "#fef3c7",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={styles.td}>{order.date}</td>

                <td style={styles.td}>
                  <button style={styles.button}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "30px",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "25px",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  summaryCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  tableContainer: {
    background: "#fff",
    borderRadius: "12px",
    overflowX: "auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "15px",
    background: "#f3f4f6",
    textAlign: "left",
    fontWeight: 600,
  },

  td: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },

  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },

  button: {
    border: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default PickupOrders;