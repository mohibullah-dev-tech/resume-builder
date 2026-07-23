import React from "react";
import HERO_IMG from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [currentAuthTab, setCurrentAuthTab] = React.useState("login");
  const handleCTA = () => {
    setOpenAuthModal(true);
    setCurrentAuthTab("signup");
  };

  return (
    <div className="w-full min-h-full bg-white pb-48 ">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-16">
          <div className="text-xl font-bold">Resume Builder</div>
          <button
            className="bg-purple-100 text-sm font-semibold px-7 py-2.5 rounded-lg hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModal(true)}
          >
            Login/Sign Up
          </button>
        </header>
        {/* hero content */}
        <div className="flex flex-col md:flex-row items-center ">
          <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)] bg-size-[200%_200%] animate-text-shine">
                Professional Resume in Minutes.
              </span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 ">
              Craft ATS-friendly resumes with beautiful templates, AI-powered
              suggestions, and one-click PDF export. Land your dream job faster.
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2 ">
            <img src={HERO_IMG} alt="hero" className="w-full rounded-lg" />
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Features That Make You Shine.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
              Update your resume sections with live preview and instant formatting.
              </p>
            </div>

             <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition ">
              <h3 className="text-lg font-semibold mb-3">
                AI-Powered Suggestions
              </h3>
              <p className="text-gray-600">
                Choose from modern, professional template that are easy to
                customize.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition ">
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                
                Download your resume instantly as a quality pdf with one click.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
