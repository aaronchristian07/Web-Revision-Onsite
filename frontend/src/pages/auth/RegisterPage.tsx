function RegisterPage() {
    return (
        <div className="min-h-screen min-w-screen flex flex-row justify-center items-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
                
                
                </p><div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your username
                    </label>
                    <input placeholder="JohnDoe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                    </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password" />
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                    Create an account
                </button>
                
            </div>
            </div>
            </div>
        </div>
    )
}

export default RegisterPage
    