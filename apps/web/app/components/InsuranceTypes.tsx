"use client";

import { FaShieldAlt, FaCoins, FaChartLine } from "react-icons/fa";

const insuranceTypes = [
  { id: "LOAN", name: "Loan Insurance", icon: FaCoins, color: "text-blue-400" },
  { id: "THRESHOLD", name: "Threshold Insurance", icon: FaShieldAlt, color: "text-green-400" },
  { id: "SUDDEN_DROP", name: "Sudden Drop Insurance", icon: FaChartLine, color: "text-yellow-400" },
];

const InsuranceTypes: React.FC = () => {
  return (
    <div className="backdrop-blur-md bg-gray-800 bg-opacity-10 ml-8 p-5 rounded-3xl shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 shadow-inner shadow-blue-500/50"></div>
      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-300 text-center border border-blue-300 rounded-lg py-2">
          Insurance Types
        </h2>
        <ul className="space-y-3 text-gray-400 text-sm">
          {insuranceTypes.map((type) => (
            <li key={type.id} className="flex items-start">
              <span
                className={`w-8 h-8 mr-3 ${type.color} bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center`}
              >
                <type.icon className={`${type.color} text-lg`} />
              </span>
              <div>
                <h3 className="font-semibold text-base">{type.name}</h3>
                <p className="text-sm text-gray-400">
                  {type.id === "LOAN" && "Protects against price drops below a specified loan threshold."}
                  {type.id === "THRESHOLD" && "Triggers when the asset price falls below a set threshold."}
                  {type.id === "SUDDEN_DROP" && "Activates if there's a sudden significant price drop within 24 hours."}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsuranceTypes;
