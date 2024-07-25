
import CreatePolicyForm from "../../components/CreatePolicyForm";
import InsuranceTypes from "../../components/InsuranceTypes";
import ActivePolicies from "../../components/ActivePolicies";
import TriggerCheckPrice from "@/app/components/TriggerCheckPrice";
import LatestPriceChecker from "@/app/components/LatestPriceChecker";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen w-full relative p-6 overflow-hidden">
      
      <div className="relative z-10 flex flex-col max-w-5xl mx-auto">
          <LatestPriceChecker />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CreatePolicyForm />
          <InsuranceTypes />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ActivePolicies />
          <TriggerCheckPrice />
        </div>
      </div>
    </div>
  );
}
