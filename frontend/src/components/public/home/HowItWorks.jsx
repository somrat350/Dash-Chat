import { Bell, MessageSquare, Smile, UserPlus } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Account",
      description: "Sign up easily with your email and set up your profile.",
      icon: <UserPlus className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Start Chatting",
      description: "Connect with friends and send messages instantly.",
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Enjoy Features",
      description: "Use voice, video calls and customize your settings.",
      icon: <Smile className="w-8 h-8 text-purple-600" />,
    },
    
    {
      title: "Stay Connected", 
      description: "Receive notifications and stay in touch with your community.",
      icon: <Bell className="w-8 h-8 text-red-600" />,
    },
  ];

  return (
   <section className="py-20 bg-base-100">
  <div className="max-w-7xl mx-auto px-14 sm:px-5 md:px-2">
    <h1 className="text-3xl md:text-4xl text-primary font-bold text-center mb-10">
      How It Works
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 justify-items-center gap-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative group bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-8 text-center w-72"
        >
        
          <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-base-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {step.icon}
            </div>
          </div>

          
          <h3 className="text-xl font-semibold text-base-content mb-3">{step.title}</h3>

        
          <p className="text-sm text-base-content/70">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default HowItWorks;
