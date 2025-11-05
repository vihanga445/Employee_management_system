
import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-blue-50 text-blue-600">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
              </svg>
              Trusted & Easy
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Employee management made simple
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Centralize employee data, speed up onboarding, and manage teams with confidence. Built for HR teams of any size.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Get started
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-50 transition">
                Sign in
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="text-sm text-gray-500">Serving teams since <span className="font-medium text-gray-800">2023</span></div>
              {/* Removed external partner logos (placeholders) to avoid broken images in UI. */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* Decorative illustration (inline SVG) replaces external hero image to avoid broken links */}
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center p-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-white opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 7v10a2 2 0 0 0 2 2h14V7H3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3v4M8 3v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 14h10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Key features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>}
              title="Centralized data"
              description="All employee records in one place — search, export and report with ease."
            />

            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.333 0-4 1.333-4 4v4h8v-4c0-2.667-2.667-4-4-4z" /></svg>}
              title="Easy edits"
              description="Create and update profiles quickly with validation and friendly UI."
            />

            <FeatureCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>}
              title="Secure access"
              description="JWT-based auth and role checks keep your data safe."
            />
          </div>
        </section>

        {/* Callout */}
        <section className="mt-16 bg-gradient-to-r from-white to-blue-50 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Ready to manage your team smarter?</h3>
              <p className="text-sm text-gray-600 mt-1">Create an account and get started in minutes.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/signup" className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Create account</Link>
              <Link to="/login" className="px-5 py-3 bg-white border border-gray-200 rounded-lg">Sign in</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;