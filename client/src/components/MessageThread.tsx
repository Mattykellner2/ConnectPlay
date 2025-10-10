import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface MessageThreadProps {
  messages: Message[];
  recipientName: string;
  recipientAvatar?: string;
}

export default function MessageThread({ messages, recipientName, recipientAvatar }: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback>{recipientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold" data-testid="text-recipient-name">{recipientName}</h3>
          </div>
        </div>
        <Button size="icon" variant="ghost" data-testid="button-message-options">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            data-testid={`message-${message.id}`}
          >
            <div className={`flex gap-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              {!message.isOwn && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.senderAvatar} />
                  <AvatarFallback>{message.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div 
                  className={`rounded-2xl px-4 py-2 ${
                    message.isOwn 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            data-testid="input-message"
          />
          <Button onClick={handleSend} data-testid="button-send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
