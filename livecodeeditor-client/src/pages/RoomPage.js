import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { initSocket } from "../socket";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import {
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

import CodeEditor from "../components/CodeEditor";
// import ChatRoom from "../components/ChatRoom";
// import VerticalMenu from "../components/VerticalMenu";
// import { getUser } from "../services/UserAPI";
import ChatComponent from "../components/Chat";
import ListComponent from "../components/List";
import { roomInfo } from "../services/RoomAPI";
import { useAuth } from "../authentication/AuthContext";

// Create a container using Grid layout
const GridContainer = styled(Grid)(({ theme, isHidden }) => ({
  display: "grid",
  gridTemplateColumns: !isHidden ? "1fr" : "75% 25%",
  height: "calc(100vh - 64px)",
  transition: "grid-template-columns 0.3s ease",
  padding: theme.spacing(0),
}));

const AppBarFixed = styled(AppBar)(({ theme }) => ({
  top: "auto",
  bottom: 0,
  height: "48px",
  zIndex: theme.zIndex.drawer + 1,
  padding: "0 10px",
  justifyContent: "center",
  "& .MuiToolbar-root": {
    minHeight: "48px",
    alignItems: "center",
  },
  // background: "#cfcfcf",
  backgroundColor: "#f0f0f0",
}));

const SectionA = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: "#f0f0f0",
  height: "100%",
  overflow: "auto",
}));

const SectionB = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  // backgroundColor: "#cfcfcf",
  backgroundColor: "#f0f0f0",
  height: "100%",
  overflow: "auto",
}));

export default function RoomPage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { room_id } = useParams();
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  const [isBHidden, setIsBHidden] = useState(false);
  const [isUserList, setIsUserList] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [editorFontSize, setEditorFontSize] = useState("12px");
  const [editorTheme, setEditorTheme] = useState("light");

  const [clients, setClients] = useState([]);
  const [roomIntId, setRoomIntId] = useState(null);

  const roomId = location.state?.roomId;
  const checkUser = location.state?.user;

  useEffect(() => {
    if (roomId !== room_id && checkUser !== null) {
      navigate("/room");
      toast.error("Invalid room id or missing user");
    }
  }, [roomId, room_id, checkUser]);

  console.log("state in room page: ", location.state);
  console.log("room id: ", roomId);

  useEffect(() => {
    const infoFunction = async () => {
      const res = await roomInfo({ roomId });
      console.log("Room Info: ", res);
      if (res) {
        setRoomIntId(res?.roomInfo?.id);
      }
    };
    if (!isGuest) {
      infoFunction();
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        navigate("/");
      }

      socketRef.current.emit("join", {
        roomId,
        user: location.state?.user,
      });

      // Listening for joined event
      socketRef.current.on("joined", ({ clients, user, socketId }) => {
        if (user.id !== location.state?.user?.id) {
          toast.success(`${user.fullName} Joined the Room`);
        }

        setClients(clients);

        if (codeRef.current) {
          socketRef.current.emit("sync-code", {
            code: codeRef.current,
            socketId,
          });
        }
      });

      // Listening for DISCONNECTED event
      socketRef.current.on("disconnected", ({ socketId, user }) => {
        toast.success(`${user.fullName} Left the room.`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.off("joined");
        socketRef.current.off("disconnected");
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  // const toggleBVisibility = () => {
  //   setIsBHidden(!isBHidden);
  // };

  const toggleUserList = () => {
    if (isChatOpen) {
      setIsChatOpen(!isChatOpen);
    }
    const newListState = !isUserList;
    setIsUserList(newListState);
    setIsBHidden(newListState || isChatOpen);
  };

  const toggleChatVisibility = () => {
    if (isUserList) {
      setIsUserList(!isUserList);
    }
    const newChatState = !isChatOpen;
    setIsChatOpen(newChatState);
    setIsBHidden(newChatState || isUserList);
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id has been copied to your clipboard.");
    } catch (err) {
      toast.error("Failed to copy the room id.");
      console.error(err);
    }
  };

  const handleCopyCode = async () => {
    if (codeRef.current) {
      try {
        const code = codeRef.current;
        await navigator.clipboard.writeText(code);
        toast.success("Code has been copied to your clipboard.");
      } catch (err) {
        toast.error("Failed to copy the code.");
        console.error(err);
      }
    }
  };

  function leaveRoom() {
    navigate("/");
  }

  const handleEditorFontSize = (event) => {
    setEditorFontSize(event.target.value);
  };

  const handleEditorTheme = (event) => {
    setEditorTheme(event.target.value);
  };

  console.log("clients: ", clients);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <GridContainer container isHidden={isBHidden}>
        {/* Section A (75%) */}
        <SectionA>
          <Paper sx={{ padding: 1, mb: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">LiveCodeEditor: Code Editor</Typography>
              <Typography variant="h6">
                Room Name: {location.state?.roomName}
              </Typography>

              <Stack direction="row-reverse" spacing={2}>
                {/* First Select Button */}
                <FormControl sx={{ m: 1, minWidth: 110 }} size="small">
                  {/* <InputLabel id="demo-select-small-label">Font Size</InputLabel> */}
                  <Select
                    // labelId="demo-select-small-label"
                    // id="demo-select-small"
                    value={editorFontSize}
                    onChange={handleEditorFontSize}
                    // label="Font Size"
                    size="small"
                    // sx={{ p: "4px 0 8px 5px", height: "1em" }}
                  >
                    <MenuItem value="12px">12px</MenuItem>
                    <MenuItem value="14px">14px</MenuItem>
                    <MenuItem value="16px">16px</MenuItem>
                    <MenuItem value="18px">18px</MenuItem>
                  </Select>
                </FormControl>

                {/* Second Select Button */}
                <FormControl sx={{ m: 1, minWidth: 100, p: 0 }} size="small">
                  {/* <InputLabel id="demo-select-small-label">Theme</InputLabel> */}
                  <Select
                    // labelId="demo-select-small-label"
                    // id="demo-select-small"
                    value={editorTheme}
                    onChange={handleEditorTheme}
                    // label="Theme"
                    size="small"
                  >
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleCopyCode}>
                  Copy Code
                </Button>
              </Stack>
            </Stack>
          </Paper>
          <CodeEditor
            editorTheme={editorTheme}
            fontSize={editorFontSize}
            socketRef={socketRef}
            roomId={roomId}
            codeRef={codeRef}
          />
        </SectionA>

        {/* Section B (25%) */}
        {isBHidden && (
          <SectionB>
            {isUserList && (
              // <VerticalMenu
              //   clients={clients}
              //   copyRoomId={copyRoomId}
              //   leaveRoom={leaveRoom}
              // />
              <ListComponent clients={clients} />
            )}
            {isChatOpen && (
              // <ChatRoom
              //   socketRef={socketRef}
              //   roomId={roomId}
              //   username={location.state?.username}
              // />
              <ChatComponent
                roomId={roomId}
                clients={clients}
                userId={location.state?.user.id}
                roomIntId={roomIntId}
                socketRef={socketRef}
                user={location.state?.user}
              />
            )}
          </SectionB>
        )}
      </GridContainer>

      {/* Bottom AppBar */}
      <AppBarFixed
        position="fixed"
        sx={{
          borderRadius: "20px",
          justifyContent: "center",
          margin: "0 auto 10px auto",
          left: 0,
          right: 0,
          width: "75%",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "center" }}
          variant="dense"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={copyRoomId}
            sx={{ mr: 1 }}
          >
            Copy RoomID
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={leaveRoom}
            sx={{ mr: 1 }}
          >
            Leave Room
          </Button>

          <Button
            variant="outlined"
            color="primary"
            // disabled={isUserList}
            onClick={toggleUserList}
            sx={{ mr: 1 }}
          >
            Users
          </Button>
          <Button
            variant="outlined"
            color="primary"
            // disabled={isChatOpen}
            // color="inherit"
            onClick={toggleChatVisibility}
          >
            Chat
          </Button>

          {/* Right-side icon button */}
          {/* <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            sx={{ ml: "auto" }}
            onClick={toggleBVisibility}
          >
            <MenuIcon />
          </IconButton> */}
        </Toolbar>
      </AppBarFixed>
    </Box>
  );
}
