"use client";

import React, { useState } from "react";
import FirstIntro from "../components/AnimatedName";
import SecondIntro from "../components/AnimatedMenu";

const IntroSequence = () => {
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FirstIntro />
    </div>
  );
};

export default IntroSequence;
