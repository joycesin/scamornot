"use client";
import { useState } from "react";
import "./contribute.css";
import { Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import updateData from "@/firebase/firestore/updateData";

const handleForm = async (formData) => {
  // Your code logic here

  console.log("handleform");
  // log formdata
  // const data = {
  //   date: "01.01.2023",
  //   message: "test scam message",
  //   category: "Phishing",
  //   platform: "SMS",
  // };
  const { result, error } = await addData("messages", formData);

  if (error) {
    console.log(error);
    alert(
      "There was an issue submitting your scam message, please try again later."
    );
    return console.log(error);
  }
  console.log("result: " + result);

  return result;
};

export default function Contribute() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");

  // use state of current date for date
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 10); // Extracts date part in YYYY-MM-DD format
  // Initialize state with the formatted current date
  const [date, setDate] = useState(formattedDate);
  // Initialize state with 0 submissions
  const [submissions, setSubmissions] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are selected
    if (id === "") {
      alert(
        "Please enter the scammer's mobile phone or username before submitting the form."
      );
      return;
    }
    if (message === "") {
      alert("Please enter the scam message before submitting the form.");
      return;
    }
    if (category === "") {
      alert("Please select a platform before submitting the form.");
      return;
    }
    if (platform === "") {
      alert("Please select a platform before submitting the form.");
      return;
    }

    const formData = {
      id,
      date,
      message,
      category,
      platform,
      submissions,
    };

    // Get data from Firebase to check whether message already exists
    // If message already exists, increment submissions by 1 in Firebase database
    // If message does not exist, add message to Firebase

    //const data = await loadMessages();

    const { result, error } = await getData("messages");

    if (error) {
      console.log(error);
    }
    console.log("result: ", result);

    // return in JSON format for getServerSideProps
    const data = JSON.stringify(result);

    console.log("formdata: ", formData);

    // Format data
    const scamsArray = JSON.parse(data);
    for (const scam of scamsArray) {
      console.log("flag 3", scam);
      if (scam.message === message) {
        // If message already exists, increment submissions by 1 in Firebase database
        // don't add a new message
        console.log("message already exists");
        const newSubmissions = scam.submissions + 1;
        const newFormData = {
          ...formData,
          submissions: newSubmissions,
        };
        console.log("newformdata: ", newFormData);
        console.log("scam.docId: ", scam.docId);
        const { result, error } = await updateData(
          "messages",
          newFormData,
          scam.docId
        );
        if (error) {
          console.log(error);
          alert(
            "There was an issue submitting your scam message, please try again later."
          );
          return console.log(error);
        }
        console.log("result: " + result);
        router.push("/");
        return;
      }
    }

    // Initialize the router

    try {
      const result = await handleForm(formData);
      console.log("result: ", result);
      console.log("route!");

      router.push("/");
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      <Text
        size={"lg"}
        weight={700}
        p={20}
        align={"center"}
        className="font-extrabold cursor-pointer"
        variant="gradient"
      >
        Received a scam message? Submit it here to raise awareness for scams!
      </Text>
      {/* <br>Share your scam messages to raise awareness for scams!</br> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Scammer Mobile Number / Username</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="9xxxxxxx / scammer123"
          />
        </div>
        <div>
          <label htmlFor="message">Scam Message Received</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Phishing">Phishing</option>
            <option value="Malware">Malware</option>
            <option value="Investment">Investment</option>
            <option value="Love Scam">Love Scam</option>
            <option value="Job Scam">Job Scam</option>
            {/* Add more categories as options here */}
          </select>
        </div>
        <div>
          <label htmlFor="platform">Platform</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select a platform</option>
            <option value="SMS">SMS</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="WeChat">WeChat</option>
            <option value="Facebook">Facebook</option>
            {/* Add more platforms as options here */}
          </select>
        </div>
        {/* <button type="submit">Submit</button> */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            // height: "100vh",
          }}
        >
          <Button
            className="font-extrabold cursor-pointer"
            variant="gradient"
            type="submit"
            // padding
            style={{ margin: "10px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
