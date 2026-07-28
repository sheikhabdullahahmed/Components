import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";

interface MessageLog {
  id: string;
  type: "sent" | "received" | "system";
  event: string;
  senderId?: string;
  content: string;
  timestamp: string;
}

export default function App() {
  const [serverUrl, setServerUrl] = useState<string>("http://localhost:5000");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [eventType, setEventType] = useState<"send_message" | "message">(
    "send_message",
  );
  const [messageInput, setMessageInput] = useState<string>("");
  const [logs, setLogs] = useState<MessageLog[]>([]);
  const [pingMs, setPingMs] = useState<number | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pingStartRef = useRef<number | null>(null);

  // Scroll to bottom when logs update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  // Connect to Socket.IO Server
  const connectSocket = () => {
    if (socketRef.current?.connected) return;

    const newSocket = io(serverUrl, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      setIsConnected(true);
      setSocketId(newSocket.id || "");
      addLog({
        type: "system",
        event: "connect",
        content: `Connected to server with ID: ${newSocket.id}`,
      });
    });

    newSocket.on("disconnect", (reason) => {
      setIsConnected(false);
      setSocketId("");
      setWelcomeMessage("");
      addLog({
        type: "system",
        event: "disconnect",
        content: `Disconnected from server (${reason})`,
      });
    });

    newSocket.on("connect_error", (err) => {
      setIsConnected(false);
      addLog({
        type: "system",
        event: "error",
        content: `Connection Error: ${err.message}`,
      });
    });

    // Welcome event from backend server.js
    newSocket.on("welcome", (data: { message: string; socketId: string }) => {
      setWelcomeMessage(data.message);
      addLog({
        type: "system",
        event: "welcome",
        content: `🎉 ${data.message} (Socket ID: ${data.socketId})`,
      });
    });

    // Event broadcast from 'send_message'
    newSocket.on(
      "receive_message",
      (payload: { senderId: string; data: any; timestamp: string }) => {
        if (pingStartRef.current) {
          setPingMs(Date.now() - pingStartRef.current);
          pingStartRef.current = null;
        }

        const isSelf = payload.senderId === newSocket.id;
        const text =
          typeof payload.data === "object"
            ? JSON.stringify(payload.data)
            : String(payload.data);

        addLog({
          type: isSelf ? "sent" : "received",
          event: "receive_message",
          senderId: payload.senderId,
          content: text,
          timestamp: payload.timestamp
            ? new Date(payload.timestamp).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
        });
      },
    );

    // Generic 'message' event broadcast
    newSocket.on(
      "message",
      (payload: { senderId: string; content: any; timestamp: string }) => {
        const isSelf = payload.senderId === newSocket.id;
        const text =
          typeof payload.content === "object"
            ? JSON.stringify(payload.content)
            : String(payload.content);

        addLog({
          type: isSelf ? "sent" : "received",
          event: "message",
          senderId: payload.senderId,
          content: text,
          timestamp: payload.timestamp
            ? new Date(payload.timestamp).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
        });
      },
    );
  };

  // Disconnect Socket
  const disconnectSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  // Auto connect on component mount
  useEffect(() => {
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const addLog = (
    log: Omit<MessageLog, "id" | "timestamp"> & { timestamp?: string },
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: log.timestamp || new Date().toLocaleTimeString(),
        ...log,
      },
    ]);
  };

  // Handle Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !socketRef.current || !isConnected) return;

    if (eventType === "send_message") {
      socketRef.current.emit("send_message", messageInput);
    } else {
      socketRef.current.emit("message", messageInput);
    }

    setMessageInput("");
  };

  // Send Ping Test
  const handleSendPing = () => {
    if (!socketRef.current || !isConnected) return;
    pingStartRef.current = Date.now();
    socketRef.current.emit("send_message", "⚡ Ping test from client");
  };

  // Clear log history
  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">🔌</div>
          <div className="brand-info">
            <h1>Socket.IO Playground</h1>
            <p>Real-time WebSockets Frontend Interface</p>
          </div>
        </div>

        <div
          className={`status-badge ${isConnected ? "connected" : "disconnected"}`}
        >
          <span className="pulse-dot"></span>
          <span>{isConnected ? "ONLINE" : "OFFLINE"}</span>
        </div>
      </header>

      {/* Control & Server Connection Bar */}
      <div className="control-bar">
        <div className="input-group">
          <label>Server URL</label>
          <input
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            disabled={isConnected}
            placeholder="http://localhost:5000"
          />
        </div>

        {isConnected ? (
          <>
            <div className="socket-id-tag">
              ID: {socketId.substring(0, 10)}...
            </div>
            <button className="btn btn-danger" onClick={disconnectSocket}>
              Disconnect
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={connectSocket}>
            Connect
          </button>
        )}

        <button
          className="btn btn-secondary"
          onClick={handleSendPing}
          disabled={!isConnected}
          title="Measure round-trip latency"
        >
          ⚡ Ping{" "}
          {pingMs !== null && (
            <span style={{ color: "#06b6d4" }}>({pingMs}ms)</span>
          )}
        </button>
      </div>

      {/* Welcome Banner */}
      {isConnected && welcomeMessage && (
        <div className="welcome-banner">
          <span style={{ fontSize: "1.2rem" }}>💬</span>
          <span>{welcomeMessage}</span>
        </div>
      )}

      {/* Main Messages & Logs Display */}
      <main className="main-content">
        <div className="messages-header">
          <span className="messages-title">
            Live Message Stream ({logs.length})
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleClearLogs}
            style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem" }}
          >
            Clear Stream
          </button>
        </div>

        <div className="messages-list">
          {logs.length === 0 ? (
            <div className="empty-state">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 8 9 8z"
                />
              </svg>
              <p>No messages yet. Send a message to get started!</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={`message-card ${log.type}`}>
                {log.type !== "system" && (
                  <div className="message-meta">
                    <span className="sender-tag">
                      {log.type === "sent"
                        ? "You"
                        : `User (${log.senderId?.substring(0, 6)})`}
                    </span>
                    <span className="event-badge">{log.event}</span>
                    <span className="time-stamp">{log.timestamp}</span>
                  </div>
                )}
                <div className="message-text">{log.content}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="app-footer">
        <form className="send-form" onSubmit={handleSendMessage}>
          <select
            className="event-select"
            value={eventType}
            onChange={(e) => setEventType(e.target.value as any)}
            disabled={!isConnected}
          >
            <option value="send_message">event: send_message</option>
            <option value="message">event: message</option>
          </select>

          <input
            type="text"
            className="message-input"
            placeholder={
              isConnected
                ? "Type a message..."
                : "Connect to server to send messages"
            }
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={!isConnected}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isConnected || !messageInput.trim()}
          >
            Send 🚀
          </button>
        </form>

        <div className="footer-info">
          <span>Connected to backend at target port 5000</span>
          <span>Socket.IO v4 client</span>
        </div>
      </footer>
    </div>
  );
}
