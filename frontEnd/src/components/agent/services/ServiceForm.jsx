import { useEffect, useState } from "react";

export default function ServiceForm({
  onSubmit,
  selectedService,
  onCancel,
}) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
  });

  useEffect(() => {
    if (selectedService) {
      setForm({
        nom: selectedService.nom,
        description: selectedService.description,
        prix: selectedService.prix,
      });
    } else {
      setForm({ nom: "", description: "", prix: "" });
    }
  }, [selectedService]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nom: "", description: "", prix: "" });
  };

  return (
    <form className="agent-form" onSubmit={handleSubmit}>
      <h3>{selectedService ? "Update Service" : "Add New Service"}</h3>

      <input
        name="nom"
        placeholder="Service name"
        value={form.nom}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="prix"
        type="number"
        placeholder="Price"
        value={form.prix}
        onChange={handleChange}
        required
      />

      <button className="btn-primary" type="submit">
        {selectedService ? "Update Service" : "Add Service"}
      </button>

      {selectedService && (
        <button
          type="button"
          className="btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
