import React, { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon

const ChatComponent = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 for room chat, 1 for personal chat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null); // For personal chat

  const connectedPeople = ["Alice", "Bob", "Charlie"]; // Example list of connected people

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedPerson(null); // Reset selected person when switching tabs
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  const selectPerson = (person) => {
    setSelectedPerson(person);
  };

  const goBackToList = () => {
    setSelectedPerson(null); // Go back to the list of connected people
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          padding: 0.5,
          display: "flex", // Flex container
          justifyContent: "space-between", // Distribute items across the row
          alignItems: "center", // Center vertically
        }}
      >
        {/* Title */}
        <Typography variant="h6" noWrap sx={{pl: "0.20em"}}>
          Chat
        </Typography>

        {/* Tabs for Room Chat and Personal Chat */}
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Room Chat" />
          <Tab label="Personal Chat" />
        </Tabs>
      </Paper>

      {/* Chat Interface */}
      <Box sx={{ mt: "8px", flexGrow: 1, height: "calc(100% - 77px)" }}>
        {selectedTab === 0 ? (
          // Room Chat Interface
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "16px 8px",
            }}
          >
            {/* Scrollable messages area */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
              {messages.map((msg, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  {msg}
                </Typography>
              ))}
            </Box>

            {/* Fixed input area */}
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                size="small"
              />
              <Button
                onClick={handleSendMessage}
                variant="contained"
                sx={{ ml: 1 }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        ) : (
          // Personal Chat Interface
          <>
            {!selectedPerson ? (
              // List of connected people when no person is selected
              <Paper sx={{ height: "100%", padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Connected People
                </Typography>
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
            ) : (
              // Personal chat with the selected person
              <Paper
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 8px",
                }}
              >
                {/* Back Button */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <IconButton onClick={goBackToList}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Chat with {selectedPerson}
                  </Typography>
                </Box>

                {/* Scrollable messages area */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
                  {messages.map((msg, index) => (
                    <Typography key={index} sx={{ mb: 1 }}>
                      {msg}
                    </Typography>
                  ))}
                </Box>

                {/* Fixed input area */}
                <Box sx={{ display: "flex" }}>
                  <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    size="small"
                  />
                  <Button
                    onClick={handleSendMessage}
                    variant="contained"
                    sx={{ ml: 1 }}
                  >
                    Send
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ChatComponent;
