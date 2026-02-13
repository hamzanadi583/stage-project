import { useEffect, useState } from "react";

export default function UserForm({ onSubmit, selectedUser, onCancel }) {
  const [form, setForm] = useState({
    nomComplet: "",
    email: "",
    password: "",
  });

  // Fill form when editing
  useEffect(() => {
    if (selectedUser) {
      setForm({
        nomComplet: selectedUser.nomComplet,
        email: selectedUser.email,
        password: "",
      });
    } else {
      setForm({
        nomComplet: "",
        email: "",
        password: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🔥 مهم جدًا
    onSubmit(form);
  };

  return (
    <form className="agent-form" onSubmit={handleSubmit}>
      <h3>{selectedUser ? "Edit Client" : "Add New Client"}</h3>

      <input
        type="text"
        name="nomComplet"
        placeholder="Nom complet"
        value={form.nomComplet}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      {!selectedUser && (
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      )}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {selectedUser ? "Update" : "Add Client"}
        </button>

        {selectedUser && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
