import { Icon } from "@iconify/react";

function Dashboard() {
    return(
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

                    <nav className="flex-1 py-6 px-4 space-y-1 bg-pink-100">
                        <div className="px-4 mb-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Main Menu</div>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all group">
                            <Icon icon="solar:widget-add-linear" width="20" stroke-width="1.5" className="group-hover:text-primary transition-colors"></Icon>
                            Shop
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white hover:shadow-sm dark:hover:bg-slate-800 transition-all group">
                            <Icon icon="solar:bed-linear" width="20" stroke-width="1.5" className="group-hover:text-primary transition-colors"></Icon>
                            Cart
                            <span className="ml-auto text-xs bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500">0</span>
                        </a>
                        
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-all group">
                            <Icon icon="solar:users-group-rounded-linear" width="20" stroke-width="1.5"></Icon>
                            History
                        </a>
                    </nav>
                </aside>

                <main className="flex-1 w-full min-w-0 flex flex-col">
                    
                    <header className="h-20 glass sticky top-0 z-30 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
                        <div className="flex items-center gap-4">
                            <label htmlFor="mobile-menu-toggle" className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                <Icon icon="solar:hamburger-menu-linear" width="24"></Icon>
                            </label>

                            <div className="hidden sm:block">
                                <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">Dashboard</h1>
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
                    <div className="flex flex-row flex-wrap bg-pink-100">
                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="group relative h-96 w-72 perspective-[1000px]">
                            <div
                                className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]"
                            >
                                {/* <img src="/WEB-MT-AO-KY-ON-CJ-261/frontend/public/images/Icecream.jpg" alt="" /> */}
                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-350 p-6 text-white backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="flex justify-between items-start">
                                    <div className="text-3xl font-bold">Caramel Pecan</div>
                                    <div className="text-5xl">🌟</div>
                                    </div>
                                    <div className="mt-4">
                                    <p className="text-lg">
                                        Buttered pecans in caramel ice cream.
                                    </p>
                                    </div>
                                    <div className="mt-auto">
                                    <p className="text-sm opacity-75">Hover to flip!</p>
                                    </div>
                                </div>
                                </div>

                                <div
                                className="absolute w-full h-full rounded-xl bg-linear-to-br from-350 to-purple-600 p-6 text-white transform-[rotateX(180deg)] backface-hidden"
                                >
                                <div className="flex flex-col h-full">
                                    <div className="text-2xl font-bold mb-4">Caramel Pecancut</div>
                                    <div className="grow">
                                    <p className="text-lg">
                                        Ketika ku mendengar bahwa...
                                    </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto">
                                    <button
                                        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                    >
                                        Checkout!
                                    </button>
                                    <span className="text-3xl">✨</span>
                                    </div>
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

export default Dashboard