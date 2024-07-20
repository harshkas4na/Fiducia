// components/WithdrawButton.tsx

"use client";

const WithdrawButton = ({ handleWithdraw }: { handleWithdraw: () => void }) => {
  return (
    <button
      onClick={handleWithdraw}
      className="w-40 bg-transparent border-2 border-red-400 text-red-400 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm relative overflow-hidden group"
    >
      <span className="relative z-10 text-slate-50">Withdraw Shares</span>
      <div className="absolute inset-0 bg-red-400 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(74,222,128,0.5)] group-hover:shadow-[inset_0_0_15px_rgba(74,222,128,0.7)] transition-shadow duration-300"></div>
    </button>
  );
};

export default WithdrawButton;
