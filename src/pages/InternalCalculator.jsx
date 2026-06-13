import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function InternalCalculator() {
  const [courseType, setCourseType] = useState("theory");
  const [internalMax, setInternalMax] = useState(40);
  const [endSemMax, setEndSemMax] = useState(60);

  const [cia1, setCia1] = useState("");
  const [cia2, setCia2] = useState("");
  const [sa, setSa] = useState("");

  const [iapr, setIapr] = useState("");
  const [activity, setActivity] = useState("");

  const [internal, setInternal] = useState("");
  const [endSem, setEndSem] = useState("");
  const [targetGrade, setTargetGrade] = useState("A+");

  const limit100 = (value) => {
    if (value === "") return "";
    const num = Number(value);
    if (num < 0) return 0;
    if (num > 100) return 100;
    return num;
  };

  const n = (value) => Number(value) || 0;

  const totalMax = Number(internalMax) + Number(endSemMax);

  const theoryWeighted = n(cia1) * 0.35 + n(cia2) * 0.35 + n(sa) * 0.3;
  const theoryInternal = (theoryWeighted * internalMax) / 100;

  const practicalWeighted = n(iapr) * 0.75 + n(activity) * 0.25;
  const practicalInternal = (practicalWeighted * internalMax) / 100;

  const finalTotalRaw = n(internal) + n(endSem);
  const finalPercentage = totalMax > 0 ? (finalTotalRaw / totalMax) * 100 : 0;

  const gradeData = [
    { grade: "S", min: 91, point: 10 },
    { grade: "A+", min: 81, point: 9 },
    { grade: "A", min: 71, point: 8 },
    { grade: "B+", min: 66, point: 7 },
    { grade: "B", min: 61, point: 6.5 },
    { grade: "C+", min: 56, point: 6 },
    { grade: "C", min: 50, point: 5 },
  ];

  const getGrade = (mark) => {
    return gradeData.find((g) => mark >= g.min) || { grade: "U", point: 0 };
  };

  const predictedGrade = getGrade(finalPercentage);
  const targetMin = gradeData.find((g) => g.grade === targetGrade)?.min || 81;
  const requiredTotalMarks = (targetMin / 100) * totalMax;
  const requiredEndSem = Math.max(requiredTotalMarks - n(internal), 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an internal marks calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An internal marks calculator helps students calculate internal assessment marks using CIA, activity, skill assessment, practical, and other college assessment scores.",
        },
      },
      {
        "@type": "Question",
        name: "How are internal marks calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Internal marks are calculated using the weightage given to CIA tests, activities, skill assessments, practical records, and other components. The final value is converted to the selected internal marks total.",
        },
      },
      {
        "@type": "Question",
        name: "Can I calculate required end semester marks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, enter your internal marks and select a target grade. The calculator will show the minimum end semester marks required to reach that grade.",
        },
      },
      {
        "@type": "Question",
        name: "Can this calculator predict my grade?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the grade predictor estimates your final grade by combining internal marks and end semester marks based on the selected total marks system.",
        },
      },
      {
        "@type": "Question",
        name: "Is this useful for engineering students?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this calculator is useful for engineering, diploma, arts, science, and college students who follow internal assessment and end semester examination systems.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolNest Internal Marks Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: "https://tools.nihalusaidh.com/internal-marks-calculator",
    description:
      "Free Internal Marks Calculator and Grade Predictor for college students. Calculate CIA marks, practical marks, final grade, and required end semester marks.",
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
        name: "Internal Marks Calculator",
        item: "https://tools.nihalusaidh.com/internal-marks-calculator",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Internal Marks Calculator & Grade Predictor | ToolNest
        </title>

        <meta
          name="description"
          content="Free Internal Marks Calculator for college students. Calculate CIA marks, practical marks, predict grades, and find required end semester marks instantly."
        />

        <meta
          name="keywords"
          content="internal marks calculator, CIA calculator, grade predictor, end semester marks calculator, college internal marks calculator, engineering internal marks calculator, practical marks calculator"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/internal-marks-calculator"
        />

        <meta
          property="og:title"
          content="Internal Marks Calculator & Grade Predictor"
        />

        <meta
          property="og:description"
          content="Calculate internal marks, predict final grades, and find required end semester marks using ToolNest."
        />

        <meta
          property="og:url"
          content="https://tools.nihalusaidh.com/internal-marks-calculator"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Internal Marks Calculator for College Students"
        />

        <meta
          name="twitter:description"
          content="Calculate CIA marks, practical marks, final grade, and required end semester marks."
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

      <main className="max-w-6xl mx-auto px-5 py-10">
        <section>
          <h1 className="text-4xl font-bold mb-3">
            Internal Marks Calculator
          </h1>

          <p className="text-slate-600 mb-8 leading-7">
            Use this free Internal Marks Calculator to calculate theory
            internal marks, practical internal marks, final grade, and required
            end semester marks. This tool is useful for college, engineering,
            diploma, and university students.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">
              Internal Calculation
            </h2>

            <label className="font-medium">Internal Marks Total</label>

            <select
              className="border p-3 rounded w-full mt-2 mb-4"
              value={internalMax}
              onChange={(e) => setInternalMax(Number(e.target.value))}
            >
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={60}>60</option>
            </select>

            <label className="font-medium">Course Type</label>

            <select
              className="border p-3 rounded w-full mt-2 mb-5"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
            >
              <option value="theory">Theory Course</option>
              <option value="practical">Practical Course</option>
            </select>

            {courseType === "theory" ? (
              <>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="border p-3 w-full mb-3 rounded"
                  placeholder="CIA I marks out of 100"
                  value={cia1}
                  onChange={(e) => setCia1(limit100(e.target.value))}
                />

                <input
                  type="number"
                  min="0"
                  max="100"
                  className="border p-3 w-full mb-3 rounded"
                  placeholder="CIA II marks out of 100"
                  value={cia2}
                  onChange={(e) => setCia2(limit100(e.target.value))}
                />

                <input
                  type="number"
                  min="0"
                  max="100"
                  className="border p-3 w-full mb-3 rounded"
                  placeholder="SA / Activities marks out of 100"
                  value={sa}
                  onChange={(e) => setSa(limit100(e.target.value))}
                />

                <div className="bg-blue-50 p-5 rounded-xl mt-5">
                  <p className="text-slate-600">Theory Internal</p>

                  <h3 className="text-3xl font-bold text-blue-600">
                    {theoryInternal.toFixed(2)} / {internalMax}
                  </h3>
                </div>
              </>
            ) : (
              <>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="border p-3 w-full mb-3 rounded"
                  placeholder="IAPR marks out of 100"
                  value={iapr}
                  onChange={(e) => setIapr(limit100(e.target.value))}
                />

                <input
                  type="number"
                  min="0"
                  max="100"
                  className="border p-3 w-full mb-3 rounded"
                  placeholder="Activities marks out of 100"
                  value={activity}
                  onChange={(e) => setActivity(limit100(e.target.value))}
                />

                <div className="bg-green-50 p-5 rounded-xl mt-5">
                  <p className="text-slate-600">Practical Internal</p>

                  <h3 className="text-3xl font-bold text-green-600">
                    {practicalInternal.toFixed(2)} / {internalMax}
                  </h3>
                </div>
              </>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-5">
              <p className="font-semibold text-blue-900">
                Check Your Academic Performance
              </p>

              <p className="text-sm text-blue-700 mt-1">
                After calculating internal marks, calculate your GPA, CGPA, or
                attendance using ToolNest student tools.
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
                  className="bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  CGPA Calculator
                </Link>

                <Link
                  to="/attendance-calculator"
                  className="bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                >
                  Attendance Calculator
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Grade Predictor</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="font-medium">Internal Total</label>

                <input
                  type="number"
                  className="border p-3 w-full rounded mt-2"
                  value={internalMax}
                  onChange={(e) => setInternalMax(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="font-medium">End Sem Total</label>

                <input
                  type="number"
                  className="border p-3 w-full rounded mt-2"
                  value={endSemMax}
                  onChange={(e) => setEndSemMax(Number(e.target.value))}
                />
              </div>
            </div>

            <input
              type="number"
              min="0"
              max={internalMax}
              className="border p-3 w-full mb-3 rounded"
              placeholder={`Internal marks out of ${internalMax}`}
              value={internal}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (e.target.value === "") setInternal("");
                else if (val > internalMax) setInternal(internalMax);
                else if (val < 0) setInternal(0);
                else setInternal(val);
              }}
            />

            <input
              type="number"
              min="0"
              max={endSemMax}
              className="border p-3 w-full mb-3 rounded"
              placeholder={`End Semester marks out of ${endSemMax}`}
              value={endSem}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (e.target.value === "") setEndSem("");
                else if (val > endSemMax) setEndSem(endSemMax);
                else if (val < 0) setEndSem(0);
                else setEndSem(val);
              }}
            />

            <div className="bg-purple-50 p-5 rounded-xl mt-5">
              <p className="text-slate-600">Total</p>

              <h3 className="text-3xl font-bold text-purple-600">
                {finalTotalRaw.toFixed(2)} / {totalMax}
              </h3>

              <p className="mt-2">
                Percentage: <b>{finalPercentage.toFixed(2)}%</b>
              </p>

              <p className="font-semibold">
                Grade: {predictedGrade.grade} | Point: {predictedGrade.point}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Required End Semester Marks
              </h2>

              <select
                className="border p-3 rounded w-full mb-3"
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
              >
                {gradeData.map((g) => (
                  <option key={g.grade} value={g.grade}>
                    {g.grade}
                  </option>
                ))}
              </select>

              <div className="bg-orange-50 p-5 rounded-xl">
                <p className="text-slate-600">
                  To get {targetGrade}, you need at least
                </p>

                <h3 className="text-3xl font-bold text-orange-600">
                  {requiredEndSem > endSemMax
                    ? `More than ${endSemMax}`
                    : requiredEndSem.toFixed(2)}{" "}
                  / {endSemMax}
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to Use the Internal Marks Calculator
          </h2>

          <ol className="list-decimal list-inside text-slate-600 leading-8">
            <li>Select your internal marks total, such as 40, 50, or 60.</li>
            <li>Select whether the course is theory or practical.</li>
            <li>Enter CIA, SA, activity, IAPR, or practical scores.</li>
            <li>Check your calculated internal marks instantly.</li>
            <li>
              Enter internal and end semester marks to predict your final grade.
            </li>
            <li>
              Select a target grade to find the required end semester marks.
            </li>
          </ol>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Internal Marks and Grade Calculator
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Internal Marks Calculator helps students calculate internal
            assessment marks for theory and practical courses. Many colleges use
            CIA tests, activities, assignments, skill assessments, practical
            records, and model exams to calculate internal marks.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            This calculator supports different internal mark totals such as 40,
            50, and 60. Students can enter their scores out of 100, and the tool
            converts them into the selected internal marks total.
          </p>

          <p className="text-slate-600 leading-7">
            The built-in Grade Predictor helps you estimate your final grade by
            combining internal marks and end semester marks. You can also choose
            a target grade such as S, A+, A, or B+ and find the minimum end
            semester marks needed.
          </p>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Why Students Use This Calculator
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-slate-600 leading-7">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Calculate Internal Marks
              </h3>
              <p>
                Quickly calculate theory or practical internal marks using
                college assessment components.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Predict Final Grade
              </h3>
              <p>
                Enter internal and end semester marks to estimate your final
                grade and grade point.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Find Required Marks
              </h3>
              <p>
                Select a target grade and find how much you need in the end
                semester exam.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Useful for College Students
              </h3>
              <p>
                Designed for engineering, diploma, arts, science, and university
                students.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Internal Marks Calculator FAQs
          </h2>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-800">
                What is an internal marks calculator?
              </h3>
              <p>
                It is a tool that calculates internal assessment marks using
                CIA, activities, skill assessment, IAPR, practical, or other
                college assessment scores.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                How are internal marks calculated?
              </h3>
              <p>
                Internal marks are calculated using the weightage of CIA tests,
                activities, skill assessments, practical records, or other
                assessment components.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can I predict my final grade?
              </h3>
              <p>
                Yes. Enter your internal marks and end semester marks to predict
                your final percentage, grade, and grade point.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can I calculate required end semester marks?
              </h3>
              <p>
                Yes. Select your target grade, and the calculator will show the
                minimum end semester marks required.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Is this useful for engineering students?
              </h3>
              <p>
                Yes. This calculator is useful for engineering and college
                students who follow internal assessment and end semester exam
                systems.
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
              to="/attendance-calculator"
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              Attendance Calculator
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

export default InternalCalculator;