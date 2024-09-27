import React, { useState, useEffect } from "react";
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
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import back icon
import {
  personalChat,
  personalChatHistory,
  roomChat,
  roomChatHistory,
} from "../services/ChatAPI";
const ChatComponent = ({
  roomId,
  roomIntId,
  clients,
  userId,
  socketRef,
  user,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [personalMessages, setPersonalMessages] = useState([]);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedPerson(null);
    setMessages([]);
  };

  useEffect(() => {
    // const fetchChatHistory = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     if (selectedTab === 0) {
    //       // Join the room
    //       // await userJoinRoom({ roomId, userId });
    //       const data = await roomChatHistory(roomIntId);
    //       console.log("room chat history: ", data);
    //       setMessages(data.messages.reverse()); // Assuming API returns latest first
    //     } else if (selectedTab === 1 && selectedPerson) {
    //       const receiverId = selectedPerson.id; // Assuming each person has an id
    //       const data = await personalChatHistory(receiverId);
    //       console.log("personal chat history: ", data);
    //       setMessages(data.messages.reverse());
    //     }
    //   } catch (err) {
    //     console.error("Error fetching chat history:", err);
    //     setError("Failed to load chat history.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchChatHistory();

    if (socketRef.current) {
      // Handle room messages
      socketRef.current.on("message", ({ messages }) => {
        const filteredMessages = messages.filter(
          (msg) => msg.user.id !== userId
        );
        setMessages((prevMessages) => [...prevMessages, ...filteredMessages]);
      });

      // Handle personal messages
      socketRef.current.on("personalMessage", ({ message, user }) => {
        const newPersonalMessage = { message, user };
        setPersonalMessages((prevPersonalMessages) => [
          ...prevPersonalMessages,
          newPersonalMessage,
        ]);
      });

      // Clean up on component unmount
      return () => {
        socketRef.current.off("message");
        socketRef.current.off("personalMessage");
      };
    }

    // Cleanup: Leave the room when component unmounts or room changes
    // return () => {
    //   if (selectedTab === 0) {
    //     userLeaveRoom({ roomId, userId });
    //   }
    // };
  }, [selectedTab, selectedPerson, roomIntId, userId, socketRef.current]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageToSend = newMessage.trim();
      try {
        if (selectedTab === 0) {
          // Room Chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: messageToSend, user: user },
          ]);
          setNewMessage("");

          socketRef.current.emit("message", {
            roomId,
            message: messageToSend,
            user,
          });
          // const response = await roomChat({
          //   roomId: roomIntId,
          //   message: messageToSend,
          // });
          // console.log("Room Message Sent:", response);
        } else if (selectedTab === 1 && selectedPerson) {
          // Personal Chat
          setPersonalMessages((prevMessages) => [
            ...prevMessages,
            { message: messageToSend, user: user },
          ]);
          setNewMessage("");
          const receiverId = selectedPerson.id;
          socketRef.current.emit("personalMessage", {
            receiverId,
            message: messageToSend,
            user,
          });
          // const response = await personalChat({
          //   receiverId,
          //   message: messageToSend,
          //   roomId: roomIntId,
          // });
          // console.log("Personal Message Sent:", response);
        }
      } catch (err) {
        console.error("Error sending message:", err);
        setError("Failed to send message.");
      }
    }
  };

  useEffect(() => {
    if (selectedPerson !== null) {
      const filteredMessages = personalMessages.filter(
        (msg) => msg.user.id === userId || msg.user.id === selectedPerson.id
      );
      setSelectedUserMessages(filteredMessages);
    }
  }, [selectedPerson, personalMessages]);

  const selectPerson = (person) => {
    setSelectedPerson(person);
  };

  const goBackToList = () => {
    setSelectedPerson(null);
    setMessages([]);
  };

  console.log("messages: ", messages);
  console.log("pmessages: ", personalMessages);

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <Typography variant="h6" noWrap sx={{ pl: "0.20em" }}>
          Chat
        </Typography>

        {/* Tabs for Room Chat and Personal Chat */}
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Room Chat" />
          <Tab label="Personal Chat" />
        </Tabs>
      </Paper>

      {/* Chat Interface */}
      <Box sx={{ mt: "8px", flexGrow: 1, height: "calc(90vh - 80px)" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ padding: 2 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : selectedTab === 0 ? (
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
              {messages.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No messages yet.
                </Typography>
              ) : (
                messages.map((msg, index) => {
                  const isSender = msg.user.id === userId;
                  return (
                    <Box
                      key={index}
                      sx={{
                        mb: 1,
                        display: "flex",
                        justifyContent: isSender ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          p: 1.5,
                          borderRadius: "12px",
                          bgcolor: isSender ? "primary.light" : "grey.200",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          {isSender
                            ? "You"
                            : msg.user?.fullName || "Unknown User"}{" "}
                        </Typography>
                        <Typography variant="body1">{msg.message}</Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>

            {/* Fixed input area */}
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                size="small"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
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
                  {clients &&
                    clients.map((person, index) => (
                      <ListItem
                        sx={{
                          pt: 1,
                          pb: 1,
                          p: 0,
                          backgroundColor: "#f0f0f0",
                          borderRadius: "10px",
                          mt: 0.5,
                        }}
                        key={index}
                      >
                        <ListItemButton
                          onClick={() =>
                            selectPerson({
                              id: person.user.id,
                              name: person.user.fullName,
                            })
                          }
                          disabled={person.user.id === userId}
                        >
                          <ListItemAvatar>
                            <Avatar>{person.user.fullName.charAt(0)} </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              person.user.id === userId
                                ? person.user.fullName + " (You)"
                                : person.user.fullName
                            }
                          />
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
                    Chat with {selectedPerson.name}
                  </Typography>
                </Box>

                {/* Scrollable messages area */}
                <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
                  {selectedUserMessages.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                      No messages yet.
                    </Typography>
                  ) : (
                    selectedUserMessages.map((msg, index) => {
                      const isSender = msg.user.id === userId;
                      return (
                        <Box
                          key={index}
                          sx={{
                            mb: 1,
                            display: "flex",
                            justifyContent: isSender
                              ? "flex-end"
                              : "flex-start",
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "70%",
                              p: 1.5,
                              borderRadius: "12px",
                              bgcolor: isSender ? "primary.light" : "grey.200",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {isSender ? "You" : msg.user.fullName}{" "}
                            </Typography>
                            <Typography variant="body1">
                              {msg.message}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                </Box>

                {/* Fixed input area */}
                <Box sx={{ display: "flex" }}>
                  <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    size="small"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
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
