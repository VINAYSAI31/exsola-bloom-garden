import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, AlertTriangle } from "lucide-react";

const ReturnRefund = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Return, Replacement & Refund Policy
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Exsola Sciences
            </p>
            <p className="text-gray-700 leading-relaxed">
              Thank you for choosing Exsola Sciences and trusting us with your mushroom journey 🌱 🍄
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We work with living, sensitive organisms, and we want you to have the best possible experience. If something goes wrong, here's how we help.
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Replacement Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">1.1 Mushroom Growing Kits (Pink / White / Golden / Grey Oyster, etc.)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are eligible for a replacement kit under the following conditions:
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">a) Kit is contaminated on arrival</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  If you notice visible contamination (unusual colours, foul smell, heavy mold, etc.) when you receive the kit,
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>You must notify Exsola within 24 hours of delivery.</li>
                  <li>Please send clear photos and your order details to our support team.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">b) Kit does not produce a harvest</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You may request a replacement if:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>It has been at least 15 days since you opened/started the kit, and</li>
                  <li>You have followed the instructions provided (cutting, misting, temperature, light, etc.), and</li>
                  <li>The kit has not produced any visible primordia (pins) or mushrooms.</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-yellow-800 mb-2">Important:</p>
                    <p className="text-yellow-700">
                      If you order a kit not suitable for your local climate or store it incorrectly (e.g., in extreme heat), we may not be able to replace it. Please refer to the temperature and climate guidelines on the product page before ordering.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">c) Proof of Purchase</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  To process any replacement, we require:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Order ID / invoice</li>
                  <li>Photos or videos of the issue</li>
                  <li>Date of receipt and date of opening the kit</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Because our products are living cultures and biological materials, they are sensitive to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Temperature</li>
                <li>Storage conditions</li>
                <li>Handling by the customer</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Due to this, we do not offer refunds on:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Mushroom Growing Kits</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Instead, we offer a one-time replacement (where applicable) if the issue meets our replacement criteria above.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to helping you succeed. In many cases, problems can be solved with troubleshooting. So before replacement, we may:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Ask for photos/videos</li>
                <li>Guide you on correct use, environment, and care</li>
                <li>Attempt to revive or optimise the current kit</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Once a one-time replacement has been issued for an order, no further replacements or refunds will be processed for the same order.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Returns</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At this time, we do not accept returns of:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Mushroom Growing Kits</li>
                <li>Any other biological products</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Returned kits can be damaged, stressed, or contaminated in transit, and cannot be reused or resold safely.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refunds for Events & Workshops</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For events, trainings, and workshops conducted by Exsola Sciences:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>If a refund is approved (for example, event cancellation by us, or special cases at our discretion),</li>
                <li>We will process the refund to your original method of payment (credit card / UPI / net banking, etc.).</li>
                <li>You can expect the refund within 7–10 working days, depending on your bank or payment provider.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Event-specific refund rules (such as cut-off times for cancellation) may be mentioned separately on the event registration page and will apply accordingly.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                Please read carefully before placing an order.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                All orders are final.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not offer order cancellations for any products or services once the order has been placed and confirmed.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Once payment is completed and the order is generated in our system, we cannot:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Change the items</li>
                <li>Change the address</li>
                <li>Cancel the order</li>
              </ul>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Notes</h3>
                
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Order Confirmation:</p>
                  <p className="text-gray-700">Once confirmed, the order cannot be altered or cancelled.</p>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Customer Responsibility:</p>
                  <p className="text-gray-700 mb-2">You are responsible for verifying:</p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                    <li>Product type</li>
                    <li>Quantity</li>
                    <li>Shipping address</li>
                    <li>Contact details</li>
                  </ol>
                  <p className="text-gray-700 mt-2">before final submission.</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Refunds in Special Cases:</p>
                  <p className="text-gray-700 mb-2">Since cancellations are not allowed, refunds will only be considered:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>If there is a product defect attributable to us, or</li>
                    <li>An error clearly on Exsola's side,</li>
                  </ul>
                  <p className="text-gray-700 mt-2">in line with this Return & Refund Policy.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. How to Request a Replacement or Raise an Issue</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To raise an issue or request a replacement, please contact us with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Order ID / Invoice copy</li>
                <li>Full name & phone number</li>
                <li>Photos or videos clearly showing the problem</li>
                <li>Date of delivery and date of opening the product</li>
                <li>Short description of storage and environmental conditions (room temp, location, etc.)</li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="font-semibold text-gray-800 mb-4">Contact Us:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5 text-green-700" />
                    <a href="mailto:exsolasciences@gmail.com" className="hover:text-green-600">exsolasciences@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-5 h-5 text-green-700" />
                    <a href="tel:+919492177157" className="hover:text-green-600">+91- 9492177157</a>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  We aim to respond as soon as possible and typically resolve issues within a reasonable time frame.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReturnRefund;
