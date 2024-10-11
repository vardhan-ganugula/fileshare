import React from "react";
import { Header,HomepageMain } from "../components";
function Homepage() {
  return (
    <>
      <div className="bg-white h-screen w-screen overflow-hidden">
        <Header />
        <HomepageMain />
      </div>
    </>
  );
}

export default Homepage;
