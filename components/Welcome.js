import React from "react";
import {Link} from "react-router-dom";
export const Welcome = (() => {
  return (
    <div className="welcome-page">
      <h2 className="text-center">Welcome to Newput training program</h2>
      <h2 className="text-center">Here you can find multiple courses divided as per the team</h2>
      <h1 className="text-center">Let&apos;s start</h1>

      <div className="cta-btns">
        <Link to="/sign-in" className="btn buttons sign-in">Sign In</Link>
        <Link to="/sign-up" className="btn buttons sign-up">Sign Up</Link>
      </div>
    </div>
  );
});
