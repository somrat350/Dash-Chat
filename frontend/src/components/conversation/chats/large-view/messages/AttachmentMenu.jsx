import React from "react";

import { File, Camera, Image, Music, User, Smile, BarChart2, Calendar } from "lucide-react";


const items = [
  { icon: <File className="w-5 h-5 text-blue-500" />, label: "Document" },
  { icon: <Camera className="w-5 h-5 text-red-500" />, label: "Camera" },
  { icon: <Image className="w-5 h-5 text-pink-500" />, label: "Gallery" },
  { icon: <Music className="w-5 h-5 text-purple-500" />, label: "Audio" },
  { icon: <User className="w-5 h-5 text-yellow-500" />, label: "Contact" },
  { icon: <Smile className="w-5 h-5 text-green-500" />, label: "Sticker" },
  { icon: <BarChart2 className="w-5 h-5 text-orange-500" />, label: "Poll" },
  { icon: <Calendar className="w-5 h-5 text-cyan-500" />, label: "Event" },
];


export default function AttachmentMenu({ onSelect }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 z-50 bg-white rounded-xl shadow-lg p-2 w-56 flex flex-col gap-2">
      {items.map((item, idx) => (
        <button
          key={idx}
          className="flex items-center gap-2  hover:bg-primary/30 p-2 rounded"
          onClick={() => onSelect(item.label)}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
}