import { servicesMock } from "../mocks/services";

let services = [...servicesMock];

export const getServices = () =>
  Promise.resolve({ data: services });

export const addService = (service) => {
  const newService = {
    ...service,
    id: Date.now().toString(),
  };
  services.push(newService);
  return Promise.resolve({ data: newService });
};

export const updateService = (id, data) => {
  services = services.map((s) =>
    s.id === id ? { ...s, ...data } : s
  );
  return Promise.resolve();
};

export const deleteService = (id) => {
  services = services.filter((s) => s.id !== id);
  return Promise.resolve();
};
