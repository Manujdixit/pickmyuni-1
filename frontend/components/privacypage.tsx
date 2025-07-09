import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="/globe.png"
          alt="Library with books on shelves"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Privacy Policy{" "}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Header Section */}
        <p className="text-gray-600 text-lg font-normal mb-8">
          At pickmyuni.com, operated by Stepping Stones Career Solutions, we
          value and respect your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your personal information when
          you visit our website and use our services. By using our website, you
          agree to the collection and use of information in accordance with this
          policy.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              When you visit or use PickMyUni.com, we may collect the following
              types of information:
            </p>
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-xl font-medium text-brand-secondary mb-2">
                  a) Personal Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Mobile Number</li>
                  <li>Location/City</li>
                  <li>Educational Preferences (Courses, Colleges, etc.)</li>
                  <li>
                    Any additional information you provide voluntarily (e.g.,
                    through forms, chat support)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-brand-secondary mb-2">
                  b) Non-Personal Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>IP Address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Cookies and usage data (to improve user experience)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-brand-secondary mb-2">
                  c) User Communications and Consent
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    Enquiry form: I authorise INDO INTERNET PRIVATE LIMITED &
                    its representatives to contact me with updates and
                    notifications via Email/SMS/What&apos;sApp/Call. This will
                    override DND/NDNC.
                  </li>
                  <li>
                    User Communications and Consent : When you voluntarily send
                    us electronic mail / fill up the form, we will keep a record
                    of this information so that we can respond to you. We only
                    collect information from you when you register on our site
                    or fill out a form. Also, when filling out a form on our
                    site, you may be asked to enter your: name, e-mail address
                    or phone number. You may, however, visit our site
                    anonymously. In case you have submitted your personal
                    information and contact details, we and our partners reserve
                    the rights to Call, SMS, Email or WhatsApp about our
                    products and offers, even if your number has DND activated
                    on it.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-2">
              We may use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>To provide educational counseling and guidance.</li>
              <li>
                To share your information with partnered colleges/universities
                to help you with admissions.
              </li>
              <li>
                To send promotional content related to educational services (via
                SMS, Email, WhatsApp).
              </li>
              <li>To respond to your queries or requests.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>For internal record-keeping and legal compliance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              3. Sharing of Information
            </h2>
            <p className="text-gray-600 mb-2">
              We may share your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>
                With partnered colleges/universities for admission and
                counseling purposes.
              </li>
              <li>
                With third-party service providers who assist us in operating
                our website (under confidentiality agreements).
              </li>
              <li>When required by law or legal processes.</li>
            </ul>
            <p className="text-gray-600 mt-2">
              We do not sell your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600">
              We may use cookies and similar technologies to enhance your
              browsing experience, analyze site traffic, and personalize
              content. You can manage cookie preferences through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure, so we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              6. Your Choices & Rights
            </h2>
            <p className="text-gray-600 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>
                Access, update, or delete your personal information by
                contacting us.
              </li>
              <li>
                Opt-out of receiving promotional communications at any time by
                using the unsubscribe link in emails or contacting us directly.
              </li>
              <li>Request information about how your data is being used.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              7. Third-Party Links
            </h2>
            <p className="text-gray-600">
              Our website may contain links to external websites. We are not
              responsible for the privacy practices or content of these
              third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy periodically. Any changes will
              be posted on this page, and your continued use of the website
              after updates signifies your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-600 mb-2">
              For any concerns regarding this Privacy Policy, please contact:
            </p>
            <p className="text-brand-secondary">Support Team: PickMyUni</p>
            <p className="text-brand-secondary">Email: contact@pickmyuni.com</p>
          </section>

          <p className="text-gray-600 text-sm mt-8">
            By using KollegeApply.com, you acknowledge and agree to this Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
