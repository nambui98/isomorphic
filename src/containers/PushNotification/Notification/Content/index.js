import React from "react";
import { Noti } from "./Noti";
import { Target } from "./Target";
import { Scheduling } from "./Scheduling";
import { Additional } from "./Additional";

export default function Content({ currentStep }) {
  switch (currentStep) {
    case 0:
      return <Noti />;
    case 1:
      return <Target />;
    case 2:
      return <Scheduling />;
    case 3:
      return <Additional />;
    default:
      return null;
  }
}
