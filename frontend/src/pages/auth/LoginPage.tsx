import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/authApi";
import { useAuthStore } from "../../lib/authStore";
import { parseApiError } from "../../lib/error";
import Footer from "../../components/Footer";

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if (!email.includes("@") || email === "") {
      setError("Invalid email address");
      return false;
    }
    if (username === "" || username.length < 3 || username.length > 30) {
      setError("Username must be between 3 and 30 characters");
      return false;
    }
    if (password === "" || password.length < 6 || password.length > 30) {
      setError("Password must be between 6 and 30 characters");
      return false;
    }
    return true;
  }

  const switchPage = () => {
    navigate("/auth/register")
  }

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true)
    setError("")
    try {
      if (!validateInputs()) return;

      const result = await login({ email, username, password });
      setAuth(result.user, result.accessToken, result.refreshToken);
      navigate(result.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
      <div className="max-w-md relative flex flex-col p-20 rounded-xl text-black bg-white  border border-black">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">ESkrim</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
        <div className="flex flex-col gap-3">
            <div className="block relative">
            <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-normal appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
            <div className="block relative">
            <label htmlFor="username" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-normal appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            </div>
            <div className="block relative">
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-normal appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            </div>
            <button
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal disabled:opacity-50"
              disabled={loading}
              onClick={() => { void handleSubmit(); }}
            >{loading ? "Signing in..." : "Submit"}</button>

        </div>
        <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet?
          <a
            className="text-sm text-[#7747ff]"
            onClick={switchPage}
          >Sign up for free!</a>
        </div>
      </div>

      {error !== "" &&
        <p className="mt-8 font-serif text-red-500 text-md">{error}</p>
      }
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
