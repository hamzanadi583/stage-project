export default function ServiceTable({ services, onEdit, onDelete }) {
  return (
    <table className="agent-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.map((s) => (
          <tr key={s.id}>
            <td>{s.nom}</td>
            <td>{s.description}</td>
            <td>{s.prix}</td>
            <td>
              <button className="btn-edit" onClick={() => onEdit(s)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => onDelete(s)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
