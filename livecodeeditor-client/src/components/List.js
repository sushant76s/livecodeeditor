import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const ListComponent = () => {
  const [selectedPerson, setSelectedPerson] = useState(null); // For personal chat
  const connectedPeople = [
    "Alice",
    "Bob",
    "Charlie",
    "a",
    "b",
    "c",
    "d",
    "Alice",
    "Bob",
    "Charlie",
    "a",
    "b",
    "c",
    "d",
    "Alice",
    "Bob",
    "Charlie",
    "a",
    "b",
    "c",
    "d",
    "Alice",
    "Bob",
    "Charlie",
    "a",
    "b",
    "c",
    "d",
  ]; // Example list of connected people

  const selectPerson = (person) => {
    setSelectedPerson(person);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
        // paddingBottom: "48px", // Accounts for the 48px bottom navbar
      }}
    >
      {/* Title */}
      <Paper sx={{ width: "100%", padding: 1, mb: 1 }}>
        <Typography variant="h6" gutterBottom justifyContent="center" sx={{m: "0.20em 0.15em"}}>
          Connected People
        </Typography>
      </Paper>

      {/* Scrollable List */}
      <Paper
        sx={{
          height:  "calc(100% - 77px)", // Subtract 70px for the header area + padding
          overflowY: "auto", // Enable scrolling
          padding: 0.5,
        }}
      >
        <List>
          {connectedPeople.map((person, index) => (
            <ListItem key={index} sx={{pt: 1, pb: 1, p:0}}>
              <ListItemButton onClick={() => selectPerson(person)}>
                <ListItemText primary={person} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ListComponent;
