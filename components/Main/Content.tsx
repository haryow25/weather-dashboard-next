"use client";
import React, { useState, useEffect } from "react";
import BotContent from "./BotContent";
import TopContent from "./TopContent";
import Header from "../Header/Header";

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
