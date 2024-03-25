"use client";
import { Grid } from "@mui/material";
import SideNavigation from "./SideNavigation";
import { useState } from "react";
import Questions from "./tabs/Questions";
import Shared from "./tabs/Shared";
import Trash from "./tabs/Trash";
import Details from "./details/Details";

export type Tabs = "questions" | "shared" | "trash";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Tabs>("questions");

  const handleTabSelection = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  return (
    <Grid container alignItems="stretch">
      <Grid item md={2}>
        <SideNavigation onSelected={handleTabSelection} />
      </Grid>

      <Grid item xs={12} md={7} mx={2}>
        {selectedTab === "questions" && <Questions />}
        {selectedTab === "shared" && <Shared />}
        {selectedTab === "trash" && <Trash />}
      </Grid>

      <Grid item md>
        <Details />
      </Grid>
    </Grid>
  );
}
