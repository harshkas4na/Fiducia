
import ContributionForm from '../../components/ContributionForm';
import ContributionBenefits from '../../components/ContributionBenefits';

import AnimateBackground from '@/app/components/AnimateBackground';
import Timer from '../../components/Timer';



export default function ContributePage() {
  const minimumContribution = "0.001";

  

  return (
    <div className="h-full w-full relative">
      <div className="contribute-bg absolute -inset-5 bg-gradient-to-br from-blue-900 to-black opacity-50 rounded-full"></div>
      <div className="relative z-10 gap-24 h-full flex flex-col">
        <h1 className="text-3xl font-bold mt-8 mb-6 text-center text-white">
          Contribute to Fiducia
        <Timer  />
        </h1>

        <div className="flex-grow flex flex-col lg:flex-row justify-start items-start gap-6 gap-x-80">
          <AnimateBackground/>
          <ContributionForm minimumContribution={minimumContribution} />
          <ContributionBenefits />
        </div>
      </div>
    </div>
  );
}
