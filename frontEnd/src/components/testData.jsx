export const admins = [
    {
      id: "ADM-001",
      nomComplet: "Hamza Nadi",
      e_mail: "hamza.admin@gym.ma",
      password: "password123",
      statut: "admin"
    }
]
export const agents = [
    {
      id: "AGT-1",
      nomComplet: "Sara Bennani",
      e_mail: "sara.agent@gym.ma",
      password: "password123",
      statut: "agent"
    },
    {
      id: "AGT-2",
      nomComplet: "Karim Alami",
      e_mail: "karim.a@gym.ma",
      password: "password123",
      statut: "agent"
    }
  ]
export const clients = [
    {
      id: "CLT-1",
      nomComplet: "Yassine Mansouri",
      e_mail: "yassine.m@gmail.com",
      
      statut: "client",
      created_at: "2026-02-10",
      agent_id : "AGT-2"
    },
    {
      id: "CLT-2",
      nomComplet: "Amal Idrissi",
      e_mail: "amal.id@outlook.com",
      
      statut: "client",
      created_at: "2026-01-15",
      agent_id : "AGT-2"
    },
    {
      id: "CLT-3",
      nomComplet: "Omar Tazi",
      e_mail: "omar.tazi@gmail.com",
      
      statut: "client",
      created_at: "2026-02-01",
      agent_id : "AGT-1"
    }
  ]

export const abonnements = [
  {
    id: "SUB-101",
    clientId: "CLT-2", 
    serviceId: "SRV-MUSC", // Link to Musculation
    type: "Premium",
    prix: 500,
    dateDebut: "2026-01-15",
    dateFin: "2026-07-15",
    statut: "actif"
  },
  {
    id: "SUB-102",
    clientId: "CLT-1",
    serviceId: "SRV-CARDIO", // Link to Cardio
    type: "Basique",
    prix: 250,
    dateDebut: "2026-02-01",
    dateFin: "2026-03-01",
    statut: "expiré"
  },
  {
    id: "SUB-103",
    clientId: "CLT-2",
    serviceId: "SRV-POOL", // Link to Piscine
    type: "Gold",
    prix: 800,
    dateDebut: "2026-02-10",
    dateFin: "2026-08-10",
    statut: "actif"
  },
  {
    id: "SUB-104",
    clientId: "CLT-3",
    serviceId: "SRV-YOGA", // Link to Yoga
    type: "Standard",
    prix: 350,
    dateDebut: "2026-01-20",
    dateFin: "2026-02-20",
    statut: "en attente"
  },
  {
    id: "SUB-105",
    clientId: "CLT-2",
    serviceId: "SRV-MMA", // Link to Combat Sports
    type: "Premium",
    prix: 600,
    dateDebut: "2026-02-13",
    dateFin: "2026-05-13",
    statut: "actif"
  },
  {
    id: "SUB-106",
    clientId: "CLT-1",
    serviceId: "SRV-MUSC",
    type: "Basique",
    prix: 250,
    dateDebut: "2025-11-01",
    dateFin: "2025-12-01",
    statut: "expiré"
  }
];

export const services = [
  { 
    id: "SRV-MUSC", 
    nom: "Musculation & Cardio", 
    description: "Accès complet aux équipements de force.",
    prixBase: "300 DH" 
  },
  { 
    id: "SRV-WIFI", 
    nom: "Fibre Optique / WiFi", 
    description: "Connexion internet haut débit.",
    prixBase: "50 DH" 
  },
  { 
    id: "SRV-SPA", 
    nom: "Espace Détente (Spa)", 
    description: "Accès au Sauna et Hammam.",
    prixBase: "150 DH" 
  },
  { 
    id: "SRV-LOCK", 
    nom: "Vestiaires Privés", 
    description: "Casier personnel réservé.",
    prixBase: "100 DH" 
  }
];