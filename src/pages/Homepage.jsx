import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

const HomePage = ({ username }) => {
  const name = username ? username : "Guest";

  return (
    <div className="home-container">
      <section className="hero-section">
        <img
          src="src\assets\background.webp"
          alt=""
          style={{
            position: "absolute",
            zIndex: "-1",
            left: "0",
            top: "0",
            filter: "brightness(0.5)",
          }}
        />
        <div className="hero-content">
          <h1 className="tagline">Hi {name}</h1>
          <h1 className="tagline">Welcome to GetFit</h1>
          <p className="tagline-description">
            Achieve your fitness goals with exciting challenges and data-driven
            insights.
          </p>
          <Link to="/challenge">
            <Button
              label="Explore Challenges"
              className="p-button-raised p-button-lg cta-button"
            />
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="row">
            <div className="col-md-4">
              <Card title="Create Challenges">
                <p>
                  Create and customize fitness challenges to motivate yourself
                  and others.
                </p>
              </Card>
            </div>
            <div className="col-md-4">
              <Card title="Participate and Compete">
                <p>
                  Join challenges created by others and compete with fellow
                  fitness enthusiasts.
                </p>
              </Card>
            </div>
            <div className="col-md-4">
              <Card title="Track Progress">
                <p>
                  Connect with Google Fit to track your progress and measure
                  achievements.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Get Fit?</h2>
          <p className="cta-description">
            Sign up now and start your fitness journey today!
          </p>
          <Link to="/register">
            <Button
              label="Sign Up"
              className="p-button-raised p-button-lg cta-button"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
