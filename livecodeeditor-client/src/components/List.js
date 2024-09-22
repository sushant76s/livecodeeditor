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
        height: "100vh",
        backgroundColor: "#f0f0f0",
        paddingBottom: "48px", // Accounts for the 48px bottom navbar
      }}
    >
      {/* Title */}
      <Paper sx={{ width: "100%", padding: 1, mb: 0.5 }}>
        <Typography variant="h6" gutterBottom>
          Connected People
        </Typography>
      </Paper>

      {/* Scrollable List */}
      <Paper
        sx={{
          height: "calc(100vh - 48px - 70px)", // Subtract 48px for the navbar and 70px for the header area
          overflowY: "auto", // Enable scrolling
          padding: 2,
        }}
      >
        <List>
          {connectedPeople.map((person, index) => (
            <ListItem key={index}>
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
