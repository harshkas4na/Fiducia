
import ContributionsSection from "../../components/ContributionsSection";
import WalletOverviewSection from "../../components/WalletOverviewSection";
import WithdrawFundsSection from "../../components/WithdrawFundsSection";


export default function ShareholdingsPage() {
  
  

  
  return (
    <div className="h-full w-full relative flex flex-col">
      
      <div className="relative z-10 flex-grow flex flex-col">
        <h1 className="text-3xl font-bold mt-8 mb-6 text-center text-white">
          Your Shareholdings
        </h1>

        <div className="flex-grow flex flex-col lg:flex-row justify-start items-start gap-6 gap-x-14 mb-8">
          <ContributionsSection />
          <WalletOverviewSection />
        </div>

        <WithdrawFundsSection  />
      </div>
    </div>
  );
}
