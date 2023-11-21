"use client";
import { useState } from "react";
import "../styles/contribute.css";
import { Button, Text } from "@mantine/core";

export default function Contribute() {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      date,
      message,
      category,
      platform,
    };

    // Here you would usually send the data to a server
    console.log(formData);
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
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="DD.MM.YYYY"
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
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
            <option value="SMS">SMS</option>
            <option value="SMS">WhatsApp</option>
            <option value="SMS">Telegram</option>
            <option value="SMS">WeChat</option>
            <option value="SMS">Facebook</option>
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
            // align it right
            //   style={{ float: "right" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
