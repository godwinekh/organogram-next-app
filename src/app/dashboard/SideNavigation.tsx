"use client";
import { ReactNode, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Delete, GroupWork, TableChart } from "@mui/icons-material";
import { Tabs } from "./Dashboard";

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

  const handleSelectedListItem = (index: number, tab: Tabs) => {
    setSelectedIndex(index);
    props.onSelected(tab);
  };

  return (
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
  );
}

{/* <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }} mb={1}>
  <Typography variant="subtitle2" color="GrayText">
    Signed in as:
  </Typography>
  <Typography variant="overline">{userEmail}</Typography>
</Box>; */}
