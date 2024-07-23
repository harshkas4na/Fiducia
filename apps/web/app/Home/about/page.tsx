// Home/about.tsx

import Head from "next/head";
import AboutContent from "../../components/AboutContent";
import TeamSection from "../../components/TeamSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative p-6 overflow-hidden opacity-90 -z-50 text-white">
      <Head>
        <title>About Fiducia - Split Funds Smart</title>
        <meta
          name="description"
          content="Learn about Fiducia, the innovative DApp for crypto asset protection and collaborative investing."
        />
      </Head>

      <div className="relative z-10 flex flex-col max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          About Fiducia
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AboutContent />
          <TeamSection />
        </div>
      </div>
    </div>
  );
}
