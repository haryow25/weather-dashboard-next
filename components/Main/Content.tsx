"use client";
import React, { useState, useEffect } from "react";
import BotContent from "./BotContent";
import TopContent from "./TopContent";

// Explicitly define the type of the state variables
const Content = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="main-wrapper ">
      <TopContent />
      <BotContent />
    </div>
  );
};

export default Content;
