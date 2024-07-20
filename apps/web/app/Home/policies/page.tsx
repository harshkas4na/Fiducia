"use client";
import AnimateBackground from '../../components/AnimateBackground';
import CreatePolicyForm from '../../components/CreatePolicyForm';
import InsuranceTypes from '../../components/InsuranceTypes';
import ActivePolicies from '../../components/ActivePolicies';

export default function PoliciesPage() {
  const handleCreatePolicy = (policy: any) => {
    console.log("Creating policy:", policy);
  };

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
      <AnimateBackground />
      <div className="relative z-10 flex flex-col max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Crypto Insurance Policies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CreatePolicyForm onCreatePolicy={handleCreatePolicy} />
          <InsuranceTypes />
        </div>
        <ActivePolicies />
      </div>
    </div>
  );
}
