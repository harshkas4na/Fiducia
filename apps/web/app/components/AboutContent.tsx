/* eslint-disable react/no-unescaped-entities */
// components/AboutContent.tsx

export default function AboutContent() {
  return (
    <div
      className="bg-transparent p-6 rounded-lg shadow-lg border border-blue-500 bg-opacity-10 backdrop-filter backdrop-blur-sm"
      style={{ boxShadow: "inset 0 0 20px rgba(0, 123, 255, 0.5)" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">
        Split Funds Smart
      </h2>
      <p className="mb-4">
        Fiducia redefines trust in decentralized finance, offering a
        groundbreaking platform that combines intelligent fund splitting with
        robust crypto insurance.
      </p>
      <h3 className="text-xl font-semibold mb-2 text-blue-300">
        Our Core Offerings:
      </h3>
      <ul className="list-disc list-inside mb-4 text-blue-200">
        <li>Crypto Insurance Shield</li>
        <li>Intelligent Multi-Party Wallet</li>
      </ul>
      <p className="text-gray-300">
        Whether you're seeking to shield your crypto investments or explore new
        avenues for growth, Fiducia provides the advanced tools and
        infrastructure needed to navigate the decentralized finance landscape
        with confidence and precision.
      </p>
    </div>
  );
}
