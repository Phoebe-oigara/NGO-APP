import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'

const MyListComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mt-4" id="section">
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            <li
              className={`list-group-item border-0 ${selectedItem === 'Item 1' ? 'active border-bottom' : ''}`}
              onClick={() => handleItemClick('Item 1')}
            >
              Verified NGOs
            </li>
            <li
              className={`list-group-item border-0 ${selectedItem === 'Item 2' ? 'active border-bottom' : ''}`}
              onClick={() => handleItemClick('Item 2')}
            >
              How I Can Donate
            </li>
            <li
              className={`list-group-item border-0 ${selectedItem === 'Item 3' ? 'active border-bottom' : ''}`}
              onClick={() => handleItemClick('Item 3')}
            >
              Search for Voluntary Positions
            </li>
          </ul>
        </div>
        <div className="col-md-8">
          {selectedItem === 'Item 1' && (
            <div className="card border-0 ">
              <div className="card-body">
                <h2 className="card-title">Verified NGOs</h2>
                <p className="card-text">Welcome to our app! All NGOs listed here are verified for
                 authenticity.Explore our registered NGOs by clicking the "View All NGOs" button. 
                 Your support can make a difference. Find genuine NGOs you can trust.
                Join us in creating a positive impact together with verified NGOs. Click below to browse.</p>
                <button className="btn btn">View Verified NGOs</button>
              </div>
            </div>
          )}
          {selectedItem === 'Item 2' && (
            <div className="card border-0 ">
              <div className="card-body">
                <h2 className="card-title">How I Can Donate</h2>
                <p className="card-text">Making a difference in the world is just 
                a few steps away! At our app, we provide a platform where all 
                NGOs listed are thoroughly verified, ensuring your donations go to credible 
                and impactful causes. When you visit our app, you can easily 
                explore a wide range of voluntary positions available with these verified NGOs.</p>
                <button className="btn btn">See where to donationate</button>
              </div>
            </div>
          )}
          {selectedItem === 'Item 3' && (
            <div className="card border-0 ">
              <div className="card-body">
                <h2 className="card-title">Search for Voluntary Positions</h2>
                <p className="card-text">Looking for voluntary positions? 
                You've come to the right place! Browse through our verified NGOs and discover 
                rewarding opportunities to make a positive impact. Click below to start your search.</p>
                <button className="btn">Search for Voluntary Positions</button>
              </div>
            </div>
          )}
          {!selectedItem && (
            <div className="alert alert-info">Click on a query to get your questions answered</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListComponent;
