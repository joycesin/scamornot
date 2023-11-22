"use client";
import React from "react";
import { Suspense } from "react";
import "./page.css";
import { Text } from "@mantine/core";
import { collection, doc, getDocs } from "firebase/firestore";
import getData from "@/firebase/firestore/getData";
import LoadMessages from "../components/LoadMessages";

const Home = () => {
  const Header = () => (
    <div>
      <div>
        <Text
          size="xl"
          weight={700}
          p={10}
          align={"center"}
          className="font-extrabold cursor-pointer"
          variant="gradient"
        >
          Recognize Common Scams!
        </Text>
        <Text size="md" align={"center"}>
          10,001 crowdsourced scam messages
        </Text>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <section>
        <Suspense fallback={<p>Loading feed...</p>}>
          <LoadMessages />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;

// TODO: category and platform disallow default value
// make date datetime format from current time, don't require user to enter
// mantine table for sorting
// better phrasing/wording
