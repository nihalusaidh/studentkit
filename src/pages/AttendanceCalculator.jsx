import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function AttendanceCalculator() {
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [target, setTarget] = useState(75);

  const a = Number(attended) || 0;
  const t = Number(total) || 0;

  const isInvalid = t > 0 && a > t;
  const percentage = t > 0 && !isInvalid ? (a / t) * 100 : 0;

  let classesNeeded = 0;
  if (t > 0 && !isInvalid && percentage < target) {
    classesNeeded = Math.ceil((target * t - 100 * a) / (100 - target));
  }

  let canSkip = 0;
  if (t > 0 && !isInvalid && percentage >= target) {
    canSkip = Math.floor((100 * a - target * t) / target);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I calculate attendance percentage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Attendance percentage is calculated by dividing attended classes by total classes conducted and multiplying the result by 100.",
        },
      },
      {
        "@type": "Question",
        name: "How many classes do I need to attend for 75% attendance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter your attended classes, total classes, and target attendance as 75%. The calculator will show the exact number of classes you need to attend to reach 75%.",
        },
      },
      {
        "@type": "Question",
        name: "How many classes can I skip and still maintain 75% attendance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your current attendance is above your target, the calculator shows how many upcoming classes you can skip while staying above the selected attendance percentage.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this calculator for college attendance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this attendance calculator is useful for college, engineering, school, and university students who need to maintain minimum attendance.",
        },
      },
      {
        "@type": "Question",
        name: "Is ToolNest Attendance Calculator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest Attendance Calculator is completely free and works without login or registration.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolNest Attendance Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: "https://tools.nihalusaidh.com/attendance-calculator",
    description:
      "Free online Attendance Calculator to calculate attendance percentage, classes needed, and classes you can skip for 75%, 80%, 85%, or 90% attendance.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tools.nihalusaidh.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Attendance Calculator",
        item: "https://tools.nihalusaidh.com/attendance-calculator",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Attendance Calculator - Check Classes Needed for 75% | ToolNest
        </title>

        <meta
          name="description"
          content="Use ToolNest Attendance Calculator to calculate your attendance percentage, classes needed for 75%, and how many classes you can skip safely."
        />

        <meta
          name="keywords"
          content="attendance calculator, 75 attendance calculator, college attendance calculator, classes needed calculator, how many classes can I skip, attendance percentage calculator"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/attendance-calculator"
        />

        <meta
          property="og:title"
          content="Attendance Calculator - Calculate Classes Needed for 75%"
        />

        <meta
          property="og:description"
          content="Calculate attendance percentage, classes needed, and classes you can skip using ToolNest Attendance Calculator."
        />

        <meta
          property="og:url"
          content="https://tools.nihalusaidh.com/attendance-calculator"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Attendance Calculator for Students"
        />

        <meta
          name="twitter:description"
          content="Find your attendance percentage and check how many classes you need or can skip."
        />

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(softwareSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section>
          <h1 className="text-4xl font-bold mb-3">
            Attendance Calculator for Students
          </h1>

          <p className="text-slate-600 mb-8 leading-7">
            Use this free Attendance Calculator to calculate your current
            attendance percentage, find how many classes you need to attend to
            reach your target, and check how many classes you can safely skip
            while staying above 75%, 80%, 85%, or 90% attendance.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-5">
              Enter Attendance Details
            </h2>

            <input
              type="number"
              min="0"
              className="border p-3 w-full mb-3 rounded"
              placeholder="Classes attended"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
            />

            <input
              type="number"
              min="0"
              className="border p-3 w-full mb-3 rounded"
              placeholder="Total classes conducted"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />

            <label className="font-medium">Target Attendance</label>

            <select
              className="border p-3 w-full rounded mt-2"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            >
              <option value={75}>75%</option>
              <option value={80}>80%</option>
              <option value={85}>85%</option>
              <option value={90}>90%</option>
            </select>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-5">
              <p className="font-semibold text-blue-900">
                Want to track academic performance too?
              </p>

              <p className="text-sm text-blue-700 mt-1">
                After checking attendance, calculate your GPA or CGPA using
                ToolNest student calculators.
              </p>

              <div className="flex flex-wrap gap-3 mt-3">
                <Link
                  to="/gpa-calculator"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  GPA Calculator
                </Link>

                <Link
                  to="/cgpa-calculator"
                  className="bg-white text-blue-700 border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  CGPA Calculator
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-5">Attendance Result</h2>

            <div className="bg-blue-50 p-5 rounded-xl mb-4">
              <p className="text-slate-600">Current Attendance</p>

              <h3 className="text-4xl font-bold text-blue-600">
                {percentage.toFixed(2)}%
              </h3>
            </div>

            {isInvalid && (
              <p className="mt-4 text-red-600 font-medium">
                Attended classes cannot be more than total classes.
              </p>
            )}

            {t > 0 && !isInvalid && percentage < target && (
              <div className="bg-orange-50 p-5 rounded-xl">
                <p className="text-slate-600">
                  Classes needed to reach {target}%
                </p>

                <h3 className="text-3xl font-bold text-orange-600">
                  {classesNeeded}
                </h3>
              </div>
            )}

            {t > 0 && !isInvalid && percentage >= target && (
              <div className="bg-green-50 p-5 rounded-xl">
                <p className="text-slate-600">
                  Classes you can skip and still stay above {target}%
                </p>

                <h3 className="text-3xl font-bold text-green-600">
                  {canSkip}
                </h3>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to Use the Attendance Calculator
          </h2>

          <ol className="list-decimal list-inside text-slate-600 leading-8">
            <li>Enter the number of classes you have attended.</li>
            <li>Enter the total number of classes conducted.</li>
            <li>Select your target attendance percentage.</li>
            <li>
              The calculator will show your current attendance percentage.
            </li>
            <li>
              It will also show classes needed or classes you can skip.
            </li>
          </ol>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How is Attendance Percentage Calculated?
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            Attendance percentage is calculated by dividing the number of
            attended classes by the total number of classes conducted and then
            multiplying the result by 100.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl text-slate-700 mb-4">
            Attendance Percentage = (Classes Attended / Total Classes) × 100
          </div>

          <p className="text-slate-600 leading-7">
            Example: If you attended 45 classes out of 60 total classes, your
            attendance percentage is 75%. This calculator also helps you plan
            future attendance by showing how many classes you need to attend or
            how many classes you can miss.
          </p>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Why Students Use Attendance Calculator
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-slate-600 leading-7">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Maintain 75% Attendance
              </h3>
              <p>
                Many colleges require minimum attendance. This calculator helps
                you stay above your required attendance percentage.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Know Classes Needed
              </h3>
              <p>
                If your attendance is low, the tool shows how many more classes
                you need to attend to reach your target.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Check Safe Skips
              </h3>
              <p>
                If your attendance is already high, you can check how many
                classes you can skip safely.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Works for Any Target
              </h3>
              <p>
                Choose 75%, 80%, 85%, or 90% attendance based on your college or
                personal target.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Attendance Calculator FAQs
          </h2>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-800">
                How do I calculate attendance percentage?
              </h3>
              <p>
                Divide attended classes by total classes conducted and multiply
                by 100.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                How many classes do I need for 75% attendance?
              </h3>
              <p>
                Enter your attended classes and total classes, then select 75%
                as the target. The calculator will show the required number of
                classes.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                How many classes can I skip?
              </h3>
              <p>
                If your attendance is above the target, the calculator shows how
                many classes you can skip while staying above the selected
                percentage.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can college students use this?
              </h3>
              <p>
                Yes. It is useful for college, engineering, diploma, school, and
                university students.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Is this Attendance Calculator free?
              </h3>
              <p>
                Yes. ToolNest Attendance Calculator is free and works without
                login.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Related Student Tools</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/cgpa-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              CGPA Calculator
            </Link>

            <Link
              to="/gpa-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              GPA Calculator
            </Link>

            <Link
              to="/internal-marks-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              Internal Marks Calculator
            </Link>

            <Link
              to="/resume-builder"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              Resume Builder
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default AttendanceCalculator;