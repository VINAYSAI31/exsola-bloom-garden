import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              TERMS & CONDITIONS
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Exsola Sciences
            </p>
            <p className="text-sm text-gray-500">
              Last updated: 10/12/2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to exsola.com ("Website"), owned and operated by Exsola Sciences Pvt. Ltd. ("Exsola", "we", "us", "our").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using this Website, you agree to be bound by the following Terms & Conditions ("User Agreement"). If you do not agree, please discontinue use of the Website immediately.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Exsola reserves the right to modify, update, or replace any part of this User Agreement at any time without prior notice. It is your responsibility to review these Terms periodically.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For queries, feedback, or complaints, contact:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:exsolasciences@gmail.com" className="hover:text-green-600">exsolasciences@gmail.com</a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" />
                  <a href="tel:9492987157" className="hover:text-green-600">9492987157</a>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Ownership of Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on the Website—including text, graphics, images, videos, logos, trademarks, and software—is the intellectual property of Exsola Sciences Pvt. Ltd. or its licensors.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not copy, reproduce, publish, distribute, modify, upload, create derivative works, or commercially exploit any part of the Website without explicit written permission from Exsola.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Personal, non-commercial use is permitted.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Accuracy of Content & Invitation to Offer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We try our best to ensure that all product descriptions, prices, images, and details are accurate at the time of publishing. However:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Colours may vary depending on your screen.</li>
                <li>Packaging may differ from images shown.</li>
                <li>Weights, dimensions, and capacities are approximate.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All product listings are an invitation to offer. Your order is considered an offer, which we may accept or reject. Acceptance occurs only when the product is dispatched.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Quantity Restrictions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Exsola reserves the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Limit product quantities per person/household/order.</li>
                <li>Restrict orders using the same address, email, or payment method.</li>
                <li>Refuse service or cancel orders at our discretion.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Customers will be notified when such restrictions apply.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pricing Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive for accurate pricing, errors may occur. If a product is listed incorrectly:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>We may cancel or reject the order before dispatch.</li>
                <li>If payment has been processed, we will refund the full amount.</li>
                <li>Prices and availability are subject to change without notice.</li>
                <li>Discounts, promotions, and coupon codes may have exclusions.</li>
                <li>No order is considered accepted until it is dispatched.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Indemnity</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Exsola, its employees, directors, officers, and affiliates from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Your misuse of the Website</li>
                <li>Violation of these Terms</li>
                <li>Infringement of intellectual property rights</li>
                <li>Violation of applicable laws</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                This clause survives termination of this agreement.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Eligibility to Use</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>You must be legally capable of entering a binding contract under the Indian Contract Act, 1872.</li>
                <li>The Website is not available to users whose accounts have been suspended or terminated.</li>
                <li>If registering as a business, you confirm you have authority to bind the organisation.</li>
                <li>Exsola only delivers within India.</li>
                <li>Users accessing the Website from restricted states or outside India are responsible for complying with local laws.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using the Website, you consent to the collection and use of your information according to our Privacy Policy. Key points:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Information provided is voluntary.</li>
                <li>You may update, modify, or withdraw consent (not retroactively).</li>
                <li>We automatically collect technical data such as IP address, device type, browser details, etc.</li>
                <li>Temporary cookies may be used for website performance and analytics.</li>
                <li>Third-party advertising partners may use non-personal cookies.</li>
                <li>We do not store sensitive payment information.</li>
                <li>We are not responsible for third-party websites linked on our platform.</li>
                <li>If you are unhappy with our data practices, please discontinue using the Website.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Refusal of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may suspend or cancel service at any time if:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Technical issues arise</li>
                <li>Malicious activity is detected</li>
                <li>Terms of use are violated</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We reserve full right to refuse service to anyone.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Promotional Communications</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using our Website, you agree that we may contact you via:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Email</li>
                <li>SMS</li>
                <li>Phone</li>
                <li>Push notifications</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You may unsubscribe at any time via the "unsubscribe" link or by contacting support. We will process such requests within 7 working days.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Financial Details</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>You confirm that the payment information provided is accurate and legitimately yours.</li>
                <li>Payment details are processed directly by our payment gateway; Exsola does not store sensitive data.</li>
                <li>Exsola will not be liable for fraudulent transactions.</li>
                <li>Recovery actions may be taken against fraudulent users, including legal proceedings.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Communication</h2>
              <p className="text-gray-700 leading-relaxed">
                When you communicate with us electronically, you consent to receive electronic communication from us. All notices, agreements, and disclosures provided electronically satisfy legal requirements.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. User Feedback & Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any comments, suggestions, reviews, ideas, or materials submitted to Exsola become our property.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By submitting content, you grant Exsola:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Worldwide rights</li>
                <li>To use, modify, reproduce, publish, display, distribute</li>
                <li>Without compensation</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You agree not to submit unlawful, defamatory, inappropriate, or copyrighted material without permission.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Copyright & Trademark</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>All trademarks, names, and branding — including Exsola Sciences, product names, and logos — belong to Exsola.</li>
                <li>You may not use our trademarks without written approval.</li>
                <li>All Website content is protected by Indian and international copyright laws.</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Objectionable Material</h2>
              <p className="text-gray-700 leading-relaxed">
                While using the Website, you may encounter content some users may find offensive. You agree to use the Website at your own risk. Exsola is not liable for such content.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Either party may terminate this User Agreement at any time.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Exsola may:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Deny access</li>
                <li>Terminate accounts</li>
                <li>Remove content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon termination, you must stop using the Website and destroy any downloaded materials.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Pending payments remain payable.
              </p>
            </section>

            {/* Section 17 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Website is provided "as is", without warranties.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Exsola is not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Technical issues</li>
                <li>Data loss</li>
                <li>Website downtime</li>
                <li>Errors in product information</li>
                <li>Indirect, incidental, or consequential damages</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our maximum liability is limited to the value of the product ordered.
              </p>
            </section>

            {/* Section 18 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Website Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are prohibited from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Attempting to breach Website security</li>
                <li>Interfering with network operations</li>
                <li>Accessing unauthorized data</li>
                <li>Uploading harmful code</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Violations may result in legal action.
              </p>
            </section>

            {/* Section 19 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms constitute the complete agreement between you and Exsola. If any clause is found invalid, the rest of the Terms remain enforceable.
              </p>
            </section>

            {/* Section 20 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For grievances, queries, or support, contact:
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-gray-700" />
                <a href="mailto:exsolasciences@gmail.com" className="text-gray-700 hover:text-green-600">exsolasciences@gmail.com</a>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We aim to resolve queries within 2 days.
              </p>
            </section>

            {/* Section 21 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">21. Health-Related Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Information on this Website is not medical advice. Products, including dietary supplements and mushroom extracts, are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Consult a doctor before using any supplement.</li>
                <li>Individual results vary from person to person.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;
