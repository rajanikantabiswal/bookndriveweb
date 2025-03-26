import React from 'react';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      excerpt: 'Learn the basics of React Hooks and how they can simplify your component logic.',
      author: 'Jane Doe',
      date: 'March 15, 2024',
      tags: ['React', 'JavaScript', 'Frontend'],
      imageUrl: 'https://via.placeholder.com/800x400'
    },
    {
      id: 2,
      title: 'Advanced State Management',
      excerpt: 'Dive deep into state management techniques in modern web applications.',
      author: 'John Smith',
      date: 'February 20, 2024',
      tags: ['Redux', 'State Management', 'React'],
      imageUrl: 'https://via.placeholder.com/800x400'
    },
    {
      id: 3,
      title: 'Building Responsive Designs',
      excerpt: 'Create beautiful, mobile-friendly websites with modern CSS techniques.',
      author: 'Alex Johnson',
      date: 'January 10, 2024',
      tags: ['CSS', 'Responsive Design', 'Web Development'],
      imageUrl: 'https://via.placeholder.com/800x400'
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Latest Blog Posts</h2>
      <div className="row">
        {blogPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={post.imageUrl} 
                className="card-img-top" 
                alt={post.title} 
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-muted">{post.excerpt}</p>
              </div>
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted d-block">{post.author}</small>
                    <small className="text-muted">{post.date}</small>
                  </div>
                  <div>
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="badge bg-secondary me-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;