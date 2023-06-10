import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Usercontext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { userinfo, setUserinfo } = useUser();

  useEffect(() => {
    if (userinfo) {
      navigate(`/`);
    }
  }, [navigate, userinfo]);
  const Signin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const apiCall = await fetch(`${apiUrl}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      setLoading(false);
      if (apiCall.status !== 200) {
        window.alert("wrong credentials");
        return;
      }
      const res = await apiCall.json();
      setUserinfo(res);
    } catch (error) {
      setLoading(false);
      window.alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="mx-auto h-9 font-bold text-2xl">LOGIN</div>

        <p className="mt-6 text-center text-sm text-text">
          No account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:text-primary-accent">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 sm:px-10">
          <form className="flex flex-col space-y-4" onSubmit={Signin}>
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-heading">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="string"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-heading">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <a href="/Register" className="text-sm font-semibold text-primary hover:text-primary-accent">
                Forgot password?
              </a>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
