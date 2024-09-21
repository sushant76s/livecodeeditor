import React, { useState, useEffect, useRef } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { initSocket } from "../socket";
import toast from "react-hot-toast";

import CodeEditor from "../components/CodeEditor";
import ChatRoom from "../components/ChatRoom";
import VerticalMenu from "../components/VerticalMenu";
import { getUser } from "../services/UserAPI";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const [isLeftMenuOpen, setLeftMenuOpen] = useState(true);
  const [isRightMenuOpen, setRightMenuOpen] = useState(true);
  const [editorFontSize, setEditorFontSize] = useState("14px");
  const [editorTheme, setEditorTheme] = useState("light");

  const [clients, setClients] = useState([]);

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
        username: location.state?.username,
      });

      // listening for joined event
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} Joined the Room`);
          // console.log(`${username} joined.`);
        }

        setClients(clients);
        socketRef.current.emit("sync-code", {
          code: codeRef.current,
          socketId,
        });
      });
      // listening for DISCONNECTED
      //when DISCONNECTED

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} Left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
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

  const handleEditorFontSize = (event) => {
    setEditorFontSize(event.target.value);
  };

  const handleEditorTheme = (event) => {
    setEditorTheme(event.target.value);
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

  function leaveRoom() {
    navigate("/");
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-300">
        <div className="md:flex h-full">
          <aside
            className={`fixed inset-0 bg-gray-500 p-1 transform ${
              leftDrawerOpen ? "translate-x-0 pb-14" : "-translate-x-full"
            } transition-transform md:relative md:transform-none md:w-1/4 md:inset-auto z-50 h-full`}
          >
            <button
              className="md:hidden px-3 py-1 bg-red-500 rounded mb-4"
              onClick={() => setLeftDrawerOpen(false)}
            >
              Close
            </button>
            <VerticalMenu
              clients={clients}
              copyRoomId={copyRoomId}
              leaveRoom={leaveRoom}
            />
          </aside>
          <main className="flex-1 bg-gray-500 p-0 overflow-y-hidden flex flex-col">
            <header className="bg-white rounded-lg m-1 p-2 flex justify-center items-center sticky top-0 z-10">
              <div className="md:hidden flex-1 flex">
                <button
                  onClick={() => setLeftDrawerOpen(true)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Menu
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <select
                  value={editorFontSize}
                  onChange={handleEditorFontSize}
                  className="bg-gray-600 text-white rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <select
                  value={editorTheme}
                  onChange={handleEditorTheme}
                  className="bg-gray-600 text-white rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div className="md:hidden flex-1 flex items-center justify-center">
                <button
                  onClick={() => setRightDrawerOpen(true)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Chat
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto">
              <CodeEditor
                editorTheme={editorTheme}
                fontSize={editorFontSize}
                socketRef={socketRef}
                roomId={roomId}
                codeRef={codeRef}
              />
            </div>
          </main>
          <aside
            className={`fixed inset-0 bg-gray-500 p-1 transform ${
              rightDrawerOpen ? "translate-x-0 pb-14" : "translate-x-full"
            } transition-transform md:relative md:transform-none md:w-1/4 md:inset-auto z-50 h-full`}
          >
            <button
              className="md:hidden px-3 py-1 bg-red-500 rounded mb-4"
              onClick={() => setRightDrawerOpen(false)}
            >
              Close
            </button>
            <ChatRoom
              socketRef={socketRef}
              roomId={roomId}
              username={location.state?.username}
            />
          </aside>
        </div>
      </div>
    </>
  );
};

export default EditorPage;
