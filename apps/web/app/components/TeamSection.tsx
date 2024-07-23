// components/TeamSection.tsx

import Image from "next/image";

export default function TeamSection() {
  return (
    <div
      className="bg-transparent p-6 rounded-lg shadow-lg border border-blue-500 bg-opacity-20 backdrop-filter backdrop-blur-sm neon-glow"
      style={{ boxShadow: "inset 0 0 20px rgba(0, 123, 255, 0.5)" }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">Our Team</h2>
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
          <h3 className="font-semibold text-blue-300">Prakhar Srivastava</h3>
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
  );
}
