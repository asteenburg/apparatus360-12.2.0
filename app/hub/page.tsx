export default function hub() {
    return (
    <main className="py-8 sm:py-12 mt-0 flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-2 mt-12 sm:px-6 lg:px-8">

            {/* HEADER */}
            <header className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 mb-10">

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                    {/* LEFT TEXT */}
                    <div className="text-left flex-1">
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-gray-900 leading-tight">
                            <i className="fa-solid fa-cubes pr-3"></i>
                            Inspection Hub
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mt-3">
                            Welcome to the Apparatus360 control center. Start a new inspection or review recent
                            activity.
                        </p>
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-start lg:justify-end">
                        <a href="/checklist"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 
                                   text-base sm:text-lg font-medium rounded-md shadow-lg text-white 
                                   bg-red-600 hover:bg-red-500 transition duration-300 transform hover:scale-105 active:scale-95">
                            <i className="fa-solid fa-file-signature mr-3"></i>
                            Start New Checklist
                        </a>
                    </div>

                </div>
            </header>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                {/* LEFT COLUMN – ACTIVITY FEED */}
                <div className="lg:col-span-2" data-aos="fade-right" data-aos-duration="1000">

                    <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6">

                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                            <i className="fa-solid fa-clock-rotate-left mr-2 text-red-500"></i>
                            Recent Inspection History
                        </h2>

                        {/* LIST */}
                        <ul id="recent-inspections-list" className="space-y-4">
                            <li
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <p className="text-gray-700 font-medium">Truck 341 Inspection</p>
                                <span className="text-sm text-green-600 font-semibold">Completed 1h ago</span>
                            </li>

                            <li
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <p className="text-gray-700 font-medium">Truck 342 Inspection</p>
                                <span className="text-sm text-yellow-600 font-semibold">Pending Review</span>
                            </li>

                            <li
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <p className="text-gray-700 font-medium">Truck 344 Inspection</p>
                                <span className="text-sm text-red-600 font-semibold">Defects Found</span>
                            </li>

                            <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-700 italic">No further inspections recorded yet.</p>
                            </li>
                        </ul>

                        <button
                            className="mt-6 w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                            View All Reports
                        </button>
                    </div>

                </div>

                {/* RIGHT COLUMN – STATS + QUICK LINKS */}
                <div className="space-y-6" data-aos="fade-left" data-aos-duration="1000">

                    {/* STATS BOX */}
                    <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                            <i className="fa-solid fa-chart-line mr-2 text-blue-500"></i>
                            Fleet Performance Stats
                        </h2>

                        <div className="space-y-3">

                            <div className="bg-blue-50 p-3 rounded-lg flex justify-between">
                                <span className="text-blue-700">Total Trucks:</span>
                                <span className="font-bold text-blue-900">12</span>
                            </div>

                            <div className="bg-green-50 p-3 rounded-lg flex justify-between">
                                <span className="text-green-700">Inspections Today:</span>
                                <span className="font-bold text-green-900">3</span>
                            </div>

                            <div className="bg-red-50 p-3 rounded-lg flex justify-between">
                                <span className="text-red-700">Defective Vehicles:</span>
                                <span className="font-bold text-red-900">1</span>
                            </div>

                        </div>
                    </div>

                    {/* QUICK ACCESS */}
                    <div className="bg-white shadow-lg rounded-xl p-5 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                            <i className="fa-solid fa-link mr-2 text-gray-500"></i>
                            Quick Access Tools
                        </h2>

                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 transition block">
                                    Truck Maintenance Schedule
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-blue-600 hover:text-blue-800 transition block">
                                    Inspector Directory
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>

        </div>
    </main>
    );
    }   