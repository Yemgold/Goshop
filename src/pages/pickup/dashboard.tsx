

// pages/pickup/dashboard.tsx

import React from "react";

const PickupDashboard = () => {
  const stats = [
    {
      title: "Total Assigned Orders",
      value: 125,
      icon: "📦",
    },
    {
      title: "Awaiting Pickup",
      value: 18,
      icon: "🚚",
    },
    {
      title: "Collected Today",
      value: 12,
      icon: "✅",
    },
    {
      title: "Pending Deliveries",
      value: 9,
      icon: "⏳",
    },
    {
      title: "Today's Earnings",
      value: "₦15,500",
      icon: "💰",
    },
    {
      title: "Average Rating",
      value: "4.8 ★",
      icon: "⭐",
    },
  ];

  const activities = [
    {
      id: 1,
      activity: "Collected Order #ORD-1001",
      time: "10 mins ago",
    },
    {
      id: 2,
      activity: "New Pickup Assigned",
      time: "25 mins ago",
    },
    {
      id: 3,
      activity: "Customer Confirmed Pickup",
      time: "1 hour ago",
    },
    {
      id: 4,
      activity: "Commission Added",
      time: "2 hours ago",
    },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1>Pickup Agent Dashboard</h1>
        <p>Manage pickups, deliveries, earnings and performance.</p>
      </div>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div>
          <h2>David Johnson</h2>
          <p>Agent ID: PKP-001</p>
          <p>Status: 🟢 Online</p>
        </div>

        <div>
          <p>Vehicle: Motorcycle</p>
          <p>Phone: 08012345678</p>
        </div>
      </div>

      {/* Statistics */}
      <div style={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div style={styles.section}>
        <h2>Today's Pickup Schedule</h2>

        <div style={styles.scheduleItem}>
          <strong>09:00 AM</strong> - Lekki Phase 1
        </div>

        <div style={styles.scheduleItem}>
          <strong>11:30 AM</strong> - Ikeja
        </div>

        <div style={styles.scheduleItem}>
          <strong>02:00 PM</strong> - Yaba
        </div>

        <div style={styles.scheduleItem}>
          <strong>04:30 PM</strong> - Surulere
        </div>
      </div>

      {/* Assigned Orders */}
      <div style={styles.section}>
        <h2>Assigned Orders</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={styles.td}>ORD-1001</td>
              <td style={styles.td}>John Doe</td>
              <td style={styles.td}>Lekki</td>
              <td style={styles.td}>Assigned</td>
            </tr>

            <tr>
              <td style={styles.td}>ORD-1002</td>
              <td style={styles.td}>Mary James</td>
              <td style={styles.td}>Yaba</td>
              <td style={styles.td}>Picked Up</td>
            </tr>

            <tr>
              <td style={styles.td}>ORD-1003</td>
              <td style={styles.td}>Michael</td>
              <td style={styles.td}>Ikeja</td>
              <td style={styles.td}>Awaiting Pickup</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h2>Quick Actions</h2>

        <div style={styles.actionGrid}>
          <a href="/pickup/orders" style={styles.actionButton}>
            View Assigned Orders
          </a>

          <a href="/pickup/pending" style={styles.actionButton}>
            Pending Pickups
          </a>

          <a href="/pickup/earnings" style={styles.actionButton}>
            Earnings
          </a>

          <a href="/pickup/history" style={styles.actionButton}>
            Pickup History
          </a>

          <a href="/pickup/profile" style={styles.actionButton}>
            My Profile
          </a>

          <a href="/pickup/support" style={styles.actionButton}>
            Contact Support
          </a>
        </div>
      </div>

      {/* Notifications */}
      <div style={styles.section}>
        <h2>Notifications</h2>

        <ul style={styles.notificationList}>
          <li>🔔 New pickup assigned.</li>
          <li>🔔 Customer updated pickup location.</li>
          <li>🔔 Commission payment approved.</li>
        </ul>
      </div>

      {/* Recent Activities */}
      <div style={styles.section}>
        <h2>Recent Activities</h2>

        <div style={styles.activityContainer}>
          {activities.map((activity) => (
            <div key={activity.id} style={styles.activityItem}>
              <strong>{activity.activity}</strong>
              <small>{activity.time}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Areas */}
      <div style={styles.section}>
        <h2>Coverage Areas</h2>

        <div style={styles.coverageGrid}>
          <span style={styles.badge}>Lekki</span>
          <span style={styles.badge}>Ikeja</span>
          <span style={styles.badge}>Yaba</span>
          <span style={styles.badge}>Surulere</span>
          <span style={styles.badge}>Ajah</span>
        </div>
      </div>

      {/* Support */}
      <div style={styles.section}>
        <h2>Support</h2>

        <div style={styles.actionGrid}>
          <a href="tel:+2348000000000" style={styles.actionButton}>
            Call Dispatch
          </a>

          <a href="/pickup/report-issue" style={styles.actionButton}>
            Report Issue
          </a>
        </div>
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

  profileCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  icon: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  section: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  scheduleItem: {
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f3f4f6",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  actionButton: {
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    padding: "14px",
    textAlign: "center",
    borderRadius: "8px",
    fontWeight: 600,
  },

  notificationList: {
    paddingLeft: "20px",
    lineHeight: "2",
  },

  activityContainer: {
    marginTop: "10px",
  },

  activityItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },

  coverageGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  badge: {
    background: "#e5e7eb",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "14px",
  },
};

export default PickupDashboard;