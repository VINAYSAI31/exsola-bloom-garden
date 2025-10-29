import { Users, Award, Target, Lightbulb } from "lucide-react";

const Founders = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4 mr-2" />
            Meet Our Founders
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Visionaries Behind
            <span className="text-green-800 block">exsola sciences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate minds who are revolutionizing the mushroom industry 
            through innovation, research, and dedication to wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Founder 1 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center mb-6">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder Name</h3>
              <p className="text-green-800 font-semibold mb-4">Co-Founder & CEO</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Passionate about mushroom cultivation and wellness innovation. Leading the vision 
                to make premium mushroom products accessible to everyone through cutting-edge research 
                and sustainable practices.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Award className="w-4 h-4 mr-1" />
                  10+ Years Experience
                </div>
                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Target className="w-4 h-4 mr-1" />
                  Research Expert
                </div>
              </div>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder Name</h3>
              <p className="text-yellow-600 font-semibold mb-4">Co-Founder & CTO</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Technology innovator dedicated to advancing mushroom cultivation through 
                scientific research and modern techniques. Focused on creating sustainable 
                solutions for the future of functional foods.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Innovation Leader
                </div>
                <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  <Target className="w-4 h-4 mr-1" />
                  Tech Specialist
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
       
      </div>
    </section>
  );
};

export default Founders;
