import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function DashboardChart({ monthlyRevenue, revenueByService }) {
  /* ===== Monthly Revenue ===== */
  const monthlyData = {
    labels: monthlyRevenue.map((m) => m.month),
    datasets: [
      {
        label: "Revenue (€)",
        data: monthlyRevenue.map((m) => m.total),
        backgroundColor: "#2563eb",
        borderRadius: 6,
      },
    ],
  };

  /* ===== Revenue per Service ===== */
  const serviceData = {
    labels: revenueByService.map((s) => s.name),
    datasets: [
      {
        label: "Revenue (€)",
        data: revenueByService.map((s) => s.total),
        borderColor: "#0f172a",
        backgroundColor: "rgba(15,23,42,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: { color: "#64748b" },
      },
      x: {
        ticks: { color: "#64748b" },
      },
    },
  };

  return (
    <div className="dashboard-charts">
      <div className="chart-card">
        <h3>Revenu mensuel</h3>
        <Bar data={monthlyData} options={options} />
      </div>

      <div className="chart-card">
        <h3>Revenu par service</h3>
        <Line data={serviceData} options={options} />
      </div>
    </div>
  );
}
