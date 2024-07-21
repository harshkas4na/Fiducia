"use client";
import CreatePolicyForm from "../../components/CreatePolicyForm";
import InsuranceTypes from "../../components/InsuranceTypes";
import ActivePolicies from "../../components/ActivePolicies";
import TriggerCheckPrice from "@/app/components/TriggerCheckPrice";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen w-full relative p-6 overflow-hidden">
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="relative z-10 flex flex-col max-w-5xl mx-auto">
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
