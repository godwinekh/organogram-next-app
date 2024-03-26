"use client";
import { ReactNode, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Delete, GroupWork, TableChart } from "@mui/icons-material";
import { Tabs } from "./Dashboard";
import { Box, Typography } from "@mui/material";

interface SideNavProps {
  onSelected: (tab: Tabs) => void;
}

interface Controls {
  icon: ReactNode;
  text: Tabs;
}

const controls: Controls[] = [
  { icon: <TableChart />, text: "questions" },
  { icon: <GroupWork />, text: "shared" },
  { icon: <Delete />, text: "trash" },
];

export default function SideNavigation(props: SideNavProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const userEmail = localStorage.getItem("email");

  const handleSelectedListItem = (index: number, tab: Tabs) => {
    setSelectedIndex(index);
    props.onSelected(tab);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "column" },
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        height: { xs: "auto", md: "100%" },
        border: "1px solid lightgrey",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
        }}
        component="nav"
        aria-labelledby="dashboard"
      >
        {controls.map((control, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={handleSelectedListItem.bind(null, index, control.text)}
            sx={{
              pl: 1,
              pr: 1.75,
              "& .MuiListItemIcon-root": {
                marginRight: { xs: -3, md: -2 },
              },
            }}
            disableRipple
            disableGutters
          >
            <ListItemIcon>{control.icon}</ListItemIcon>
            <ListItemText
              primary={control.text}
              sx={{ textTransform: "capitalize" }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ padding: 3, display: { xs: "none", md: "block" } }}>
        <Typography variant="subtitle2" color="GrayText">
          Signed in as:
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="GrayText">
          {userEmail}
        </Typography>
      </Box>
    </Box>
  );
}

{
  /* ; */
}
