import React from "react";
import "../pages/page.css";
import { Text } from "@mantine/core";
import { collection, doc, getDocs } from "firebase/firestore";
import getData from "@/firebase/firestore/getData";

// // Header component
export default async function LoadMessages() {
  // ScamItem component
  type ScamItemProps = {
    id: string;
    date: Date;
    message: string;
    category: string;
    platform: string;
    submissions: string;
  };

  const ScamItem = ({
    id,
    date,
    message,
    category,
    platform,
    submissions,
  }: ScamItemProps) => (
    <div className="scam-item">
      <div className="id">{id}</div>
      <div className="date">{date}</div>
      <div className="message">{message}</div>
      <div className="category">{category}</div>
      <div className="platform">{platform}</div>
      <div className="submissions">{submissions} Submissions</div>
    </div>
  );

  console.log("handleform");

  const { result, error } = await getData("messages");

  if (error) {
    console.log(error);
  }
  console.log("result: ", result);

  // const itemsList = result.map((scam, index) => {
  //   return <ScamItem key={index} {...scam} />;
  // });
  // return itemsList;

  // return in JSON format for getServerSideProps
  return JSON.stringify(result);

  //   const scams = [
  //     {
  //       date: "xx.xx.xxxx",
  //       message:
  //         "DBS Alert: Your DBS card has been flagged for fraud. You must reactivate your card at https://dbs.bank.com or face a $10,000 fine",
  //       category: "Phishing",
  //       platform: "SMS",
  //       submissions: "86",
  //     },
  //     {
  //       date: "xx.xx.xxxx",
  //       message:
  //         "Tingkat Delivery Service: Cheap, healthy tingkat meals from $3/pax. Download our app at https://tingkat-delivery-hero.com/android.v1.23.apk",
  //       category: "Malware",
  //       platform: "Whatsapp",
  //       submissions: "23",
  //     },
  //     // ... more scams
  //   ];
}
