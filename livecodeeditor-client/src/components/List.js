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

const ListComponent = ({ clients }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const selectPerson = (person) => {
    setSelectedPerson(person);
  };

  console.log("clients in list: ", clients);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
        // paddingBottom: "48px",
      }}
    >
      {/* Title */}
      <Paper sx={{ width: "100%", padding: 1, mb: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          justifyContent="center"
          sx={{ m: "0.20em 0.15em" }}
        >
          Connected People
        </Typography>
      </Paper>

      {/* Scrollable List */}
      <Paper
        sx={{
          height: "calc(100% - 77px)",
          overflowY: "auto",
          padding: 0.5,
        }}
      >
        <List>
          {clients &&
            clients.map((person, index) => (
              <ListItem key={index} sx={{ pt: 1, pb: 1, p: 0 }}>
                <ListItemButton onClick={() => selectPerson(person.user.id)}>
                  <ListItemText primary={person.user.fullName} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ListComponent;
