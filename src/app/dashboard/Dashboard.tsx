"use client";
import { Grid } from "@mui/material";
import SideNavigation from "./SideNavigation";
import { useState } from "react";
import Questions from "./tabs/Questions";
import Shared from "./tabs/Shared";
import Trash from "./tabs/Trash";
import Details from "./details/Details";
import { useAppSelector } from "@/lib/hooks";

export type Tabs = "questions" | "shared" | "trash";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Tabs>("questions");

  const handleTabSelection = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  return (
    <Grid
      container
      sx={{ flexDirection: { xs: "column", md: "row" }}}
    >
      <Grid item md={2}>
        <SideNavigation onSelected={handleTabSelection} />
      </Grid>

      <Grid item xs={12} md={7} mx={{md: 2}} my={{xs: 2, md: 0}}>
        {selectedTab === "questions" && <Questions />}
        {selectedTab === "shared" && <Shared />}
        {selectedTab === "trash" && <Trash />}
      </Grid>

      <Grid item md sx={{display: {xs: "none", md: "grid"}}}>
        <Details />
      </Grid>
    </Grid>
  );
}
