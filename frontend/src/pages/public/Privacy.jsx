import { ArrowRight, MessageCircle } from "lucide-react";

const Privacy = () => {
  return (
    <div>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <div>
              <h2 className="text-7xl font-bold text-gray-900 mb-6">
                Message <br />
                <span className="text-primary ">privately</span>
              </h2>

              <p className="text-2xl  text-gray-700 leading-relaxed">
                Your privacy is our priority. With end-to-end encryption, your
                personal messages, photos, and calls stay between you and the
                people you choose — meaning not even DashChat can see them.
              </p>
            </div>

            {/* Image Section */}
            <div>
              <img
                src="https://i.ibb.co/0VcBMqq6/whatsappmess.png"
                alt="Privacy illustration"
                className="rounded-2xl shadow-2xl w-full transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* secoend section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Heading */}
          <h3 className="text-4xl  font-semibold text-gray-800 ">
            Whether it’s your confessions, your difficult debates, or <br />
            silly inside jokes, DashChat privacy helps your <br />
            conversations stay protected.
          </h3>

          {/* Numbers Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-8">
            {/* Card 1 */}
            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-black mb-4">
                End-to-end encryption
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Personal messages, calls, photos and videos are secured with
                end-to-end encryption on DashChat. Only you and the recipient
                have the special key needed to unlock and read them.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-black mb-4">
                Additional layers of privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Beyond end-to-end encryption, DashChat offers additional layers
                of protection to keep all of your conversations secure.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-bold text-black mb-4">
                Control the privacy you need
              </h2>
              <p className="text-gray-600 leading-relaxed">
                With DashChat privacy settings, you choose what you share, how
                you appear online, and who can contact you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section>
        <div className="py-16 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div>
              <img
                src="https://i.ibb.co.com/8gCmp2Yj/whatsapp-chat-lock-feature.webp"
                alt="Privacy illustration"
                className="rounded-2xl shadow-2xl w-full transition duration-300 hover:scale-105"
              />
            </div>
            {/* Text Section */}
            <div>
              <h2 className="text-7xl font-bold text-gray-900 mb-6">
                Chat <span className="text-primary ">Lock</span>
              </h2>

              <p className="text-2xl  text-gray-700 ">
                Password protect your most personal chats so you can help keep
                them private and secure. Locked chats will be hidden from your
                chats list in the Locked Chats folder, so you can prevent anyone
                else using your phone from seeing them.
              </p>
              <button className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-white rounded-2xl group cursor-pointer">
                {/* Text */}
                <span className="relative z-10 text-secondary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Learn More
                </span>

                {/* Background overlay */}
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 4th section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Built with Privacy <br />
                <span className="text-green-400">at the Core</span>
              </h2>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Every message you send is protected with advanced encryption
                technology. Your chats, calls, and shared media remain
                completely secure and visible only to you and the recipient.
              </p>
              <button className="relative overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary  group cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowRight size={20} /> Explore Privacy Features
                </span>

                {/* Background  */}
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>
            </div>

            {/* Right Card */}
            <div className="bg-gray-50 p-8 rounded-3xl shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-black">
                    End-to-End Encryption
                  </h4>
                  <p className="text-gray-700 mt-2">
                    Only you and the recipient can read your messages.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-black">
                    Advanced Protection
                  </h4>
                  <p className="text-gray-700 mt-2">
                    Extra layers of privacy keep your data safe.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-black">
                    Full Control
                  </h4>
                  <p className="text-gray-700 mt-2">
                    Manage who sees your info and who can contact you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            WhatsApp keeps your conversations private, secure, and reliable.
            Here are some numbers that show how we connect the world safely.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-primary mb-2">2B+</h3>
              <p className="text-gray-600 text-lg">Active Users</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-primary mb-2">100B+</h3>
              <p className="text-gray-600 text-lg">Messages Daily</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-5xl font-bold text-primary mb-2">180+</h3>
              <p className="text-gray-600 text-lg">Countries Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* security*/}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div>
              <img
                src="https://i.ibb.co.com/twjd3mhp/download.png"
                alt="Security illustration"
                className="w-full rounded-3xl shadow-2xl"
              />
            </div>

            {/* Right Tips */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Top Security Tips
              </h2>
              <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
                Keep your WhatsApp account safe with these recommended security
                tips.
              </p>

              <div className="space-y-6">
                {/* Tip 1 */}
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    Enable Two-Step Verification
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Add an extra layer of protection to your account by enabling
                    two-step verification in settings.
                  </p>
                </div>

                {/* Tip 2 */}
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    Check Encryption
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Make sure your chats are end-to-end encrypted. Only you and
                    the recipient can read the messages.
                  </p>
                </div>

                {/* Tip 3 */}
                <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    Be Careful with Links & Codes
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Avoid clicking on suspicious links and never share your
                    verification codes with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* lest section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Need more <span className="text-primary ">help?</span>
            </h2>
            <p className="text-lg text-gray-600">
              Answering your questions about privacy on DashChat.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-black cursor-pointer">
                What is end-to-end encryption?
              </h3>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-black cursor-pointer">
                What is two-step verification?
              </h3>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-black cursor-pointer">
                Is WhatsApp private and secure?
              </h3>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-black cursor-pointer">
                How to change your privacy settings on WhatsApp
              </h3>
            </div>
          </div>

          {/* See All FAQs Button */}
          <div className="text-center mt-12">
            <button className="relative overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary  group cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                <ArrowRight size={20} /> See all FAQs
              </span>

              {/* Background overlay */}
              <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
