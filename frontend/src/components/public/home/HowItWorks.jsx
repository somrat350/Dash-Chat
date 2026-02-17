import { MessageSquare, Smile, UserPlus } from "lucide-react";

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
  ];

  return (
    <section className="py-14  bg-gray-50">
      <div className="max-w-6xl mx-auto px-4"></div>
      <h1 className="text-3xl font-bold  text-center">How It Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5 justify-items-center gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
          >
            <div className=" justify-center  mb-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
