import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center">
      <div className="container text-center">
        <h1 className="text-6xl font-extrabold text-gray-50">404</h1>
        <p className="mt-4 text-gray-100">Page not found</p>
        <Link to="/" className="mt-6 inline-block px-5 py-3 rounded-full bg-gradient-to-r from-gray-200 to-slate-200 text-black font-semibold">Go Home</Link>
      </div>
    </section>
  );
}
