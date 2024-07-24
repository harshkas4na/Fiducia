
// "use client";

// import { useState, useEffect } from "react";


import WelcomeHeader from '../components/WelcomeHeader';
import PriceDisplay from '../components/PriceDisplay';
import AccountOverview from '../components/AccountOverview';


export default function HomePage() {
  
  

  return (
    <div className="relative flex flex-col h-full">
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
      <WelcomeHeader  />

        <div className="flex flex-1 px-8">
          <div className="flex-1 pr-8">
            <PriceDisplay />
          </div>

          <AccountOverview />
        </div>
      </div>
    </div>
  );
}