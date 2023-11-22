"use client";
import React, { useState } from "react";
import { use } from "react";
import { Suspense } from "react";
import "./page.css";
import { Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { collection, doc, getDocs } from "firebase/firestore";
import getData from "@/firebase/firestore/getData";
import LoadMessages from "../components/LoadMessages";
import TableMui from "../components/TableMui";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a theme
const theme = createTheme();

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
          {itemsList.length} crowdsourced scam messages
        </Text>
      </div>
    </div>
  );

  const ScamItem = ({
    id,
    date,
    message,
    category,
    platform,
    submissions,
    activeSortField,
  }) => {
    console.log("scamitem activesortfield", activeSortField);
    return (
      <div className="scam-item">
        <div className="id-container">
          <div>Scammer:</div>
          <div className="id">{id}</div>
        </div>

        <div className="content-container">
          <div className="message-box">
            <div className="message">{message}</div>
          </div>
          <div className="date">{date}</div>
        </div>

        <div className="details">
          <div
            className={`category ${
              activeSortField === "category" ? "highlight" : ""
            }`}
          >
            {category}
          </div>
          <div
            className={`platform ${
              activeSortField === "platform" ? "highlight" : ""
            }`}
          >
            {platform}
          </div>
          <div
            className={`submissions ${
              activeSortField === "submissions" ? "highlight" : ""
            }`}
          >
            {submissions} Submissions
          </div>
        </div>
      </div>
    );
  };

  console.log("flag data", data);
  const scamsArray = JSON.parse(data);
  console.log("flag 2", scamsArray);
  const itemsList = JSON.parse(data).map((scam, index) => {
    console.log(scam, index);
    return <ScamItem key={index} {...scam} />;
  });

  const [scams, setScams] = useState(scamsArray);

  const [sortKey, setSortKey] = useState("");

  const [activeSortField, setActiveSortField] = useState("");

  // A function to sort scams based on the provided key
  const sortScams = (key) => {
    setActiveSortField(key);
    console.log("activesortfield:", activeSortField);
    setSortKey(key);
    setScams(
      scams.slice().sort((a, b) => {
        // For sorting numbers correctly
        if (key === "submissions") {
          return b[key] - a[key];
        }
        // For sorting strings alphabetically
        return a[key].localeCompare(b[key]);
      })
    );
  };

  return (
    <div className="home">
      <Header />
      <div>
        <div className="sort-options">
          {/* <Button onClick={() => sortScams("date")} variant="light">
            Sort by Date
          </Button> */}
          <Button onClick={() => sortScams("category")} variant="light">
            Sort by Category
          </Button>
          <Button onClick={() => sortScams("platform")} variant="light">
            Sort by Platform
          </Button>
          <Button onClick={() => sortScams("submissions")} variant="light">
            Sort by Submissions
          </Button>
        </div>
        <div className="scam-list">
          {scams.map((scam, index) => (
            // <ScamItem key={index} {...scam} />
            <ScamItem key={index} {...scam} activeSortField={activeSortField} />
          ))}
        </div>
      </div>
    </div>
  );
}

// enable search
// better phrasing/wording
