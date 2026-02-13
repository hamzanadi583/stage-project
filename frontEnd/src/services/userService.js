import { clientsMock } from "../mocks/users";

let clients = [...clientsMock];

export const getClients = () =>
  Promise.resolve({ data: clients });

export const addClient = (client) => {
  const newClient = {
    ...client,
    id: Date.now().toString(),
    statut: "client",
    created_at: new Date().toISOString().split("T")[0],
  };
  clients.push(newClient);
  return Promise.resolve({ data: newClient });
};

export const updateClient = (id, data) => {
  clients = clients.map(c =>
    c.id === id ? { ...c, ...data } : c
  );
  return Promise.resolve();
};

export const deleteClient = (id) => {
  clients = clients.filter(c => c.id !== id);
  return Promise.resolve();
};
