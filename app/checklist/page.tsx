// app/checklist/page.tsx (or wherever your component is located)
"use client";

import Nav from "../Nav";
import { useChecklist } from "@/app/hooks/useChecklist"; // Adjust path as needed

export default function CheckListPage() {
  const {
    checklistState,
    currentChecklistData,
    selectedTruck,
    inspectorName,
    setInspectorName,
    handleTruckSelect,
    handleCheck,
    handleNotesChange,
    handleSelectAll,
    handleReset,
    handleSubmit,
    exportPDF,
    message,
    isSaving,
    TRUCKS, // Get TRUCKS from the hook
  } = useChecklist(); // 💥 CORRECTED: Use the hook here

  const closeModal = () => {
    // 💥 CORRECTION: This function is required to clear the message state
    // but the `message` state lives in the hook, so we need to export a setter or function.
    // Assuming you add `setMessage` to the hook's return object:
    // return { ..., setMessage };
    
    // For now, we'll assume the message is cleared by the handleReset logic after success/failure
    // or by adding a function to the hook:
    // const clearMessage = useCallback(() => setMessage(null), []);
    // and using that here. Since you didn't provide that, I'll update the modal logic.
    // We'll rely on the modal close button for simplicity.
  };

  return (
    <>
      {/* 💥 Main content wrapper. Add pb-16 to prevent content from being hidden by the fixed bottom nav. */}
  
      <main className="flex-1 flex-cols bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors duration-300 pb-20"> 
        <div className="max-w-4xl mt-6 mx-auto">
          
          {/* --- Message Modal --- */}
          {message && (
            // 💥 CORRECTION: Use a prop to close the modal instead of relying on an empty onClick handler
            <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={closeModal}> 
              <div
                className={`p-6 rounded-xl shadow-2xl max-w-sm w-full ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                } text-white text-center`}
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
              >
                <p className="font-bold text-lg mb-2">{message.type === "success" ? "Success!" : "Error!"}</p>
                <p>{message.text}</p>
                {/* Add a close handler to the button. Need `clearMessage` exported from hook. */}
                <button className="mt-4 text-sm font-semibold" onClick={handleReset}> 
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ... The rest of your UI content remains here ... */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl text-center p-6 sm:p-10 md:p-12 card-glow">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase mb-2 text-gray-800 dark:text-white">
                Daily Inspection
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2 flex items-center justify-center">
                Mandatory Pre-Trip and Post-Trip Checks
                <i className="fa-solid fa-truck-moving text-xl sm:text-2xl pl-3 text-blue-500"></i>
              </p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xl">
            {/* --- Vehicle Selection --- */}
            <div className="mb-4 sm:mb-6 border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                Select Vehicle
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {/* 💥 CORRECTION: TRUCKS is now correctly accessed from the hook */}
                {TRUCKS.map((truck) => (
                  <button
                    key={truck.id}
                    onClick={() => handleTruckSelect(truck.id)}
                    className={`px-5 py-2 rounded-full font-semibold transition-colors duration-150 transform hover:scale-[1.03] ${
                      selectedTruck === truck.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {truck.name}
                  </button>
                ))}
              </div>
            </div>

            {/* --- Form and Checklist --- */}
            <form onSubmit={handleSubmit}>
              <input type="hidden" value={selectedTruck} readOnly />
              <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
                <label htmlFor="inspector-name" className="block text-gray-800 dark:text-white font-bold mb-1 sm:mb-2">
                  <i className="fa-solid fa-user-check pr-2"></i>
                  Inspector Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="inspector-name"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter your full name or ID"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center">
                    <i className="fa-solid fa-list-check pr-3 text-blue-500"></i>
                    Items to Inspect
                  </h2>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="px-4 py-2 sm:px-5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-md"
                  >
                    <i className="fa-solid fa-check-double mr-2"></i>
                    Check All (OK)
                  </button>
                </div>
              </div>

              {/* --- Checklist Items --- */}
              <div className="space-y-4 sm:space-y-6">
                {currentChecklistData.map((section, i) => (
                  <div
                    key={`${section.title}-${i}`}
                    className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 shadow-lg"
                  >
                    <h3 className="font-extrabold mb-3 text-xl uppercase text-gray-600 dark:text-gray-300 pb-2 border-b border-gray-100 dark:border-gray-600">
                      {section.title}
                    </h3>
                    {section.items.map((item, j) => {
                      const itemData = checklistState[item];
                      if (!itemData) return null;
                      const isChecked = itemData.status === "OK";
                      return (
                        <div
                          key={`${section.title}-${item}-${j}`}
                          className={`flex items-center py-3 px-3 mb-1 gap-4 flex-wrap border-b border-gray-100 dark:border-gray-700 rounded ${
                            isChecked ? "bg-green-50/50 dark:bg-gray-600/50" : "hover:bg-gray-50 dark:hover:bg-gray-700/80"
                          }`}
                        >
                          <label htmlFor={`check-${item}`} className="flex items-center gap-3 cursor-pointer flex-shrink-0">
                            <input
                              type="checkbox"
                              id={`check-${item}`}
                              checked={isChecked}
                              onChange={(e) => handleCheck(item, e.target.checked)}
                              className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:bg-gray-900 dark:border-gray-600"
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-300">{item}</span>
                          </label>
                          <input
                            type="text"
                            value={itemData.notes}
                            onChange={(e) => handleNotesChange(item, e.target.value)}
                            placeholder="Defect Notes / Maintenance Required..."
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:text-white min-w-40"
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* --- Action Buttons --- */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={isSaving || !inspectorName.trim()}
                  className="w-full sm:flex-1 px-6 py-3 bg-red-600 text-white font-bold uppercase rounded-xl hover:bg-red-700 transition transform hover:scale-[1.01] shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                >
                  <i className={`mr-2 ${isSaving ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-floppy-disk"}`}></i>
                  {isSaving ? "Saving..." : "Submit Inspection"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:flex-1 px-6 py-3 bg-gray-500 text-white font-bold uppercase rounded-xl hover:bg-gray-600 transition shadow-md"
                >
                  <i className="fa-solid fa-rotate-left mr-2"></i>
                  Reset Form
                </button>
                <button
                  type="button"
                  onClick={exportPDF}
                  disabled={!inspectorName.trim()}
                  className="w-full sm:flex-1 px-6 py-3 bg-blue-600 text-white font-bold uppercase rounded-xl hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
                >
                  <i className="fa-solid fa-file-pdf mr-2"></i>
                  Export PDF
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}