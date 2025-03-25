import React from 'react';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


// Truncate text to specified length
const truncateText = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="text-warning">
      {[...Array(5)].map((star, index) => {
        return (
          <span key={index} className={index < rating ? 'text-warning' : 'text-muted'}>
            ★
          </span>
        );
      })}
    </div>
  );
};

// Individual review card component
const ReviewCard = ({ name, date, text, platform }) => {
  const platformIcons = {
    'google': 'https://www.google.com/favicon.ico',
    'facebook': 'https://www.facebook.com/favicon.ico'
  };

  return (
    <div className="card shadow-sm" style={{ minHeight: '220px' }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-2" 
                 style={{width: '40px', height: '40px'}}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h6 className="mb-0">{name}</h6>
              <small className="text-muted">{date}</small>
            </div>
          </div>
          {platform && (
            <img 
              src={platformIcons[platform.toLowerCase()]} 
              alt={`${platform} logo`} 
              width="24" 
              height="24"
            />
          )}
        </div>
        <StarRating rating={5} />
        <p className="card-text mt-2 flex-grow-1">{truncateText(text)}</p>
      </div>
    </div>
  );
};

// Main Reviews Component
const ProductReviews = () => {
  const reviews = {
    website: [
      {
        name: 'Satyaprakash Mohapatra',
        date: '7 months ago',
        text: 'Superb service having all kind of cars as per your need with very cheap tarrif plans in the town.Highly recommended.',
      },
      {
        name: 'Ajit Patwardhan',
        date: 'A year ago',
        text: 'Well-serviced car, prompt response and reasonably priced! Everything that you could want when renting a car. The person in charge is also polite and helpful.',
      }
    ],
    google: [
      {
        name: 'koushik i',
        date: '2 months ago',
        text: 'We took two ertiga cars. Host is very welcoming and cars are really affordable. They door delivered cars on a quick request and on time. Cars are well maintained. If you are looking for hiring a car on bubhaneswar you can undoubtedly rely on the host.',
      },
      {
        name: 'Shuchi Mohanty',
        date: '3 months ago',
        text: 'I was satisfied and would recommend them to others. Their wide selection of vehicles, competitive pricing, and convenient pick-up and drop-off process made for a hassle-free experience.',
      }
    ],
    facebook: [
      {
        name: 'Rajanikanta Biswal',
        date: '08 December 2023',
        text: 'The service was top-notch, and the staff was friendly and helpful. The car was clean and in excellent condition, and the rental process was smooth and efficient.',
      },
      {
        name: 'Jyotirmayee Bal',
        date: '8 months ago',
        text: 'Nice experience with Book n drive. They having such a beautiful office and their service is even beautiful.Having sufficient cars.',
      }
    ]
  };

  return (
    <Container className='my-5'>
      <h2 className="text-center mb-4  text-black">Our Reviews</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            {reviews.website.map((review, index) => (
              <div key={index} className="col-12 mb-3">
                <ReviewCard 
                  name={review.name}
                  date={review.date}
                  text={review.text}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-3 mb-3 mb-md-0">
            <button type="button" className="btn btn-primary">Product Review</button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="row">
            {reviews.google.map((review, index) => (
              <div key={index} className="col-12 mb-3">
                <ReviewCard 
                  name={review.name}
                  date={review.date}
                  text={review.text}
                  platform="google"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-3 mb-3 mb-md-0">
            <button type="button" className="btn btn-danger">Google Review</button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="row">
            {reviews.facebook.map((review, index) => (
              <div key={index} className="col-12 mb-3">
                <ReviewCard 
                  name={review.name}
                  date={review.date}
                  text={review.text}
                  platform="facebook"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-3 mb-3 mb-md-0">
            <button type="button" className="btn btn-primary">Facebook Review</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductReviews;