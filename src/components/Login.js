import React from "react";
import { signIn } from "next-auth/react";
import TwitterLogo from "../Assets/twitter-icon.jpg";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="sign-in__img--styling">
      <Image
        src={TwitterLogo}
        width={150}
        height={150}
        className="contain"
        alt="logo"
      />
      <div>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button
              className="sign-in__btn group"
              onClick={() => signIn(provider.id, { callbackURL: "/" })}
            >
              <span className="sign-in__btn--colors"></span>
              {/* Top glass gradient */}
              <span className="sign-in__btn--top-gradient"></span>
              {/* Bottom gradient */}
              <span className="sign-in__btn--bottom-gradient"></span>
              {/* Left gradient */}
              <span className="sign-in__btn--left-gradient"></span>
              {/* Right gradient */}
              <span className="sign-in__btn--right-gradient"></span>
              <span className="sign-in__btn--border"></span>
              <span className="sign-in__btn--transition"></span>
              <span className="relative">Sign in with {provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
