"use client";
import React, { useState } from "react";
import "./page.css";
import { Badge, Input, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import getData from "@/firebase/firestore/getData";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from Firebase API
  const { result, error } = await getData("messages");

  if (error) {
    console.log(error);
  }
  console.log("result: ", result);

  // convert to JSON format
  const data = JSON.stringify(result);

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

  // This component will be used to display each scam message in the list
  // It will receive props from the parent component
  // It will render the scam item based on the props it receives
  // It will also highlight the field that is being sorted on based on the activeSortField prop
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
          <div className="id-text">
            Scammer:<span className="id">{id}</span>
          </div>
        </div>

        <div className="content-container">
          <div className="message-box">
            <div className="message">{message}</div>
          </div>
          <div className="date">{date}</div>
        </div>

        <div className="details">
          <Badge
            className={`${
              activeSortField === "category" ? "highlight" : "category"
            }`}
            gradient={{
              from: "teal",
              to: "cyan",
              deg: 30,
            }}
          >
            {category}
          </Badge>
          <Badge
            className={`${
              activeSortField === "platform" ? "highlight" : "platform"
            }`}
          >
            {platform}
          </Badge>
          <Badge
            className={`${
              activeSortField === "submissions" ? "highlight" : "submissions"
            }`}
          >
            {submissions} Submissions
          </Badge>
        </div>
      </div>
    );
  };

  //console.log("flag data", data);
  const scamsArray = JSON.parse(data);
  //console.log("flag 2", scamsArray);
  // Describe what itemsList is
  // It is an array of JSX elements
  // Each JSX element is a ScamItem component
  // Each ScamItem component will receive props from the parent component
  // {...scam} is a spread operator, it spreads the scam object into individual props for the ScamItem component
  const itemsList = JSON.parse(data).map((scam, index) => {
    console.log(scam, index);
    return <ScamItem key={index} {...scam} />;
  });

  // useState is a React hook that allows us to dynamically update the state of a component based on user interactions
  // For example, "setScams" is a function that will update the order of the "scams" array when the user sorts it
  // useState takes in the initial value of the state variable as "scamsArray"
  const [scams, setScams] = useState(scamsArray);

  const [sortKey, setSortKey] = useState("");

  const [activeSortField, setActiveSortField] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // A function to sort scams based on the provided key that user clicks on
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

  // Return the HTML and JSX elements to be rendered on the page
  return (
    <div className="home">
      <Header />
      <div className="content-wrapper">
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
        <Input
          placeholder="Search for a scammer or scam message"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <div className="scam-list">
          {scams
            .filter(
              (scam) =>
                scam.id.includes(searchTerm) ||
                scam.message.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((scam, index) => (
              // <ScamItem key={index} {...scam} />
              <ScamItem
                key={index}
                {...scam}
                activeSortField={activeSortField}
              />
            ))}
          {/* ).map((scam, index) => (
            // <ScamItem key={index} {...scam} />
            <ScamItem key={index} {...scam} activeSortField={activeSortField} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

// enable search
// better phrasing/wording
