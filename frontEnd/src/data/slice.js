import { createSlice } from "@reduxjs/toolkit";
import { agents, clients, admins, abonnements, services } from "../components/testData";

const SubSlice = createSlice({
    name: "Subs",
    initialState: {
        agents: agents,
        clients: clients,
        admins: admins,
        abonnements: abonnements,
        services: services,
        userLoged: null
    },
    reducers: {
        addAgent: (state, action) => {
            state.agents.push(action.payload);
        },
        addClient: (state, action) => {
            state.clients.push(action.payload);
        },
        delAgent: (state, action) => {
            state.agents = state.agents.filter(x => x.id !== action.payload);
        },
        delClient: (state, action) => {
            state.clients = state.clients.filter(x => x.id !== action.payload);
        },
        updateUser: (state, action) => {
            const { id, updatedData, statut } = action.payload;
            if (statut === 'client') {
                const index = state.clients.findIndex(c => c.id === id);
                if (index !== -1) state.clients[index] = { ...state.clients[index], ...updatedData };
            } else {
                const index = state.agents.findIndex(a => a.id === id);
                if (index !== -1) state.agents[index] = { ...state.agents[index], ...updatedData };
            }
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        delService: (state, action) => {
            state.services = state.services.filter(s => s.id !== action.payload);
        },
        updateService: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.services.findIndex(s => s.id === id);
            if (index !== -1) state.services[index] = { ...state.services[index], ...updatedData };
        },
        addAbonnement: (state, action) => {
            state.abonnements.push(action.payload);
        },
        delAbonnement: (state, action) => {
            state.abonnements = state.abonnements.filter(a => a.id !== action.payload);
        },
        updateAbonnement: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.abonnements.findIndex(a => a.id === id);
            if (index !== -1) state.abonnements[index] = { ...state.abonnements[index], ...updatedData };
        },
        setLogin: (state, action) => {
            state.userLoged = action.payload;
        },
        logout: (state) => {
            state.userLoged = null;
        }
    }
});

export default SubSlice.reducer;
export const {
    addAgent, addClient, delAgent, delClient, updateUser,
    addService, delService, updateService,
    addAbonnement, delAbonnement, updateAbonnement,
    setLogin, logout
} = SubSlice.actions;