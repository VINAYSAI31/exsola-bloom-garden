const HowWeMake = () => {
  return (
    <section id="founders" className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-5">
              Founders' Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Two Stories. <span className="text-green-800">One Mission.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Clean, professional storytelling aligned with Exsola’s nature-forward ethos.
            </p>

            <div className="mt-8 rounded-2xl bg-white/70 backdrop-blur-sm ring-1 ring-black/5 shadow-sm">
              <div className="p-6 lg:p-8">
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p>
                    In a quiet farming village, my co-founder Akhil grew up watching fields of grain sway in the wind. Every harvest left behind mountains of dry straw. With no easy use for it, the straw was set on fire, filling the air with smoke and ash. He kept asking himself: "Isn't there a better way?" That question became an idea - to turn this agricultural "waste" into a resource by using it for mushroom cultivation, creating food and income instead of pollution.
                  </p>
                  <p>
                    Far away, I (Edith) was born and raised in a bustling, developed city. Here, the problem wasn't burning straw but the rising fear around chemical-based medications. I saw how many people hesitated to take pills filled with synthetic compounds, longing instead for safe, natural alternatives. Those experiences planted another idea in me that mushrooms could provide the same benefits in a completely organic way through liquid extracts, powders, and DIY kits.
                  </p>
                  <div className="border-l-4 border-green-700/20 pl-4 italic text-gray-800">
                    Two very different paths. Two different problems. But the same belief: nature holds the answers.
                  </div>
                  <p>
                    So we joined hands and created Exsola a company built to transform waste into life and bring the healing power of mushrooms into everyday homes. Together, we're making a sustainable difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeMake;
