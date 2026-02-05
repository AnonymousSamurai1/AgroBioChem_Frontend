import React from 'react';

function Signup() {
  return (
    <Container>
      <form onSubmit={handleSignup} className="login">
        <div className="credential-main1">
          <div className="credential-image1">
            <img src={Username} alt="username" />
          </div>
          <input
            type="text"
            name="fullname"
            placeholder="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="credential-main2">
          <div className="date">
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="select">
            <select
              name="gender"
              className="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="credential-main2">
          <div className="date">
            <input
              type="text"
              name="location"
              placeholder="Enter your Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="select">
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <div className="credential-main1">
          <div className="credential-image1">
            <img src={Email} alt="username" />
          </div>
          <input
            type="email"
            name="signupEmail"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </div>

        <div className="credential-main1">
          <div className="credential-image1">
            <img src={Password} alt="username" />
          </div>
          <input
            type="password"
            name="signupPassword"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </div>

        <div className="submit1">
          <input type="submit" value="Register" className="login-button" />
        </div>
      </form>
    </Container>
  );
}

export default Signup;
