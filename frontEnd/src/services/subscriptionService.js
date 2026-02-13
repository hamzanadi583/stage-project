// 🔹 Mock subscriptions data

const subscriptions = [
  {
    id: 1,
    client: { id: 1, nomComplet: "Ahmed Ali" },
    service: { id: 1, nom: "Internet Premium" },
    prix: 50,
    status: "Actif",
    startDate: "2025-01-10",
  },
  {
    id: 2,
    client: { id: 2, nomComplet: "Sara Mohamed" },
    service: { id: 1, nom: "Internet Premium" },
    prix: 50,
    status: "Actif",
    startDate: "2025-02-05",
  },
  {
    id: 3,
    client: { id: 1, nomComplet: "Ahmed Ali" },
    service: { id: 2, nom: "TV Package" },
    prix: 30,
    status: "Suspendu",
    startDate: "2024-12-01",
  },
];

// 🔹 Subscriptions by Service
export const getSubscriptionsByService = async (serviceId) => {
  return {
    data: subscriptions.filter(
      (s) => s.service.id === serviceId
    ),
  };
};

// 🔹 Subscriptions by Client
export const getSubscriptionsByClient = async (clientId) => {
  return {
    data: subscriptions.filter(
      (s) => s.client.id === clientId
    ),
  };
};
