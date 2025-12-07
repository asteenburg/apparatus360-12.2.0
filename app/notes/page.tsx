export default function NotesPage() {
    return (
        <main className="py-8 sm:py-12 mt-6 flex-grow">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

                {/* HEADER */}
                <header className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 mb-10">

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                        {/* LEFT TEXT */}
                        <div className="text-left flex-1">
                            <h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-gray-900 leading-tight">
                                <i className="fa-solid fa-note-sticky pr-3"></i>
                                Release Notes
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 mt-3">
                                Application updates, new features, and improvements.
                            </p>
                        </div>

                    </div>
                </header>

                {/* MAIN CONTENT */}
                <div className="bg-gray-100 shadow-lg rounded-xl p-5 sm:p-6">

                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                        <i className="fa-solid fa-sticky-note mr-2 text-red-500"></i>
                        Latest Updates
                    </h2>

                    {/* NOTES LIST */}
                    <ul id="notes-list" className="space-y-4">
                        <li
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <p className="text-gray-700 font-medium text-sm">Beta release v1.0.0</p>
                            <p className="text-gray-700 font-medium text-sm">Initial release<br/>
                            Added checklist items to dropdown menus making it cleaner and more organized.<br/>
                            Added release notes section</p>
                            <span className="text-sm text-gray-500 font-semibold">12/06/25</span>
                        </li>

                        {/*<li
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                            <p className="text-gray-700 font-medium">Sample Note 2</p>
                            <span className="text-sm text-gray-500 font-semibold">Created 1d ago</span>
                        </li>*/}

                        {/* More notes can be added here */}
                    </ul>

                </div>
            </div>
        </main>
    );
}   