import {
  Check,
  CheckCheck,
  Lock,
  MoreVertical,
  Phone,
  Search,
  Video,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const demoMessages = [
  {
    id: 1,
    sender: "start",
    name: "Raihan",
    avatar: "https://i.pravatar.cc/80?img=14",
    time: "12:45",
    text: "Salaam! Voice call-er age quick update dicchi.",
    status: "delivered",
  },
  {
    id: 2,
    sender: "end",
    name: "You",
    avatar: "https://i.pravatar.cc/80?img=32",
    time: "12:46",
    text: "Nice, ami online. 5 minute er moddhe join korbo.",
    status: "sent",
  },
  {
    id: 3,
    sender: "start",
    name: "Raihan",
    avatar: "https://i.pravatar.cc/80?img=14",
    time: "12:47",
    text: "Meeting room ready. File gulo o share kore diyechi.",
    status: "delivered",
  },
  {
    id: 4,
    sender: "end",
    name: "You",
    avatar: "https://i.pravatar.cc/80?img=32",
    time: "12:48",
    text: "Great. Eita dekhlei bujha jay Dash-Chat realtime koto smooth.",
    status: "seen",
  },
  {
    id: 5,
    sender: "start",
    name: "Raihan",
    avatar: "https://i.pravatar.cc/80?img=14",
    time: "12:49",
    text: "Aro ekta feature test korbo: delivery + seen status.",
    status: "delivered",
  },
  {
    id: 6,
    sender: "end",
    name: "You",
    avatar: "https://i.pravatar.cc/80?img=32",
    time: "12:50",
    text: "Perfect! chol test start kori.",
    status: "seen",
  },
];

const renderStatusIcon = (status) => {
  if (status === "seen") {
    return <CheckCheck size={14} className="text-sky-300" />;
  }
  if (status === "delivered") {
    return <CheckCheck size={14} className="text-white/80" />;
  }
  return <Check size={14} className="text-white/80" />;
};

const ChatBubble = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".chatbubble-title", {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
      })
        .from(
          ".chatbubble-shell",
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
          },
          "-=0.25",
        )
        .from(
          ".chatbubble-row",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.35",
        )
        .from(
          ".chatbubble-note",
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.2",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-14 sm:py-16">
      <div className="chatbubble-title max-w-4xl mx-auto text-center px-4">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-[0.14em]">
          <Lock size={13} /> Private chats, realtime feel
        </p>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-base-content">
          Chat UI that feels like your real conversation screen
        </h2>
      </div>

      <div className="chatbubble-shell mt-8 sm:mt-10 max-w-5xl mx-auto rounded-3xl border border-base-300 bg-base-200/70 backdrop-blur-sm shadow-xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between border-b border-base-300/80 pb-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary/25 ring-offset-2 ring-offset-base-200">
                <img
                  src="https://i.pravatar.cc/100?img=14"
                  alt="Contact avatar"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base">Raihan Ahmed</p>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-base-content/75">
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Video call"
            >
              <Video size={14} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Audio call"
            >
              <Phone size={13} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="Search chat"
            >
              <Search size={14} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              aria-label="More options"
            >
              <MoreVertical size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {demoMessages.map((message) => {
            const isMe = message.sender === "end";
            return (
              <div
                key={message.id}
                className={`chatbubble-row chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-9 rounded-full border border-base-300 overflow-hidden">
                    <img src={message.avatar} alt={message.name} />
                  </div>
                </div>

                <div className="chat-header text-xs opacity-70 mb-1">
                  {message.name}
                  <time className="ml-2">{message.time}</time>
                </div>

                <div
                  className={`chat-bubble px-3.5 py-2.5 max-w-[85%] sm:max-w-md text-[13px] sm:text-sm leading-relaxed break-words ${
                    isMe
                      ? "bg-slate-800 text-white rounded-tr-md"
                      : "bg-slate-500 text-white rounded-tl-md"
                  }`}
                >
                  {message.text}
                </div>

                <div className="chat-footer opacity-80 text-[11px] mt-1 flex items-center gap-1">
                  {isMe ? (
                    renderStatusIcon(message.status)
                  ) : (
                    <CheckCheck size={14} className="text-sky-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chatbubble-note max-w-5xl mx-auto mt-8 sm:mt-10 px-4">
        <h3 className="text-xl sm:text-2xl lg:text-4xl text-center text-base-content leading-tight font-medium">
          With private messaging and calling, you can be yourself, speak freely,
          and feel close to the people who matter most.
        </h3>
      </div>
    </section>
  );
};

export default ChatBubble;
