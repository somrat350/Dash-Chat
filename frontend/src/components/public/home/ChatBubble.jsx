const ChatBubble = () => {
  return (
    <section className="py-14 flex flex-col gap-6">
      {/* 1st Message */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50 ml-2">12:45</time>
        </div>
        <div className="chat-bubble">Hi!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>

      {/* 2nd Message */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50 ml-2">12:46</time>
        </div>
        <div className="chat-bubble">Hello!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>

      {/* 3rd Message */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50 ml-2">12:47</time>
        </div>
        <div className="chat-bubble">How are you today?</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>

      {/* 4th Message */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50 ml-2">12:48</time>
        </div>
        <div className="chat-bubble">I am good, thanks! How about you?</div>
        <div className="chat-footer opacity-50">Seen at 12:48</div>
      </div>

      {/* 5th Message */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50 ml-2">12:49</time>
        </div>
        <div className="chat-bubble">Doing great! Ready for the mission?</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>

      {/* 6th Message */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50 ml-2">12:50</time>
        </div>
        <div className="chat-bubble">Absolutely! Let’s do this!</div>
        <div className="chat-footer opacity-50">Seen at 12:50</div>
      </div>
      <div className="flex flex-col justify-center max-w-5xl mx-auto"> 
        <h1 className="text-3xl lg:text-[50px] text-center text-gray-900 leading-12 font-medium">With private messaging and calling, you can be yourself, speak freely and feel close to the most important people in your life no matter where they are.</h1>
      </div>
    </section>
  );
};

export default ChatBubble;
