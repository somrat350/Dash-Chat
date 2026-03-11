import {
  Phone,
  MessageCircle,
  Video,
  Settings,
  ChevronRight,
} from "lucide-react";
import callImg from "../../../assets/call.icon.png";
import chatImg from "../../../assets/mag.png";
import videoImg from "../../../assets/videeeeeeeeo.png";
import settingsImg from "../../../assets/siting.png";

const ChatFeatures = () => {
  const features = [
    {
      name: "voice call",
      img: callImg,
      icon: <Phone className="w-6 h-6 text-green-500" />,
      description: "High-quality audio calls with crystal clear sound",
      color: "from-green-400 to-green-600",
    },
    {
      name: "Live Chat",
      img: chatImg,
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      description: "Instant messaging with real-time delivery status",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Video Call",
      img: videoImg,
      icon: <Video className="w-6 h-6 text-purple-500" />,
      description: "Face-to-face video conversations with HD quality",
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "Settings",
      img: settingsImg,
      icon: <Settings className="w-6 h-6 text-gray-500" />,
      description: "Customize your chat experience and preferences",
      color: "from-gray-400 to-gray-600",
    },
  ];

  return (
    <section>
     
      
      {/* full work*/}
      <div>
        {/* Section Header */}
        <div className="text-center mt-4 mb-6">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Chat Features
          </h2>

        
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-base-200  rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              

              {/* Card Content */}
              <div className="relative p-8 flex flex-col items-center text-center">
               
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-white transition-colors duration-300">
                    {feature.icon}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative mb-6">
                  <div
                    className={`w-28 h-28 rounded-2xl bg-linear-to-br ${feature.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                   <div className="w-20 h-20 sm:w-24 sm:h-24 bg-base-100 rounded-xl shadow-sm hover:shadow-md flex items-center justify-center overflow-hidden transition-shadow duration-300">
                  <img
                 src={feature.img}
               alt={feature.name}
                 className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                 onError={(e) => {
                  e.target.onerror = null;
                 e.target.src = `https://via.placeholder.com/64x64?text=${feature.name}`;
                }}
               />
              </div>
                  </div>

                  {/* Decorative Dot */}
                  <div
                    className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-linear-to-br ${feature.color} border-4 border-white`}
                  ></div>
                </div>

                
                <h3 className="text-xl font-bold text-base-content  mb-2">
                  {feature.name}
                </h3>

                
                <p className="text-sm text-base-content/70 mb-4">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-medium text-base-content   duration-300">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              
               <div
    className={`absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
  ></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
       <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
  <div className="text-center">
    <div className="text-4xl font-bold text-base-content mb-2">1M+</div>
    <div className="text-base-content/70">Active Users</div>
  </div>
  <div className="text-center">
    <div className="text-4xl font-bold text-base-content mb-2">50M+</div>
    <div className="text-base-content/70">Messages Daily</div>
  </div>
  <div className="text-center">
    <div className="text-4xl font-bold text-base-content mb-2">99.9%</div>
    <div className="text-base-content/70">Uptime Guarantee</div>
  </div>
</div>

      </div>
    </section>
  );
};

export default ChatFeatures;
