import { useState } from "react";
import { Helmet } from "react-helmet-async";

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
    totalCredits > 0
      ? (totalGradePoints / totalCredits).toFixed(2)
      : "0.00";

  return (
    <>
      <Helmet>
  <title>GPA Calculator Online | Free GPA Calculator | ToolNest</title>

  <meta
    name="description"
    content="Calculate GPA online instantly. Free GPA calculator for college and university students."
  />

  <link
    rel="canonical"
    href="https://tools.nihalusaidh.com/gpa-calculator"
  />
</Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-3">
          GPA Calculator
        </h1>

        <p className="text-slate-600 mb-8">
          Calculate your semester GPA by entering each subject, credit value and
          grade. This GPA calculator uses credit-weighted grade points to give
          an accurate semester GPA result.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
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
                className="bg-red-50 text-red-600 rounded font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addSubject}
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            + Add Subject
          </button>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-5 rounded-xl">
              <p className="text-slate-600">GPA</p>

              <h2 className="text-4xl font-bold text-blue-600">
                {gpa}
              </h2>
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
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to Calculate GPA?
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            GPA (Grade Point Average) is calculated by multiplying each
            subject's grade point by its credit value, adding all grade points
            together, and dividing by the total number of credits.
          </p>

          <p className="text-slate-600 leading-7">
            This GPA calculator helps college and engineering students calculate
            semester GPA quickly using subject credits and grades. Add all your
            subjects, choose the correct grade, and ToolNest will calculate your
            semester GPA instantly.
          </p>
        </section>
      </div>
    </>
  );
}

export default GPACalculator;