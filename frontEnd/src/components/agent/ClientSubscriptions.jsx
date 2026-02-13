export default function ClientSubscriptions({ client, onClose }) {
  // مؤقتًا static (لاحقًا API)
  const subscriptions = [
    { id: 1, service: "Internet Premium", price: 50, status: "Actif" },
    { id: 2, service: "TV Package", price: 30, status: "Actif" },
  ];

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Abonnements de {client.nomComplet}</h3>
        <button className="btn-secondary" onClick={onClose}>
          Fermer
        </button>
      </div>

      <table className="modern-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Prix</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <tr key={s.id}>
              <td>{s.service}</td>
              <td>{s.price} €</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
