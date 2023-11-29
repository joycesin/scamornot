import React from "react";
import "../pages/page.css";
import getData from "@/firebase/firestore/getData";

export default async function loadMessages() {
  console.log("handleform");

  const { result, error } = await getData("messages");

  if (error) {
    console.log(error);
  }
  console.log("result: ", result);

  // return in JSON format for getServerSideProps
  return JSON.stringify(result);
}
