import React from "react";
import CallToAction from "../UI/CallToAction";

const text = [
  "100% hand made",
  "natural materials",
  "free of chemicals",
  "free shipping",
];

const Hero = () => {
  return (
    <div className="hero container-fluid">
      <div className="hero__title">
        <h1>Naturize your home with </h1>
        <h1>our decors.</h1>
      </div>

      <CallToAction linkTo="/shop" text="shop now" />

      <div className="hero__info-card-container">
        {text.map((t, i) => (
          <div className="info-card" key={i++}>
            <p>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
