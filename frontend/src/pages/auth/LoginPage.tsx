import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateInputs = (): boolean => {
    if (identifier == "" || identifier.length < 5 || identifier.length > 30) {
      setError("Identifier must be between 5 and 30 characters")
      return false;
    }
    if (password == "" || password.length < 5 || password.length > 30) {
      setError("Password must be between 5 and 30 characters")
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    if (loading) return;
    setLoading(true)
    setError("")
    try {
      if (!validateInputs()) return;

      // todo: login api

      navigate("/dashboard")

    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
      <div className="max-w-md relative flex flex-col p-20 rounded-xl text-black bg-white  border border-black">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
        <div className="flex flex-col gap-3">
            <div className="block relative"> 
            <label htmlFor="identifier" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username/Email</label>
            <input
              type="text"
              id="identifier"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-normal appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              value={identifier}
              onChange={(e)=>setIdentifier(e.target.value)}
            />
            
            </div>
            <div className="block relative">
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
            <input
              type="text"
              id="password"
              className="rounded border border-gray-200 text-sm w-full font-normal leading-4.5 text-black tracking-normal appearance-none block h-11 m-0 p-2.75 focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}  
            />
            </div>
            <div>
            <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
            </a></div>
            <button
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              onClick={handleSubmit}  
            >Submit</button>

        </div>
        <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a className="text-sm text-[#7747ff]" href="#">Sign up for free!</a></div>
      </div>

      {error !== "" &&
        <p className="mt-8 font-serif text-red-500 text-md">{error}</p>
      }
    </div>
  )
}

export default LoginPage