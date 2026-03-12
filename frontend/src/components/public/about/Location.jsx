import { Mail, Phone, MapPin } from "lucide-react";

const Location = () => {
  return (
  <section className="py-20 bg-base-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-base-content mb-4">
        Visit Our <span className="text-primary">Office</span>
      </h2>
    </div>

    {/* Map + Contact Info */}
    <div className="grid md:grid-cols-2 gap-12">
      
      <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border-2 border-base-200">
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
        
        <div className="bg-base-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border-2 border-transparent hover:border-primary">
          <h3 className="text-2xl font-bold text-base-content mb-6">
            Get in Touch
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Email</p>
                <p className="text-lg font-semibold text-base-content">
                  support@dashchat.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Phone</p>
                <p className="text-lg font-semibold text-base-content">
                  +880 1234 567890
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Address</p>
                <p className="text-lg font-semibold text-base-content">
                  Dhaka, Bangladesh
                </p>
                <p className="text-base-content/70">
                  123 Business Avenue, Floor 5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-linear-to-br from-primary/20 to-secondary/20 p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border-2 border-transparent hover:border-primary">
          <h4 className="text-2xl font-bold mb-6 text-center text-base-content">
            Business Hours
          </h4>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-base-100 px-4 py-3 rounded-xl border-2 border-transparent hover:border-primary transition-colors duration-300">
              <span className="font-medium text-base-content">Saturday - Thursday</span>
              <span className="font-semibold text-base-content">8:00 AM - 10:00 PM</span>
            </div>

            <div className="flex justify-between items-center bg-base-100 px-4 py-3 rounded-xl border-2 border-transparent hover:border-primary transition-colors duration-300">
              <span className="font-medium text-base-content">Friday</span>
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
