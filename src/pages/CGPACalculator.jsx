import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function CGPACalculator() {
  const [semesterCount, setSemesterCount] = useState(1);
  const [semesters, setSemesters] = useState([{ gpa: "", credits: "" }]);
  const [useCredits, setUseCredits] = useState(false);

  const handleSemesterCount = (value) => {
    const count = Math.max(1, Math.min(12, Number(value) || 1));
    setSemesterCount(count);

    const updated = [];
    for (let i = 0; i < count; i++) {
      updated.push(semesters[i] || { gpa: "", credits: "" });
    }

    setSemesters(updated);
  };

  const updateSemester = (index, field, value) => {
    const updated = [...semesters];

    if (value === "") {
      updated[index][field] = "";
    } else {
      let num = Number(value);

      if (field === "gpa") {
        if (num > 10) num = 10;
        if (num < 0) num = 0;
      }

      if (field === "credits" && num < 0) {
        num = 0;
      }

      updated[index][field] = num;
    }

    setSemesters(updated);
  };

  const totalGpa = semesters.reduce(
    (sum, sem) => sum + (Number(sem.gpa) || 0),
    0
  );

  const simpleCgpa = semesterCount > 0 ? totalGpa / semesterCount : 0;

  const totalCredits = semesters.reduce(
    (sum, sem) => sum + (Number(sem.credits) || 0),
    0
  );

  const weightedPoints = semesters.reduce((sum, sem) => {
    return sum + (Number(sem.gpa) || 0) * (Number(sem.credits) || 0);
  }, 0);

  const weightedCgpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;

  const finalCgpa = useCredits ? weightedCgpa : simpleCgpa;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a CGPA calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A CGPA calculator is an online tool that helps students calculate their cumulative grade point average using semester GPA values.",
        },
      },
      {
        "@type": "Question",
        name: "How is CGPA calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CGPA is calculated by averaging semester GPA values. If credits are used, each semester GPA is multiplied by credits and divided by total credits.",
        },
      },
      {
        "@type": "Question",
        name: "Can engineering students use this CGPA calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this CGPA calculator is useful for engineering, arts, science, commerce, diploma, and college students using a 10-point GPA system.",
        },
      },
      {
        "@type": "Question",
        name: "Is this CGPA calculator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest CGPA Calculator is completely free and does not require login or registration.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between GPA and CGPA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPA usually represents one semester's performance, while CGPA represents overall academic performance across multiple semesters.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolNest CGPA Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: "https://tools.nihalusaidh.com/cgpa-calculator",
    description:
      "Free online CGPA Calculator for college and engineering students. Calculate simple and credit-weighted CGPA instantly.",
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
        name: "CGPA Calculator",
        item: "https://tools.nihalusaidh.com/cgpa-calculator",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Free CGPA Calculator for Engineering & College Students | ToolNest
        </title>

        <meta
          name="description"
          content="Calculate your CGPA instantly with ToolNest's free CGPA Calculator. Supports semester GPA, credit-weighted CGPA, and 10-point grading for college students."
        />

        <meta
          name="keywords"
          content="CGPA calculator, free CGPA calculator, engineering CGPA calculator, college CGPA calculator, semester GPA calculator, credit weighted CGPA calculator, GPA to CGPA"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/cgpa-calculator"
        />

        <meta
          property="og:title"
          content="Free CGPA Calculator for College Students | ToolNest"
        />

        <meta
          property="og:description"
          content="Calculate simple and credit-weighted CGPA online for free. Best CGPA calculator for engineering and college students."
        />

        <meta
          property="og:url"
          content="https://tools.nihalusaidh.com/cgpa-calculator"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Free CGPA Calculator for College Students"
        />

        <meta
          name="twitter:description"
          content="Calculate your CGPA instantly using semester GPA and credits."
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
            Free CGPA Calculator for College Students
          </h1>

          <p className="text-slate-600 mb-8 leading-7">
            Use this free CGPA Calculator to calculate your cumulative grade
            point average from semester GPA scores. It supports both simple CGPA
            calculation and credit-weighted CGPA calculation.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">
            Calculate Your CGPA Online
          </h2>

          <label className="font-medium">How many semesters completed?</label>

          <input
            type="number"
            min="1"
            max="12"
            className="border p-3 rounded w-full mt-2 mb-5"
            value={semesterCount}
            onChange={(e) => handleSemesterCount(e.target.value)}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
            <p className="font-semibold text-blue-900">
              Don't know your semester GPA?
            </p>

            <p className="text-sm text-blue-700 mt-1">
              Calculate your semester GPA first, then enter it here to find your
              final CGPA.
            </p>

            <Link
              to="/gpa-calculator"
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Open GPA Calculator
            </Link>
          </div>

          <label className="flex items-center gap-2 mb-5">
            <input
              type="checkbox"
              checked={useCredits}
              onChange={(e) => setUseCredits(e.target.checked)}
            />
            Use semester credits for more accurate CGPA
          </label>

          <div className="grid md:grid-cols-3 gap-3 font-semibold mb-3">
            <p>Semester</p>
            <p>GPA</p>
            {useCredits && <p>Credits</p>}
          </div>

          {semesters.map((sem, index) => (
            <div
              key={index}
              className={`grid ${
                useCredits ? "md:grid-cols-3" : "md:grid-cols-2"
              } gap-3 mb-3`}
            >
              <div className="border p-3 rounded bg-slate-50">
                Semester {index + 1}
              </div>

              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                className="border p-3 rounded"
                placeholder="GPA out of 10"
                value={sem.gpa}
                onChange={(e) =>
                  updateSemester(index, "gpa", e.target.value)
                }
              />

              {useCredits && (
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded"
                  placeholder="Semester credits"
                  value={sem.credits}
                  onChange={(e) =>
                    updateSemester(index, "credits", e.target.value)
                  }
                />
              )}
            </div>
          ))}

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-slate-600">Your CGPA</p>

              <h2 className="text-4xl font-bold text-blue-600">
                {finalCgpa.toFixed(2)}
              </h2>
            </div>

            <div className="bg-green-50 p-5 rounded-xl">
              <p className="text-slate-600">Semesters Completed</p>

              <h2 className="text-4xl font-bold text-green-600">
                {semesterCount}
              </h2>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <p className="text-slate-600">
                {useCredits ? "Total Credits" : "Total GPA Points"}
              </p>

              <h2 className="text-4xl font-bold text-purple-600">
                {useCredits ? totalCredits : totalGpa.toFixed(2)}
              </h2>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to Use the CGPA Calculator
          </h2>

          <ol className="list-decimal list-inside text-slate-600 leading-8">
            <li>Enter the number of semesters completed.</li>
            <li>Enter your GPA for each semester.</li>
            <li>
              If your college uses credits, enable the credit-weighted option.
            </li>
            <li>Enter semester credits if required.</li>
            <li>Your CGPA will be calculated instantly.</li>
          </ol>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How is CGPA Calculated?
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            CGPA stands for Cumulative Grade Point Average. It represents your
            overall academic performance across multiple semesters. In the
            simple method, CGPA is calculated by adding all semester GPA values
            and dividing the total by the number of semesters.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl text-slate-700 mb-4">
            Example: CGPA = (8.2 + 8.6 + 9.0 + 8.8) / 4 = 8.65
          </div>

          <p className="text-slate-600 leading-7">
            Some colleges use credit-weighted CGPA. In that method, each
            semester GPA is multiplied by semester credits. Then the total grade
            points are divided by total credits.
          </p>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Why Use ToolNest CGPA Calculator?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-slate-600 leading-7">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">Fast and Free</h3>
              <p>Calculate CGPA instantly without login or registration.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Student Friendly
              </h3>
              <p>
                Designed for college and engineering students using a 10-point
                grading system.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Credit Support
              </h3>
              <p>
                Supports both simple CGPA and credit-weighted CGPA calculation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Mobile Friendly
              </h3>
              <p>
                Works smoothly on mobile, tablet, laptop, and desktop devices.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">CGPA Calculator FAQs</h2>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-800">
                What is a CGPA calculator?
              </h3>
              <p>
                A CGPA calculator is an online tool that calculates your
                cumulative grade point average using your semester GPA values.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                How is CGPA different from GPA?
              </h3>
              <p>
                GPA usually refers to one semester's academic score, while CGPA
                refers to overall academic performance across multiple
                semesters.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can I calculate credit-weighted CGPA?
              </h3>
              <p>
                Yes. Turn on the credit option and enter semester credits to
                calculate credit-weighted CGPA.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Is this useful for engineering students?
              </h3>
              <p>
                Yes. This calculator is useful for engineering and college
                students who follow a 10-point GPA system.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Is ToolNest CGPA Calculator free?
              </h3>
              <p>Yes. It is completely free and works without registration.</p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Related Student Tools</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/gpa-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              GPA Calculator
            </Link>

            <Link
              to="/attendance-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              Attendance Calculator
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

export default CGPACalculator;