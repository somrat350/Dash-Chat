import { Mail, Phone, MapPin } from "lucide-react";

const Location = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Our <span className="text-primary">Office</span>
          </h2>
        </div>
        {/*map */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="rounded-2xl overflow-hidden shadow-2xl h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902768615873!2d90.3910578!3d23.7509045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087f0c6c1%3A0x6d7e6f3b3e3b3e3b!2sDhaka!5e0!3m2!1sen!2sbd!4v1633000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office Location"
              className="w-full h-full"
            ></iframe>
          </div>
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-900">
                      support@dashchat.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">
                      +880 1234 567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Dhaka, Bangladesh
                    </p>
                    <p className="text-gray-600">
                      123 Business Avenue, Floor 5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-linear-to-br from-green-400 to-green-200 p-8 rounded-3xl text-gray-800 shadow-xl hover:shadow-2xl transition duration-300">
              <h4 className="text-2xl font-bold mb-6 text-center">
                Business Hours
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <span className="font-medium">Saturday - Thursday</span>
                  <span className="font-semibold">8:00 AM - 10:00 PM</span>
                </div>

                <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <span className="font-medium">Friday</span>
                  <span className="font-semibold text-red-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
