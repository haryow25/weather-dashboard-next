"use client";
import React, { useState, useEffect } from "react";
import { BotContent } from "../Templates/BotContent";
import { TopContent } from "../Templates/TopContent";
import { Header } from "../Organisms/Header";

// Explicitly define the type of the state variables
const Content = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="main-wrapper ">
      <Header />
      <TopContent />
      <BotContent />
    </div>
  );
};

export default Content;
