"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "hour",
        stepSize: 6,
        displayFormats: {
          hour: "HH:mm",
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
        callback: function (value, index, ticks) {
          if (index === 0) {
            return format(new Date(value), "MMM d");
          }
          return format(new Date(value), "HH:mm");
        },
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "rgba(255, 255, 255, 0.9)",
      },
    },
    tooltip: {
      callbacks: {
        title: (context) => {
          const date = new Date(context[0].parsed.x);
          return date.toLocaleString();
        },
      },
    },
  },
};

const CryptoChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    datasets: [
      {
        label: "Ethereum Price (USD)",
        data: [],
        borderColor: "#00FFFF",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Bitcoin Price (USD)",
        data: [],
        borderColor: "#FF5733",
        tension: 0.1,
        fill: false,
      },
    ],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ethereumResponse, bitcoinResponse] = await Promise.all([
          axios.get(
            "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
          ),
          axios.get(
            "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
          ),
        ]);

        const ethereumPrices = ethereumResponse.data.prices;
        const bitcoinPrices = bitcoinResponse.data.prices;

        setChartData({
          datasets: [
            {
              ...chartData.datasets[0],
              data: ethereumPrices.map((price: number[]) => ({
                x: price[0],
                y: price[1],
              })),
            },
            {
              ...chartData.datasets[1],
              data: bitcoinPrices.map((price: number[]) => ({
                x: price[0],
                y: price[1],
              })),
            },
          ],
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to fetch cryptocurrency data. Please try again later."
        );
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CryptoChart;
