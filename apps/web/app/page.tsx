
import Head from "next/head";
import Spline from "@splinetool/react-spline/next";
import ConnectWallet from "./components/connectWallet";


const Home: React.FC = () => {
  
  

  

  return (
    <div className="h-screen bg-gray-900 flex flex-col text-white overflow-hidden relative">
      <Head>
        
        <style>{
          `
          ::-webkit-scrollbar {
            display: none;
          }
          html, body {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          @keyframes shimmer {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          `
        }</style>
      </Head>

      <main className="flex-grow flex items-center justify-center w-full">
        <Spline scene="https://prod.spline.design/fInhCGXNhH2TQe16/scene.splinecode" />
      </main>

      <ConnectWallet/>

      <footer className="absolute bottom-0 w-full p-4 text-center text-gray-200 bg-gray-800 bg-opacity-10">
        <p>&copy; 2024 Fiducia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;