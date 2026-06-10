import { useState } from "react";
import { Helmet } from "react-helmet-async";

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

  const theoryWeighted =
    n(cia1) * 0.35 + n(cia2) * 0.35 + n(sa) * 0.3;

  const theoryInternal = (theoryWeighted * internalMax) / 100;

  const practicalWeighted =
    n(iapr) * 0.75 + n(activity) * 0.25;

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

  const targetMin =
    gradeData.find((g) => g.grade === targetGrade)?.min || 81;

  const requiredTotalMarks = (targetMin / 100) * totalMax;
  const requiredEndSem = Math.max(requiredTotalMarks - n(internal), 0);

  return (
    <>
      <Helmet>
        <title>
          Internal Marks Calculator | Grade Predictor | ToolNest
        </title>

        <meta
          name="description"
          content="Calculate internal marks, predict final grades, and find the required end semester marks to achieve your target grade. Supports theory and practical courses."
        />

        <meta
          name="keywords"
          content="Internal Marks Calculator, Grade Predictor, End Semester Marks Calculator, College Internal Calculator, Theory Marks Calculator, Practical Marks Calculator, ToolNest"
        />

        <link
          rel="canonical"
          href="https://tools.nihalusaidh.com/internal-marks-calculator"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-3">
          Internal Marks Calculator
        </h1>

        <p className="text-slate-600 mb-8">
          Calculate theory and practical internal marks, predict final grades,
          and determine the minimum end semester marks required to achieve your
          target grade.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
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
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">
              Grade Predictor
            </h2>

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
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Internal Marks and Grade Calculator
          </h2>

          <p className="text-slate-600 leading-7 mb-4">
            ToolNest Internal Marks Calculator helps college and university
            students calculate internal assessment marks for theory and
            practical courses. Enter CIA, activity, SA, or IAPR scores to
            calculate your internal marks instantly.
          </p>

          <p className="text-slate-600 leading-7 mb-4">
            The built-in Grade Predictor calculates your final percentage and
            predicts the grade you are likely to receive based on your internal
            and end semester marks.
          </p>

          <p className="text-slate-600 leading-7">
            You can also select a target grade such as S, A+, A, or B+ and find
            the minimum end semester marks required to achieve that grade.
          </p>
        </section>
      </div>
    </>
  );
}

export default InternalCalculator;