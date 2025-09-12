import React from "react";
import Footer from "../component/Footer/Footer";

const SystemRequirementPage: React.FC = () => {
  return (
    <div className="bg-[#d7b777] min-h-screen text-white flex flex-col items-start">
      <h1 className="text-4xl mt-10 font-bold text-orange-600 mb-12 text-center w-full">
        &gt;&gt; SYSTEM REQUIREMENTS &lt;&lt;
      </h1>

      <main className="flex-1 w-full max-w-4xl ml-10 py-12 px-4">
        {/* Combined Requirements Section */}
        <section className="bg-[#333] text-green-400 p-8 rounded-lg shadow-2xl w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b-2 border-gray-500">
                  <th className="w-1/4 py-3 px-4 text-2xl font-bold">
                    Category
                  </th>
                  <th className="w-1/4 py-3 px-4 text-2xl font-bold">
                    &gt; MINIMUM &lt;
                  </th>
                  <th className="w-1/2 py-3 px-4 text-2xl font-bold">
                    &gt;&gt; RECOMMENDED &lt;&lt;
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="py-4 px-4 font-bold">OS</td>
                  <td className="py-4 px-4">Windows 10 (64-bit)</td>
                  <td className="py-4 px-4">Windows 10 (64-bit)</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-4 px-4 font-bold">Processor</td>
                  <td className="py-4 px-4">
                    AMD Athlon64 3000+ @ 1.8 GHz or Intel Pentium IV 630 @ 3.0
                    GHz
                  </td>
                  <td className="py-4 px-4">
                    AMD Athlon64 X2 3800+ or Intel Core 2 Duo E4400
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-4 px-4 font-bold">RAM</td>
                  <td className="py-4 px-4">2 GB</td>
                  <td className="py-4 px-4">4 GB</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-4 px-4 font-bold">Video card</td>
                  <td className="py-4 px-4">
                    AMD Radeon HD 2900 XT / NVIDIA GeForce 9800 GT
                  </td>
                  <td className="py-4 px-4">
                    AMD Radeon HD 3650 / NVIDIA GeForce 9600 GT
                  </td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-4 px-4 font-bold">DirectX</td>
                  <td className="py-4 px-4">June 2010</td>
                  <td className="py-4 px-4">June 2010</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Storage</td>
                  <td className="py-4 px-4">2 GB available</td>
                  <td className="py-4 px-4">2 GB available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SystemRequirementPage;
