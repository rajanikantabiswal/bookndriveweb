import React from 'react';
import { Helmet } from 'react-helmet-async';
import blogData from "../data/blogs.json";
import { Link } from 'react-router-dom';
import Header from '../components/header.js';
import Footer from '../components/Footer';
import "./BlogList.css";

const getImage = (imageName) => require(`../img/blogs/${imageName}`);
const BlogList = () => {
    return (
        <>
            <Helmet>
                <meta name='keywords' content='Blogs' />
                <meta name='description' content='Blogs' />
                <title>Blogs</title>
            </Helmet>
            <Header />
           
            <div className="container py-5 bg-white">
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <div className="section-title">
                            <h2>Our Blogs</h2>
                            <p>
                                I design and develop services for customers of all sizes, specializing
                                in creating stylish, modern websites
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">

                    {blogData.map((blog) => (
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
            </div>

            <Footer />

        </>

    )
}

export default BlogList;