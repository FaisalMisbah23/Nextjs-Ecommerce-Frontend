import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-4 text-3xl text-center">Sign up</h1>
          <div className="text-grey-dark mt-3 mb-3">
          Already have an account?{" "}
          <Link
            className="no-underline border-b border-blue text-blue"
            href={"/login"}
          >
            Log in
          </Link>
          .
        </div>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />
          {/* <button
            type="submit"
            className="w-full text-center py-3 rounded bg hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button> */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default Signup;
