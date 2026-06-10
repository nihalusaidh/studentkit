import { Helmet } from "react-helmet-async";

function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <Helmet>
        <title>Privacy Policy | ToolNest</title>
        <meta
          name="description"
          content="Privacy Policy for ToolNest."
        />
      </Helmet>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-slate-700 leading-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">
            Information We Collect
          </h2>

          <p>
            ToolNest may collect basic usage information such as browser type,
            device information, pages visited and anonymous analytics data to
            improve user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            File Processing
          </h2>

          <p>
            Most ToolNest tools process files directly in your browser. We do
            not permanently store uploaded files on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Cookies
          </h2>

          <p>
            ToolNest may use cookies and similar technologies to improve site
            performance and understand website usage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Third-Party Services
          </h2>

          <p>
            We may use third-party services such as analytics and advertising
            providers that may collect anonymous usage data according to their
            own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Data Security
          </h2>

          <p>
            We take reasonable measures to protect user information. However,
            no online service can guarantee complete security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Changes to This Policy
          </h2>

          <p>
            This Privacy Policy may be updated periodically. Continued use of
            ToolNest indicates acceptance of any changes.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;