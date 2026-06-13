import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "./blogPosts";

function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-blue-600 font-semibold">
          Back to Blog
        </Link>
      </main>
    );
  }

  const pageUrl = `https://tools.nihalusaidh.com/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "ToolNest",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolNest",
    },
    mainEntityOfPage: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
        name: "Blog",
        item: "https://tools.nihalusaidh.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | ToolNest</title>

        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={`${post.title} | ToolNest`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | ToolNest`} />
        <meta name="twitter:description" content={post.description} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <Link to="/blog" className="text-blue-600 font-semibold">
          ← Back to Blog
        </Link>

        <article className="mt-6 bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-slate-500 mb-8">Updated on {post.date}</p>

          <p className="text-lg text-slate-600 leading-8 mb-8">
            {post.description}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Try Related Tool
            </h2>

            <p className="text-blue-700 mb-4">
              Use ToolNest to calculate this instantly.
            </p>

            <Link
              to={post.relatedTool.link}
              className="inline-block bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Open {post.relatedTool.name}
            </Link>
          </div>

          {post.content.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>

              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-slate-600 leading-8 mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Useful Student Tools</h2>

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
                to="/internal-marks-calculator"
                className="border rounded-xl p-4 hover:bg-slate-50"
              >
                Internal Marks Calculator
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">FAQs</h2>

            <div className="space-y-5">
              {post.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-slate-800">{faq.q}</h3>
                  <p className="text-slate-600 leading-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export default BlogArticle;