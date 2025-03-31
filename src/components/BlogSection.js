import React from 'react';
import BlogImage from "../img/blogs/blog1.png";

const BlogSection = () => {
  // Customized blog data for self-drive car rental in Bhubaneswar
  const blogs = [
    {
      id: 1,
      title: "Top 5 Weekend Getaways from Bhubaneswar by Self-Drive Car",
      author: "BookNDrive Team",
      date: "March 25, 2025",
      summary: "Discover the most scenic destinations within a few hours' drive from Bhubaneswar. Perfect weekend escapes with your rented self-drive car.",
      image: "../img/blogs/blog1.png",
      tags: ["Weekend Trips", "Tourism", "Self-Drive"]
    },
    {
      id: 2,
      title: "Guide to Renting Your First Self-Drive Car in Bhubaneswar",
      author: "BookNDrive Team",
      date: "March 18, 2025",
      summary: "Everything you need to know about renting a self-drive car in Bhubaneswar - documents required, booking process, and essential driving tips.",
      image: "../img/blogs/blog2.png",
      tags: ["Car Rental", "How-to Guide", "Beginners"]
    },
    {
      id: 3,
      title: "Why Self-Drive Cars Are Becoming Popular in Odisha",
      author: "BookNDrive Team",
      date: "March 10, 2025",
      summary: "The rising trend of self-drive car rentals in Odisha and how BookNDrive is revolutionizing the way people travel across the state.",
      image: "../img/blogs/blog3.png",
      tags: ["Industry Trends", "Local Travel", "Cost Saving"]
    }
  ];

  return (
    <div className="container py-5">
       <div className="site-heading">
          <h2>Our Latest Blogs</h2>
          <p className="pb-5">The latest news, updates, and insights from our blog.</p>
        </div>
      
      <div className="row">
        {blogs.map(blog => (
          <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <img src={BlogImage} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <small className="text-muted">{blog.date}</small>
                  <small style={{ color: "#dc3545" }}>{blog.author}</small>
                </div>
                <h5 className="card-title fw-bold">{blog.title}</h5>
                <p className="card-text">{blog.summary}</p>
              </div>
              <div className="card-footer bg-white border-0">
                <div className="d-flex flex-wrap">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="badge me-2 mb-1" style={{ backgroundColor: "#dc3545" }}>{tag}</span>
                  ))}
                </div>
                <a href="https://bookndrive.in/blog" className="btn mt-3 text-white w-100" style={{ backgroundColor: "#000000" }}>
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row mt-4">
        <div className="col-12 text-center">
          <a href="https://bookndrive.in/blog" className="btn px-4 py-2" style={{ backgroundColor: "#dc3545", color: "white" }}>
            View All Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;