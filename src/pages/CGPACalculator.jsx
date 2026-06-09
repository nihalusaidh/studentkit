import { useState } from "react";
import { Helmet } from "react-helmet-async";

function CGPACalculator() {
  const [semesterCount, setSemesterCount] = useState(1);
  const [semesters, setSemesters] = useState([
    { gpa: "", credits: "" },
  ]);
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

      if (field === "credits") {
        if (num < 0) num = 0;
      }

      updated[index][field] = num;
    }

    setSemesters(updated);
  };

  const totalGpa = semesters.reduce(
    (sum, sem) => sum + (Number(sem.gpa) || 0),
    0
  );

  const simpleCgpa =
    semesterCount > 0 ? totalGpa / semesterCount : 0;

  const totalCredits = semesters.reduce(
    (sum, sem) => sum + (Number(sem.credits) || 0),
    0
  );

  const weightedPoints = semesters.reduce((sum, sem) => {
    return (
      sum +
      (Number(sem.gpa) || 0) * (Number(sem.credits) || 0)
    );
  }, 0);

  const weightedCgpa =
    totalCredits > 0 ? weightedPoints / totalCredits : 0;

  const finalCgpa = useCredits ? weightedCgpa : simpleCgpa;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <Helmet>
        <title>CGPA Calculator for College Students | StudentKit</title>
        <meta
          name="description"
          content="Calculate CGPA using completed semester GPA values. Supports simple CGPA and credit-weighted CGPA."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-3">CGPA Calculator</h1>

      <p className="text-slate-600 mb-8">
        Enter your completed semester GPAs to calculate your overall CGPA.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <label className="font-medium">
          How many semesters completed?
        </label>

        <input
          type="number"
          min="1"
          max="12"
          className="border p-3 rounded w-full mt-2 mb-5"
          value={semesterCount}
          onChange={(e) => handleSemesterCount(e.target.value)}
        />

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
            <p className="text-slate-600">CGPA</p>
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
      </div>
    </div>
  );
}

export default CGPACalculator;