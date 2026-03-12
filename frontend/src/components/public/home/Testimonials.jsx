const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Product Manager",
      image: "https://i.ibb.co.com/zW795Zdb/im.jpg",
      text: "DashChat has revolutionized our team communication. The real-time features are outstanding!",
    },
    {
      id: 2,
      name: "Rahim Khan",
      role: "Team Lead",
      image: "https://i.ibb.co.com/kssN1PFb/hjk-hl.jpg",
      text: "Perfect for remote teams. File sharing and video calls work flawlessly.",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      role: "Student",
      image: "https://i.ibb.co.com/SDW2gpS5/lllllllllllll.jpg",
      text: "Great for group studies. The typing indicator is a game-changer!",
    },
    {
      id: 4,
      name: "Hasan Mahmud",
      role: "Freelancer",
      image: "https://i.ibb.co.com/7tzr92mT/hhhhhhhhh.jpg",
      text: "Best chat app for client communication. Simple and efficient!",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
  <div className="max-w-7xl mx-auto px-4">
    <div>
      {/* Section Heading */}
      <h1 className="text-3xl font-bold text-center text-primary mb-10">Testimonials</h1>

      
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="relative group bg-base-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 w-72 text-center"
          >
           
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />

            
            <p className="text-base-content/70 text-sm mb-4">"{item.text}"</p>

           
            <div className="flex justify-between text-xs font-bold text-base-content/50">
              <h1>{item.name}</h1>
              <p>{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  );
};

export default Testimonials;
