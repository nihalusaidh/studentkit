import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function GPACalculator() {
  const gradePoints = {
    S: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6.5,
    "C+": 6,
    C: 5,
    U: 0,
  };

  const [subjects, setSubjects] = useState([
    { name: "", credits: "", grade: "S" },
  ]);

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", credits: "", grade: "S" }]);
  };

  const removeSubject = (index) => {
    if (subjects.length === 1) return;
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const totalCredits = subjects.reduce(
    (sum, sub) => sum + (Number(sub.credits) || 0),
    0
  );

  const totalGradePoints = subjects.reduce((sum, sub) => {
    return sum + (Number(sub.credits) || 0) * gradePoints[sub.grade];
  }, 0);

  const gpa =
    totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a GPA calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A GPA calculator is an online tool that helps students calculate semester Grade Point Average using subject credits and grades.",
        },
      },
      {
        "@type": "Question",
        name: "How is GPA calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPA is calculated by multiplying each subject credit by its grade point, adding all grade points, and dividing by the total number of credits.",
        },
      },
      {
        "@type": "Question",
        name: "Can engineering students use this GPA calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, this GPA calculator is useful for engineering, diploma, college, and university students using a credit-based grading system.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between GPA and CGPA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPA usually represents one semester's academic performance, while CGPA represents overall academic performance across multiple semesters.",
        },
      },
      {
        "@type": "Question",
        name: "Is ToolNest GPA Calculator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ToolNest GPA Calculator is completely free and works without login or registration.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ToolNest GPA Calculator",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: "https://tools.nihalusaidh.com/gpa-calculator",
    description:
      "Free online GPA Calculator for college and engineering students. Calculate semester GPA using subject credits and grades.",
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
        name: "GPA Calculator",
        item: "https://tools.nihalusaidh.com/gpa-calculator",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Free GPA Calculator for College & Engineering Students | ToolNest
        </title>

        <meta
          name="description"
          content="Calculate your semester GPA instantly with ToolNest GPA Calculator. Add subjects, credits, and grades to calculate credit-weighted GPA for college students."
        />

        <meta
          name="keywords"
          content="GPA calculator, free GPA calculator, college GPA calculator, engineering GPA calculator, semester GPA calculator, credit GPA calculator, grade point average calculator"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/gpa-calculator"
        />

        <meta
          property="og:title"
          content="Free GPA Calculator for College Students | ToolNest"
        />

        <meta
          property="og:description"
          content="Calculate semester GPA using subject credits and grades. Free GPA calculator for college and engineering students."
        />

        <meta
          property="og:url"
          content="https://tools.nihalusaidh.com/gpa-calculator"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Free GPA Calculator for Students"
        />

        <meta
          name="twitter:description"
          content="Calculate your semester GPA instantly using credits and grades."
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
            Free GPA Calculator for Students
          </h1>

          <p className="text-slate-600 mb-8 leading-7">
            Use this free GPA Calculator to calculate your semester Grade Point
            Average using subject credits and grades. It is useful for college,
            engineering, diploma, and university students who follow a
            credit-based grading system.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-5">
            Calculate Your Semester GPA
          </h2>

          <div className="grid md:grid-cols-4 gap-3 font-semibold mb-3">
            <p>Subject</p>
            <p>Credits</p>
            <p>Grade</p>
            <p>Action</p>
          </div>

          {subjects.map((subject, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-3 mb-3">
              <input
                className="border p-3 rounded"
                placeholder="Subject name"
                value={subject.name}
                onChange={(e) =>
                  updateSubject(index, "name", e.target.value)
                }
              />

              <input
                type="number"
                min="0"
                className="border p-3 rounded"
                placeholder="Credits"
                value={subject.credits}
                onChange={(e) =>
                  updateSubject(index, "credits", e.target.value)
                }
              />

              <select
                className="border p-3 rounded"
                value={subject.grade}
                onChange={(e) =>
                  updateSubject(index, "grade", e.target.value)
                }
              >
                {Object.keys(gradePoints).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeSubject(index)}
                className="bg-red-50 text-red-600 rounded font-medium px-3 py-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addSubject}
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            + Add Subject
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-5">
            <p className="font-semibold text-blue-900">
              Want to calculate your overall CGPA?
            </p>

            <p className="text-sm text-blue-700 mt-1">
              After calculating your semester GPA, use the CGPA Calculator to
              calculate your overall academic performance.
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <Link
                to="/cgpa-calculator"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Open CGPA Calculator
              </Link>

              <Link
                to="/internal-marks-calculator"
                className="bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Internal Marks Calculator
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-slate-600">Your GPA</p>

              <h2 className="text-4xl font-bold text-blue-600">{gpa}</h2>
            </div>

            <div className="bg-green-50 p-5 rounded-xl">
              <p className="text-slate-600">Total Credits</p>

              <h2 className="text-4xl font-bold text-green-600">
                {totalCredits}
              </h2>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <p className="text-slate-600">Total Grade Points</p>

              <h2 className="text-4xl font-bold text-purple-600">
                {totalGradePoints.toFixed(2)}
              </h2>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to Use the GPA Calculator
          </h2>

          <ol className="list-decimal list-inside text-slate-600 leading-8">
            <li>Enter the subject name.</li>
            <li>Enter the credit value for each subject.</li>
            <li>Select the grade received in each subject.</li>
            <li>Add more subjects if required.</li>
            <li>The calculator will show your semester GPA instantly.</li>
          </ol>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">How is GPA Calculated?</h2>

          <p className="text-slate-600 leading-7 mb-4">
            GPA stands for Grade Point Average. It measures your academic
            performance in a single semester. GPA is calculated using subject
            credits and grade points.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl text-slate-700 mb-4">
            GPA = Total Grade Points / Total Credits
          </div>

          <p className="text-slate-600 leading-7 mb-4">
            To calculate total grade points, multiply each subject's credit by
            its grade point. Then add all grade points together and divide by
            the total number of credits.
          </p>

          <p className="text-slate-600 leading-7">
            Example: If a subject has 4 credits and you score A+, the grade
            point is 9. The subject contributes 4 × 9 = 36 grade points to your
            GPA calculation.
          </p>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Grade Point Table Used in This Calculator
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border p-3">Grade</th>
                  <th className="border p-3">Grade Point</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(gradePoints).map(([grade, point]) => (
                  <tr key={grade}>
                    <td className="border p-3 font-medium">{grade}</td>
                    <td className="border p-3">{point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Why Use ToolNest GPA Calculator?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-slate-600 leading-7">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Credit-Based Calculation
              </h3>
              <p>
                The calculator uses subject credits and grade points for a more
                accurate semester GPA.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Student Friendly
              </h3>
              <p>
                Designed for college, engineering, diploma, and university
                students.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                Instant Result
              </h3>
              <p>
                Add subjects, credits, and grades to calculate GPA instantly.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">
                No Registration
              </h3>
              <p>
                ToolNest GPA Calculator is free and works without login or
                signup.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">GPA Calculator FAQs</h2>

          <div className="space-y-5 text-slate-600 leading-7">
            <div>
              <h3 className="font-bold text-slate-800">
                What is a GPA calculator?
              </h3>
              <p>
                A GPA calculator helps students calculate semester GPA using
                subject credits and grades.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                How is GPA calculated?
              </h3>
              <p>
                GPA is calculated by multiplying each subject's credit with its
                grade point, adding all grade points, and dividing by total
                credits.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                What is the difference between GPA and CGPA?
              </h3>
              <p>
                GPA is usually for one semester, while CGPA is the cumulative
                average across multiple semesters.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Can engineering students use this GPA calculator?
              </h3>
              <p>
                Yes. This GPA calculator is useful for engineering, diploma,
                college, and university students.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Is this GPA Calculator free?
              </h3>
              <p>
                Yes. ToolNest GPA Calculator is completely free and works
                without registration.
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

export default GPACalculator;