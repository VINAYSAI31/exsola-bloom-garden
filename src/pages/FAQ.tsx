import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mushroom Growing Kit – FAQ
            </h1>
            <p className="text-xl text-gray-600">
              Exsola Sciences
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-0">
            {/* FAQ 1 */}
            <AccordionItem value="item-1" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                1. What is a mushroom growing kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  An Exsola Mushroom Growing Kit is a ready-to-grow mini mushroom farm that contains a fully colonized block of organic substrate infused with mushroom mycelium.
                </p>
                <p className="mb-3">
                  The mycelium stays dormant until you cut the window, mist the block, and provide fresh air. Once activated, your mushrooms start forming and you can enjoy your first harvest in 7-14 days (depending on the variety and climate).
                </p>
                <div className="flex items-center gap-2 text-green-700 mt-4">
                  <Sparkles className="w-5 h-5" />
                  <p className="font-semibold">No direct sunlight needed. Just cut → spray → harvest.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 2 */}
            <AccordionItem value="item-2" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                2. What is included in my mushroom growing kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Each Exsola kit contains:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>Organic straw substrate inoculated with Oyster mushroom spawn</li>
                  <li>A reusable spray bottle</li>
                  <li>Instructions for easy growing</li>
                </ul>
                <p>
                  Everything you need to grow your first mushrooms — no extra equipment or additives required.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 3 */}
            <AccordionItem value="item-3" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                3. How soon should I use my kit after it arrives?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Your kit contains a living organism (mycelium). We recommend starting it as soon as you receive it.
                </p>
                <p>
                  If left for too long in the box, the mushrooms may start pinning inside the bag. Open your kit early and give it fresh air and humidity for best results.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 4 */}
            <AccordionItem value="item-4" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                4. How do I use my mushroom growing kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Remove the substrate bag from the box and inspect for contamination.</li>
                  <li>If everything looks healthy, cut open the front perforated window.</li>
                  <li>Using a blade or scissors, make an 'X' cut on the plastic exactly within the window area.</li>
                  <li>Fill the spray bottle with clean drinking water (avoid untreated tap water).</li>
                  <li>Spray the opening 2–3 times a day, about 10–15 sprays per session.</li>
                  <li>Mushrooms will begin to pin in 7-14 days (may vary by climate).</li>
                  <li>Watch them double in size almost daily!</li>
                </ol>
                <p className="mt-4 font-semibold">
                  Patience + consistency = great mushrooms.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 5 */}
            <AccordionItem value="item-5" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                5. Should I take the substrate block out of the box?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3 font-semibold">No.</p>
                <p className="mb-3">
                  The box is designed to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Support the block</li>
                  <li>Maintain humidity</li>
                  <li>Direct fruiting to the window area</li>
                </ul>
                <p className="mt-3">
                  Removing the block can cause poor formation and side-fruiting.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 6 */}
            <AccordionItem value="item-6" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                6. Should I keep the kit vertically or horizontally?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p>
                  Keep the kit vertically. Oyster mushrooms are side-fruiting, and vertical placement encourages healthy mushroom clusters.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 7 */}
            <AccordionItem value="item-7" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                7. How do I know if my kit is contaminated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Check immediately on arrival:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>Green, black, or blue patches</li>
                  <li>Foul smell</li>
                  <li>Unusual fuzzy mold not matching Oyster mycelium</li>
                </ul>
                <p>
                  If you see contamination when the kit arrives, contact Exsola within 24 hours.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 8 */}
            <AccordionItem value="item-8" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                8. What should I do if my kit is contaminated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  If the kit arrives contaminated or damaged during shipping:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Exsola will replace it free of charge</li>
                  <li>You must notify us within 24 hours, with photos/videos</li>
                </ul>
                <p className="mb-4">
                  If contamination happens after opening the kit (due to environment, water, handling), dispose of the kit safely.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-800 mb-2">Note:</p>
                      <p className="text-blue-700 mb-2">
                        Yellow or brown patches are normal. These are metabolites produced by healthy mycelium and are not contamination.
                      </p>
                      <p className="text-blue-700">
                        If confused, just send us a picture — we'll guide you.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 9 */}
            <AccordionItem value="item-9" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                9. How many harvests can I get?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Every Exsola Growing Kit guarantees at least 1 successful harvest if instructions are followed correctly.
                </p>
                <p>
                  With good care (cool, humid air + fresh oxygen), many customers get 2–3 flushes.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 10 */}
            <AccordionItem value="item-10" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                10. When do I know it's time to harvest?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Harvest before the caps become fully flat or start curling upward.
                </p>
                <p className="mb-3">
                  Steps to harvest:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Hold the mushroom cluster at the base</li>
                  <li>Twist gently and pull</li>
                  <li>Or cut cleanly with a knife</li>
                  <li>Ensure no mushrooms remain attached (they may rot)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 11 */}
            <AccordionItem value="item-11" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                11. Should I harvest all mushrooms at once?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3 font-semibold">Yes.</p>
                <p>
                  Harvest the entire cluster together, including the small ones ("aborts"). Aborts stop growing and will not increase in size.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 12 */}
            <AccordionItem value="item-12" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                12. Why are some mushrooms oddly shaped?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Odd shapes usually occur when:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>There is low fresh air exchange</li>
                  <li>Humidity is inconsistent</li>
                  <li>Light exposure is insufficient</li>
                  <li>The environment is too dry or hot</li>
                </ul>
                <p>
                  Thin, elongated stems usually indicate oxygen shortage.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 13 */}
            <AccordionItem value="item-13" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                13. Where should I place the kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Best results occur in:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>A well-ventilated room</li>
                  <li>Indirect light (NOT dark, NOT direct sun)</li>
                  <li>A humid environment</li>
                  <li>Where there is natural airflow</li>
                </ul>
                <p>
                  Bathroom corners, kitchen counters, near windows (not sun-facing), and balcony corners work well.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 14 */}
            <AccordionItem value="item-14" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                14. How often should I spray the kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Spray 2–3 times daily, each time from 20 cm distance.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="font-semibold text-yellow-800 mb-2">Important:</p>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>You are not watering the block, only creating humidity</li>
                    <li>Do not spray directly on mushrooms once they start forming</li>
                    <li>Spray only on the plastic around the cut window</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 15 */}
            <AccordionItem value="item-15" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                15. How can I get more harvests from my kit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Provide:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>Consistent humidity</li>
                  <li>Fresh airflow</li>
                  <li>Stable temperature</li>
                  <li>Indirect light</li>
                  <li>No direct water on mushrooms</li>
                </ul>
                <p>
                  After harvesting, rest the block for 3–5 days, then resume spraying to encourage a second flush.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 16 */}
            <AccordionItem value="item-16" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                16. What yield should I expect?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  Yield varies due to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-3">
                  <li>Temperature</li>
                  <li>Humidity</li>
                  <li>Airflow</li>
                  <li>Handling</li>
                  <li>Mushroom variety</li>
                </ul>
                <p>
                  Each kit will produce at least one healthy harvest. Some may produce more.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 17 */}
            <AccordionItem value="item-17" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                17. How long does it take for mushrooms to grow?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Pinning usually occurs within 7–14 days</li>
                  <li>Fruiting takes an additional 3–7 days</li>
                  <li>Total time varies by climate and care</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 18 */}
            <AccordionItem value="item-18" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                18. Mushrooms are growing inside the plastic! Should I cut there?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3 font-semibold">No.</p>
                <p>
                  Only cut at the designated front window. Extra cuts can reduce yield and cause contamination.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 19 */}
            <AccordionItem value="item-19" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                19. What substrate does Exsola use?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="mb-3">
                  We use organically sourced paddy straw substrate, chosen for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>High yield</li>
                  <li>Clean growth</li>
                  <li>Strong mycelial colonization</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 20 */}
            <AccordionItem value="item-20" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                20. Is the kit vegan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="font-semibold">
                  Yes. 100% vegan.
                </p>
                <p className="mt-2">
                  Our substrate, spawn, and processes use no animal products.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* FAQ 21 */}
            <AccordionItem value="item-21" className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 py-4 hover:no-underline [&[data-state=open]]:text-green-800 [&[data-state=open]]:underline">
                21. Is the plastic BPA-free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                <p className="font-semibold">
                  Yes.
                </p>
                <p className="mt-2">
                  We use PP5 food-grade, BPA-free plastic, the same material used for baby bottles and food containers.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
