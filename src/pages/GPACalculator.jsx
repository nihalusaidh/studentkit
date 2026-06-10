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
    <div className="max-w-6xl mx-auto px-5 py-10">
      <Helmet>
        <title>GPA Calculator | ToolNest</title>
        <meta
          name="description"
          content="Calculate semester GPA using credits and grades."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-3">
        GPA Calculator
      </h1>

      <p className="text-slate-600 mb-8">
        Calculate your semester GPA using subject credits and grades.
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
    </div>
  );
}

export default GPACalculator;