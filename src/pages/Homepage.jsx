import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = ({ username }) => {
	let name = localStorage.getItem("userName") || "Guest";
	let isLoggedIn = localStorage.getItem("userName") ? true : false;

	return (
		<div className="home-container">
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="tagline">Welcome to GetFit</h1>
					<p className="tagline-description">
						Achieve your fitness goals with exciting challenges and data-driven
						insights.
					</p>
					<h3 className="tagline">Hi {name}!!</h3>
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
							<Card title="Create Challenges" className="feature-card">
								<p>
									Create and customize fitness challenges to motivate yourself
									and others.
								</p>
							</Card>
						</div>
						<div className="col-md-4">
							<Card title="Participate and Compete" className="feature-card">
								<p>
									Join challenges created by others and compete with fellow
									fitness enthusiasts.
								</p>
							</Card>
						</div>
						<div className="col-md-4">
							<Card title="Track Progress" className="feature-card">
								<p>
									Connect with Google Fit to track your progress and measure
									achievements.
								</p>
							</Card>
						</div>
					</div>
				</div>
			</section>
			{!isLoggedIn && (
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
			)}
			<Footer />
		</div>
	);
};

export default HomePage;
