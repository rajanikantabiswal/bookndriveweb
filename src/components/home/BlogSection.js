import React from 'react'
import blogData from "../../data/blogs.json";
import { Link } from 'react-router-dom';
import "../../main-component/BlogList.css";


const getImage = (imageName) => require(`../../img/blogs/${imageName}`);
const BlogSection = () => {
    return (
        <div className="container py-5 bg-white">
            <div className="site-heading">
                <h2>Our Latest blogs</h2>
                <p className="pb-3">Read our latest blogs</p>
            </div>
            <div className="row">

                {blogData.slice(0, 3).map((blog) => (
                    <div className="col-lg-4" key={blog.id}>
                        <Link
                            to={`/blogs/${blog.slug}`}
                            className="text-decoration-none text-dark"
                        >
                            <div className="blog-grid">
                                <div className="blog-img">
                                    <div className="date">04 FEB</div>
                                    <a href="#">
                                        <img className='img-fluid'
                                            style={{ height: "250px", objectFit: "cover" }}
                                            src={getImage(blog.image)}
                                            title=""
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div className="blog-info">
                                    <h5>
                                        <a href="#">{blog.title}</a>
                                    </h5>
                                    <p>
                                        {blog.description.substring(0, 150)}...
                                    </p>
                                    <div className="btn-bar">
                                        <a href="#" className="px-btn-arrow">
                                            <span>Read More</span>
                                            <i className="arrow" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>

            <div className="text-center mt-5">
                <Link to="/blogs" className="btn all-cars-btn rounded-pill px-4 py-2">
                    View All Blogs
                </Link>
            </div>
        </div>
    )
}

export default BlogSection