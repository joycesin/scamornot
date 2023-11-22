"use client";
import React from "react";
import { use } from "react";
import { Suspense } from "react";
import "./page.css";
import { Text } from "@mantine/core";
import { collection, doc, getDocs } from "firebase/firestore";
import getData from "@/firebase/firestore/getData";
import LoadMessages from "../components/LoadMessages";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from Firebase API

  const data = await LoadMessages();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
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

  const ScamItem = ({ date, message, category, platform, submissions }) => (
    <div className="scam-item">
      <div className="date">{date}</div>
      <div className="message">{message}</div>
      <div className="category">{category}</div>
      <div className="platform">{platform}</div>
      <div className="submissions">{submissions} Submissions</div>
    </div>
  );
  console.log(data);
  const itemsList = JSON.parse(data).map((scam, index) => {
    //console.log(scam, index);
    return <ScamItem key={index} {...scam} />;
    // get the length of itemslist
  });

  return (
    <div>
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
            {itemsList.length} crowdsourced scam messages
          </Text>
        </div>
      </div>
      <div>{itemsList}</div>
    </div>
  );
}

// to do: category and platform disallow default value
// make date datetime format from current time, don't require user to enter
// mantine table for sorting
// better phrasing/wording
