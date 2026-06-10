import { Helmet } from "react-helmet-async";

function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <Helmet>
        <title>Terms & Conditions | ToolNest</title>
        <meta name="description" content="Terms and Conditions for ToolNest." />
      </Helmet>

      <h1 className="text-4xl md:text-5xl font-bold mb-8">
        Terms & Conditions
      </h1>

      <div className="space-y-8 text-slate-700 leading-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">Use of ToolNest</h2>
          <p>
            ToolNest provides free online academic, image and PDF tools. By
            using this website, you agree to use the tools responsibly and
            legally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Accuracy of Tools</h2>
          <p>
            We try to provide accurate results, but ToolNest does not
            guarantee that every calculation, conversion or output will be
            error-free. Users should verify important results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">File Usage</h2>
          <p>
            Users are responsible for the files they upload and process. Do not
            upload copyrighted, illegal or harmful files.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Limitation of Liability</h2>
          <p>
            ToolNest is not responsible for data loss, file issues, academic
            decisions or damages caused by using the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Changes to Terms</h2>
          <p>
            These terms may be updated from time to time. Continued use of the
            website means you accept the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Terms;