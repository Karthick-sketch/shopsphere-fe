import Badge from "../components/Badge";
import SkeletonRow from "../components/SkeletonRow";
import type { User } from "../models/user";
import type { UserRoleType } from "../types/user-role";

const MOCK_USERS: User[] = [
  { id: 1, name: "Aisha Patel",    email: "aisha@example.com",  password: "***", role: "ADMIN" },
  { id: 2, name: "Rahul Sharma",   email: "rahul@example.com",  password: "***", role: "USER" },
  { id: 3, name: "Priya Nair",     email: "priya@example.com",  password: "***", role: "USER" },
  { id: 4, name: "Vikram Reddy",   email: "vikram@example.com", password: "***", role: "ADMIN" },
  { id: 5, name: "Sneha Joshi",    email: "sneha@example.com",  password: "***", role: "USER" },
];

export default function UsersPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage user accounts and roles.</p>
        </div>
        <button className="btn btn-primary">＋ Add User</button>
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-toolbar-title">All Users</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="search-input-wrap">
              <span className="search-input-icon">🔍</span>
              <input
                id="users-search"
                type="text"
                className="search-input"
                placeholder="Search users..."
              />
            </div>
            <button className="btn btn-secondary">Filter ▾</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                  #{user.id}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "var(--gradient-brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600 }}>{user.name}</span>
                  </div>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{user.email}</td>
                <td>
                  <Badge variant={user.role as UserRoleType} />
                </td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12 }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ padding: "5px 10px", fontSize: 12 }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <SkeletonRow cols={5} rows={3} />
          </tbody>
        </table>

        <div className="table-footer">
          Showing {MOCK_USERS.length} of 1,284 users
        </div>
      </div>
    </>
  );
}
