import MessageThread from '../MessageThread';

const mockMessages = [
  {
    id: "1",
    sender: "Dr. Sarah Johnson",
    content: "Hi! I'd be happy to speak at your upcoming event about AI in healthcare.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "That's wonderful! Our students would love to hear from you. When would you be available?",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Dr. Sarah Johnson",
    content: "I'm available next Thursday or Friday afternoon. Would either of those work?",
    timestamp: "10:35 AM",
    isOwn: false,
  },
];

export default function MessageThreadExample() {
  return (
    <div className="h-[500px]">
      <MessageThread
        messages={mockMessages}
        recipientName="Dr. Sarah Johnson"
      />
    </div>
  );
}
