import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";

function Blog() {
  const posts = Object.entries(blogPosts);

  return (
    <>
      <Helmet>
        <title>ToolNest Blog - Student Guides for GPA, CGPA & Attendance</title>

        <meta
          name="description"
          content="Read ToolNest student guides on CGPA, GPA, attendance, internal marks, and college academic improvement."
        />

        <link rel="canonical" href="https://tools.nihalusaidh.com/blog" />
      </Helmet>

      <main className="max-w-5xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold mb-4">ToolNest Blog</h1>

        <p className="text-slate-600 mb-8 leading-7">
          Student-friendly guides on CGPA, GPA, attendance, internal marks,
          exams, and academic improvement.
        </p>

        <div className="grid gap-5">
          {posts.map(([slug, post]) => (
            <Link
              key={slug}
              to={`/blog/${slug}`}
              className="block border bg-white p-6 rounded-2xl hover:bg-blue-50 transition"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

              <p className="text-slate-600">{post.description}</p>

              <p className="text-blue-600 font-semibold mt-3">Read article →</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Blog;