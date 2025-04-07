// BlogDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import blogData from "../data/blogs.json";
import { Helmet } from "react-helmet-async";
import Header from "../components/header";
import Footer from "../components/Footer";


const getImage = (imageName) => require(`../img/blogs/${imageName}`);
const BlogDetails = () => {
  const { slug } = useParams();
  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) return <div className="container py-5">Blog not found</div>;

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle}</title>
        <meta name="description" content={blog.metaDescription} />
        <meta name="keywords" content={blog.metaKeywords} />
      </Helmet>
      <Header />
      <div className="container py-5 bg-white">


        <div className="mb-4">
          <img
            src={getImage(blog.image)}
            alt={blog.title}
            className="img-fluid rounded"
            style={{ height: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>

        <h1 className="fw-bold text-danger mb-4">{blog.title}</h1>

        <div className="text-dark fs-5" style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}>
          {blog.description}
        </div>

        <div className="mt-4">
          {blog.tags.map((tag, i) => (
            <span key={i} className="badge bg-danger text-white me-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
