import { Helmet } from "react-helmet-async";

function BlogPostCGPA() {
  return (
    <>
      <Helmet>
        <title>
          How to Calculate CGPA in Engineering College | ToolNest
        </title>

        <meta
          name="description"
          content="Learn how to calculate CGPA step by step with examples for engineering and college students."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-6">
          How to Calculate CGPA in Engineering College
        </h1>

        <p className="mb-4">
          CGPA stands for Cumulative Grade Point Average...
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          CGPA Formula
        </h2>

        <p>
          CGPA = Sum of Semester GPA / Number of Semesters
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">
          Example
        </h2>

        <p>
          If your GPA scores are 8.2, 8.5, 8.7 and 9.0:
        </p>

        <p>
          CGPA = (8.2 + 8.5 + 8.7 + 9.0) / 4 = 8.6
        </p>
      </div>
    </>
  );
}

export default BlogPostCGPA;