// Home/about.tsx

import Head from "next/head";
import Image from "next/image";

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

        <div
          className="bg-transparent p-6 rounded-3xl shadow-lg border border-blue-500 bg-opacity-10 backdrop-filter backdrop-blur-sm"
          style={{ boxShadow: "inset 0 0 20px rgba(0, 123, 255, 0.5)" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Split Funds Smart: Revolutionizing Decentralized Finance
          </h2>
          <p className="mb-4">
            Fiducia is a groundbreaking DApp that combines intelligent fund
            splitting with robust crypto insurance, redefining trust and
            collaboration in the decentralized finance landscape.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-blue-300">
            Key Features:
          </h3>
          <ul className="list-disc list-inside mb-4 text-blue-200">
            <li>Multi-Party Wallet for Collaborative Investing</li>
            <li>Crypto Insurance Shield</li>
            <li>MemeCoin Rewards System</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-blue-300">
            How It Works:
          </h3>
          <ol className="list-decimal list-inside mb-4 text-gray-300">
            <li>
              Contribute Ether to become a shareholder in the Multi-Party Wallet
            </li>
            <li>Earn MemeCoin rewards based on your contribution</li>
            <li>Collaborate with other investors to make group decisions</li>
            <li>Purchase insurance policies to protect your crypto assets</li>
            <li>
              Claim insurance payouts if market conditions meet policy criteria
            </li>
          </ol>

          <p className="mb-4 text-gray-300">
            Our Multi-Party Wallet allows users to pool funds, becoming
            shareholders with voting rights proportional to their contributions.
            The wallet features a minimum contribution requirement, closure
            time, and fair distribution of additional funds.
          </p>

          <p className="mb-4 text-gray-300">
            The Crypto Insurance component offers protection against market
            volatility. Users can purchase policies for various scenarios,
            including loan protection, threshold-based coverage, and sudden
            price drop insurance. Our smart contract system automatically
            processes claims when trigger conditions are met.
          </p>

          <p className="text-gray-300">
            Whether you are an individual investor looking to diversify risk or
            a group seeking to pool resources for larger opportunities, Fiducia
            provides the advanced tools and infrastructure needed to navigate
            the decentralized finance landscape with confidence and precision.
          </p>

          <div
            className="bg-transparent p-6 rounded-lg shadow-lg border border-blue-500 bg-opacity-10 backdrop-filter backdrop-blur-sm mt-6"
            style={{ boxShadow: "inset 0 0 20px rgba(0, 123, 255, 0.5)" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-300">
              Our Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center">
                <div
                  className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden relative"
                  style={{ boxShadow: "0 0 15px rgba(0, 123, 255, 0.7)" }}
                >
                  <Image
                    src="/prakhar.jpg"
                    alt="Prakhar Srivastava"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="font-semibold text-blue-300">
                  Prakhar Srivastava
                </h3>
                <p className="text-sm text-blue-200">Co-founder & Developer</p>
              </div>
              <div className="text-center">
                <div
                  className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden relative"
                  style={{ boxShadow: "0 0 15px rgba(0, 123, 255, 0.7)" }}
                >
                  <Image
                    src="/harsh.jpg"
                    alt="Harsh Kasana"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="font-semibold text-blue-300">Harsh Kasana</h3>
                <p className="text-sm text-blue-200">Co-founder & Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
