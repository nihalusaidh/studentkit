import { useState } from "react";
import { Helmet } from "react-helmet-async";

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

  return (
    <>
      <Helmet>
  <title>Attendance Calculator Online | ToolNest</title>

  <meta
    name="description"
    content="Calculate attendance percentage and find how many classes you can miss or attend."
  />

  <link
    rel="canonical"
    href="https://tools.nihalusaidh.com/attendance-calculator"
  />
</Helmet>

      <div className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-3">
          Attendance Calculator
        </h1>

        <p className="text-slate-600 mb-8">
          Calculate your attendance percentage, find how many classes you need
          to attend to reach your target, and check how many classes you can
          safely skip.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
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
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-5">
              Attendance Result
            </h2>

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
        </div>

        <section className="mt-12 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            How to use this attendance calculator?
          </h2>

          <p className="text-slate-600 leading-7">
            Enter the number of classes you have attended and the total number
            of classes conducted. Select your target attendance percentage, such
            as 75%, 80%, 85%, or 90%. The calculator will instantly show your
            current attendance percentage and tell you whether you need to
            attend more classes or can safely skip some classes.
          </p>
        </section>
      </div>
    </>
  );
}

export default AttendanceCalculator;