import React from "react";
import Typewriter from "typewriter-effect";

const InfoBanner = ({ text }) => {
  return (
    <div className="info-banner">
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default InfoBanner;
