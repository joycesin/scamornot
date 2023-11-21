"use client";
import React from "react";
import "./page.css";
import { Text } from "@mantine/core";

// Header component
const Header = () => (
  <div>
    {/* <div className="header">
      <div className="subtitle">Recognize Common Scams!</div>
      <div className="scam-count">10,001 crowdsourced scam messages</div>
    </div> */}
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

// ScamItem component
const ScamItem = ({ date, message, category, platform, submissions }) => (
  <div className="scam-item">
    <div className="date">{date}</div>
    <div className="message">{message}</div>
    <div className="category">{category}</div>
    <div className="platform">{platform}</div>
    <div className="submissions">{submissions} Submissions</div>
  </div>
);

// Home component
const Home = () => {
  // Example data for scams
  const scams = [
    {
      date: "xx.xx.xxxx",
      message:
        "DBS Alert: Your DBS card has been flagged for fraud. You must reactivate your card at https://dbs.bank.com or face a $10,000 fine",
      category: "Phishing",
      platform: "SMS",
      submissions: "86",
    },
    {
      date: "xx.xx.xxxx",
      message:
        "Tingkat Delivery Service: Cheap, healthy tingkat meals from $3/pax. Download our app at https://tingkat-delivery-hero.com/android.v1.23.apk",
      category: "Malware",
      platform: "Whatsapp",
      submissions: "23",
    },
    // ... more scams
  ];

  return (
    <div className="home">
      <Header />
      <div className="scam-list">
        {scams.map((scam, index) => (
          <ScamItem key={index} {...scam} />
        ))}
      </div>
    </div>
  );
};

export default Home;
