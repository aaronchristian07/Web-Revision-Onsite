import { Icon } from "@iconify/react";

function ProfilePage() {
    return (
        <div>
            <input type="checkbox" id="mobile-menu-toggle" className="hidden" />
        
            <div className="sidebar-overlay fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

            <div className="flex min-h-screen relative overflow-hidden">

                <aside className="sidebar fixed lg:sticky top-0 left-0 z-50 h-screen w-70 -translate-x-full lg:translate-x-0 transition-transform duration-300 glass flex flex-col border-r border-slate-200 dark:border-slate-800">
                    <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-primary to-primary-linear flex items-center justify-center text-white shadow-glow">
                                <Icon icon="solar:buildings-2-linear" width="18"></Icon>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">ES<span className="text-primary font-extrabold">krim</span></span>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 w-full min-w-0 flex flex-col ">
                    
                    <header className="h-20 glass sticky top-0 z-30 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
                        <div className="flex items-center gap-4">
                            <label htmlFor="mobile-menu-toggle" className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                <Icon icon="solar:hamburger-menu-linear" width="24"></Icon>
                            </label>

                            <div className="hidden sm:block">
                                <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">History - My Orders!</h1>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span>Home</span>
                                    <Icon icon="solar:alt-arrow-right-linear" width="12"></Icon>
                                    <span className="text-primary font-medium">Overview</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="hidden md:flex relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Icon icon="solar:magnifer-linear" className="text-slate-400 group-focus-within:text-primary transition-colors"></Icon>
                                </div>
                                <input type="text" placeholder="Search flavor or name..." className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-700 transition-all outline-none text-slate-600 dark:text-slate-200 placeholder:text-slate-400" />
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
                                    <Icon icon="solar:bell-bing-linear" width="20"></Icon>
                                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                </button>
                                
                                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
                                
                                <div className="flex items-center gap-3 pl-1 cursor-pointer">
                                    <img src="" alt="Admin" className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover" />
                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-white leading-none">ON AO CJ KY MT</p>
                                        <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-wide">DEVELOPER</p>
                                    </div>
                                    <Icon icon="solar:alt-arrow-down-linear" className="text-slate-400 text-xs hidden sm:block"></Icon>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="flex flex-row flex-wrap">
                      <div className="min-h-screen min-w-screen flex flex-row justify-center items-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex items-center gap-3 pl-1 cursor-pointer">
                        <img src="" alt="Admin" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-slate-700 dark:text-white leading-none">ON AO CJ KY MT</p>
                            <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-wide">developer@gmail.com</p>
                            <p className="text-[10px] text-slate-300 mt-1 font-medium uppercase tracking-wide">Role: Customer</p>
                        </div>
                    </div>
                    <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Change Username
                    </p>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                        Username
                        </label>
                        <input
                            placeholder="JohnDoe"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            id="username"
                            type="text"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                            Email address
                            </label>
                            <input
                                placeholder="apple@juice.com"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                id="email"
                                type="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            className="w-full bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-pink-800 text-white"
                            // onClick={handleSubmit}
                        >
                            Save Changes
                        </button>

                        <button
                            className="mt-[1.6rem] w-full bg-red-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-red-800 text-red-600"
                            // onClick={handleSubmit}
                        >
                            Delete Account
                        </button>
                        
                    </div>
                </div>
                </div>
                
            </div>
        </div>
        </div>
        </main>
         </div>
        </div>
    )
}

export default ProfilePage