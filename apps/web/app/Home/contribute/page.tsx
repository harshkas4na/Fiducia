import ContributionForm from "../../components/ContributionForm";
import ContributionBenefits from "../../components/ContributionBenefits";
import Timer from "../../components/Timer";

export default function ContributePage() {
  const minimumContribution = "0.001";

  return (
    <div className="min-h-screen w-full p-6 overflow-hidden">
      <div className="contribute-bg absolute -inset-0 bg-gradient-to-br -z-40 from-blue-900 to-black opacity-20 rounded-es-full"></div>
      <h1 className="text-3xl font-bold mt-6 mb-6 text-center text-white">
        Contribute to Fiducia
      </h1>
      <div className="relative z-10 gap-12 h-full flex flex-col">
        <div className=" mb-20">
          <Timer />
        </div>

        <div className="flex-grow flex flex-col lg:flex-row justify-start items-start gap-x-60">
          <ContributionForm minimumContribution={minimumContribution} />
          <ContributionBenefits />
        </div>
      </div>
    </div>
  );
}
