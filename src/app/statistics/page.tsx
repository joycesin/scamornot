"use client";
import { useState } from "react";
import "../styles/contribute.css";
import { Button, Text } from "@mantine/core";

export default function Statistics() {
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
        Statistics
      </Text>
    </div>
  );
}
