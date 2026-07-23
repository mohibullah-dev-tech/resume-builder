import React from "react";
import HERO_IMG from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-16">
          <div className="text-xl-font-bold">Resume Builder</div>
          <button
            className="bg-purple-100 text-5m font-semibold px-7 py-2.5 rounded-lg hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login/sign Up
          </button>
        </header>
      </div>
    </div>
  );
};

export default LandingPage;
