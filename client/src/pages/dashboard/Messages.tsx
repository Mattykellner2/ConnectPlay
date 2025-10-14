import { useState, useMemo } from "react";
import { Search, Send } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "@/styles/dashboard.css";
import "@/styles/messages.css";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Thanks for connecting! I'd love to discuss the partnership opportunity.",
    timestamp: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Prof. Michael Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    lastMessage: "The guest lecture went great! Students were very engaged.",
    timestamp: "1h ago",
    unread: false,
  },
  {
    id: "3",
    name: "Emily Watson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    lastMessage: "Can we schedule a follow-up meeting next week?",
    timestamp: "3h ago",
    unread: true,
  },
  {
    id: "4",
    name: "Dr. James Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastMessage: "I've reviewed the curriculum materials. Looking forward to our collaboration.",
    timestamp: "1d ago",
    unread: false,
  },
  {
    id: "5",
    name: "Lisa Anderson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    lastMessage: "The student feedback was overwhelmingly positive!",
    timestamp: "2d ago",
    unread: false,
  },
];

const MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hi Dr. Chen! Welcome to ConnectPlay.", sender: "user", timestamp: "10:30 AM" },
    { id: "2", text: "Thank you! I'm excited to be here.", sender: "other", timestamp: "10:32 AM" },
    { id: "3", text: "Thanks for connecting! I'd love to discuss the partnership opportunity.", sender: "other", timestamp: "10:35 AM" },
  ],
  "2": [
    { id: "1", text: "How did the guest lecture go?", sender: "user", timestamp: "Yesterday 2:00 PM" },
    { id: "2", text: "The guest lecture went great! Students were very engaged.", sender: "other", timestamp: "Yesterday 2:15 PM" },
    { id: "3", text: "That's wonderful to hear! I'm so glad it went well.", sender: "user", timestamp: "Yesterday 2:20 PM" },
  ],
  "3": [
    { id: "1", text: "Great meeting today!", sender: "other", timestamp: "Today 9:00 AM" },
    { id: "2", text: "Can we schedule a follow-up meeting next week?", sender: "other", timestamp: "Today 9:05 AM" },
  ],
  "4": [
    { id: "1", text: "I've shared the curriculum materials with you.", sender: "user", timestamp: "2 days ago" },
    { id: "2", text: "I've reviewed the curriculum materials. Looking forward to our collaboration.", sender: "other", timestamp: "2 days ago" },
  ],
  "5": [
    { id: "1", text: "Thanks for the excellent session!", sender: "user", timestamp: "3 days ago" },
    { id: "2", text: "The student feedback was overwhelmingly positive!", sender: "other", timestamp: "3 days ago" },
  ],
};

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversationId, setActiveConversationId] = useState("1");
  const [messageText, setMessageText] = useState("");

  const filteredConversations = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return CONVERSATIONS.filter(
      (conv) =>
        conv.name.toLowerCase().includes(q) ||
        conv.lastMessage.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeConversation = CONVERSATIONS.find((c) => c.id === activeConversationId);
  const messages = MESSAGES[activeConversationId] || [];

  const handleSend = () => {
    if (messageText.trim()) {
      // In real implementation, this would send the message to backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div className="messages-container">
          {/* Left Panel - Conversations List */}
          <div className="messages-sidebar">
            <div className="messages-search">
              <div className="messages-search-input">
                <Search className="w-4 h-4" style={{ color: "#94A3B8" }} />
                <input
                  type="text"
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-messages"
                />
              </div>
            </div>

            <div className="messages-list">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  className={`message-item ${conv.id === activeConversationId ? "active" : ""}`}
                  onClick={() => setActiveConversationId(conv.id)}
                  data-testid={`conversation-${conv.id}`}
                >
                  <Avatar className="message-avatar">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="message-item-content">
                    <div className="message-item-header">
                      <span className="message-item-name">{conv.name}</span>
                      <span className="message-item-time">{conv.timestamp}</span>
                    </div>
                    <div className="message-item-preview">
                      {conv.lastMessage}
                      {conv.unread && <span className="message-unread-dot" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Active Conversation */}
          <div className="messages-chat">
            {activeConversation && (
              <>
                <div className="messages-chat-header">
                  <Avatar className="message-avatar">
                    <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="messages-chat-name">{activeConversation.name}</span>
                </div>

                <div className="messages-chat-body">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message-bubble ${msg.sender === "user" ? "message-bubble-user" : "message-bubble-other"}`}
                      data-testid={`message-${msg.id}`}
                    >
                      <div className="message-bubble-text">{msg.text}</div>
                      <div className="message-bubble-time">{msg.timestamp}</div>
                    </div>
                  ))}
                </div>

                <div className="messages-chat-footer">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    data-testid="input-message-text"
                  />
                  <button
                    onClick={handleSend}
                    className="messages-send-btn"
                    data-testid="button-send-message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
