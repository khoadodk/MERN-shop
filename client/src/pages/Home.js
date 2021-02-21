import React from "react";

import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import InfoBanner from "../components/home/InfoBanner";
import Hero from "../components/home/Hero";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div>
      <InfoBanner
        text={[
          "25% off with coupon FIRSTORDER.",
          "New products every month.",
          "Follow us on social media.",
        ]}
      />
      <Hero />

      <h4 className="py-3 my-5 display-3 text-center text-secondary">
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className="py-3 my-5 display-3 text-center text-secondary">
        New Arrivals
      </h4>
      <NewArrivals />

      <Footer />
    </div>
  );
};

export default Home;
