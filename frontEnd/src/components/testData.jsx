export const admins = [
    {
      id: "ADM-001",
      nomComplet: "Hamza Nadi",
      e_mail: "hamza.admin@gym.ma",
      password: "password123", // In real apps, this would be a hash
      statut: "admin"
    }
]
export const agents = [
    {
      id: "AGT-101",
      nomComplet: "Sara Bennani",
      e_mail: "sara.agent@gym.ma",
      password: "password123",
      statut: "agent"
    },
    {
      id: "AGT-102",
      nomComplet: "Karim Alami",
      e_mail: "karim.a@gym.ma",
      password: "password123",
      statut: "agent"
    }
  ]
export const clients = [
    {
      id: "CLT-201",
      nomComplet: "Yassine Mansouri",
      e_mail: "yassine.m@gmail.com",
      password: "password123",
      statut: "client",
      created_at: "2026-02-10",
      agent_id : "AGT-102"
    },
    {
      id: "CLT-202",
      nomComplet: "Amal Idrissi",
      e_mail: "amal.id@outlook.com",
      password: "password123",
      statut: "client",
      created_at: "2026-01-15",
      agent_id : "AGT-102"
    },
    {
      id: "CLT-203",
      nomComplet: "Omar Tazi",
      e_mail: "omar.tazi@gmail.com",
      password: "password123",
      statut: "client",
      created_at: "2026-02-01",
      agent_id : "AGT-101"
    }
  ]