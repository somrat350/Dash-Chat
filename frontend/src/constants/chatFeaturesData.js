import callImg from "../assets/call.icon.png";
import chatImg from "../assets/mag.png";
import videoImg from "../assets/videeeeeeeeo.png";
import settingsImg from "../assets/siting.png";

export const CHAT_FEATURES = [
  {
    slug: "voice-call",
    name: "Voice Call",
    img: callImg,
    color: "from-green-400 to-green-600",
    description: "High-quality audio calls with crystal clear sound",
    intro:
      "Dash-Chat voice calling uses the same realtime stack as messaging so calls can start fast and stay synced across tabs.",
    capabilities: [
      {
        title: "One-tap audio calls",
        detail:
          "Call records are created instantly with receiver and call type, then surfaced in the dashboard call history.",
      },
      {
        title: "Realtime incoming ring",
        detail:
          "The receiver gets an incoming call signal via socket room events, including caller identity and record reference.",
      },
      {
        title: "Call lifecycle tracking",
        detail:
          "Each call can transition through ringing, received, missed, rejected, completed, cancelled, or failed states.",
      },
      {
        title: "Smart call logs",
        detail:
          "Call logs support tab filters, search by participant, and sorting by newest, oldest, or longest duration.",
      },
    ],
    endpoints: [
      "POST /api/calls",
      "PATCH /api/calls/:id/status",
      "GET /api/calls?page=&limit=&tab=&search=&sort=",
      "DELETE /api/calls/:id",
    ],
    appearsIn: [
      "Dashboard -> Calls page",
      "In-chat call overlay in message screen",
      "Socket event: incomingCall",
    ],
  },
  {
    slug: "live-chat",
    name: "Live Chat",
    img: chatImg,
    color: "from-blue-400 to-blue-600",
    description: "Instant messaging with real-time delivery status",
    intro:
      "Live Chat in Dash-Chat is designed for continuous realtime sync so messages, status updates, and reactions appear instantly.",
    capabilities: [
      {
        title: "Realtime delivery pipeline",
        detail:
          "Messages publish to both sender and receiver socket rooms, keeping all open tabs/devices in sync.",
      },
      {
        title: "Sent, delivered, seen state",
        detail:
          "Delivery status updates are emitted and reflected in UI as soon as receiver sockets are active or chats are opened.",
      },
      {
        title: "Message controls",
        detail:
          "Users can edit, delete for everyone, hide for self, react with emoji, and keep reply metadata.",
      },
      {
        title: "Partner discovery and recents",
        detail:
          "Search by name/email/bio, fetch recent conversations, and keep partner list sorted by latest activity.",
      },
    ],
    endpoints: [
      "GET /api/messages/messagePartners",
      "GET /api/messages/chats/:userId",
      "PATCH /api/messages/chats/:userId/seen",
      "POST /api/messages/send/:userId",
      "PATCH /api/messages/edit/:id",
      "PATCH /api/messages/delete/:id",
      "PATCH /api/messages/:id/addReaction",
    ],
    appearsIn: [
      "Dashboard -> Chats and Messages",
      "Messages sidebar + conversation view",
      "Socket events: newMessage, messageStatusUpdated, reactionUpdated",
    ],
  },
  {
    slug: "video-call",
    name: "Video Call",
    img: videoImg,
    color: "from-violet-400 to-fuchsia-600",
    description: "Face-to-face video conversations with HD quality",
    intro:
      "Video calls are powered by Stream Video integration with secure token handoff and tracked call records inside Dash-Chat.",
    capabilities: [
      {
        title: "Stream Video client integration",
        detail:
          "The dashboard call screen initializes StreamVideoClient with server-issued token and user identity.",
      },
      {
        title: "Join/leave with call controls",
        detail:
          "Video calls use StreamCall + CallControls and speaker layout for active participants.",
      },
      {
        title: "Member safety checks",
        detail:
          "Server-side member validation ensures only the intended call participants are attached to a room.",
      },
      {
        title: "History and status consistency",
        detail:
          "Video sessions are persisted in the same call model for analytics, pagination, and missed-call handling.",
      },
    ],
    endpoints: [
      "GET /api/calls/token",
      "POST /api/calls/ensure-members",
      "POST /api/calls",
      "PATCH /api/calls/:id/status",
    ],
    appearsIn: [
      "Dashboard -> Calls screen",
      "Stream UI components (SpeakerLayout, CallControls)",
      "Socket-driven incoming call signaling",
    ],
  },
  {
    slug: "settings",
    name: "Settings",
    img: settingsImg,
    color: "from-amber-400 to-orange-600",
    description: "Customize your chat experience and preferences",
    intro:
      "Settings in Dash-Chat combine account-level updates with local UI preferences so users can tailor both identity and chat experience.",
    capabilities: [
      {
        title: "Profile customization",
        detail:
          "Users can update profile details from settings, with server-side profile patch support.",
      },
      {
        title: "Appearance controls",
        detail:
          "Theme, chat background color/image, font family, and font size can be tuned and persisted locally.",
      },
      {
        title: "Notification preferences",
        detail:
          "Message sound and browser notification toggles are available in the notification settings panel.",
      },
      {
        title: "Privacy and account safety",
        detail:
          "Last-seen visibility, blocked user listing, and password update UI are grouped under privacy settings.",
      },
    ],
    endpoints: [
      "PATCH /api/users/updateProfile",
      "GET /api/users/:id",
      "GET /api/friends/notifications",
      "PATCH /api/friends/notifications/:notificationId/read",
    ],
    appearsIn: [
      "Dashboard -> Settings, Profile, Appearance, Notifications, Privacy",
      "Theme selector and appearance store",
      "Local persistence via localStorage for chat UI preferences",
    ],
  },
];

export const getChatFeatureBySlug = (featureSlug) =>
  CHAT_FEATURES.find((feature) => feature.slug === featureSlug);
