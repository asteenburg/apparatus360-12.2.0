"use client";

import Nav from "../Nav";
import useChecklist from "../CheckListApp";
import trucksData from "@/data/trucks.json";

const TRUCKS = trucksData.trucks;

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
    openSections,
    toggleSection,
    setShowModal,
    showModal,
    modalMessage,
  } = useChecklist();

  // Calculate progress
  const totalItems = Object.keys(checklistState).length;
  const completedItems = Object.values(checklistState).filter(item => item.status === "OK").length;
  const progressPercentage = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  return (
    <div className="bg-gray-100">
      <Nav />
      <main className="flex-1 min-w-60 bg-gray-100 min-h-screen p-6 pb-20 max-w-4xl mx-auto">

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold mb-4">{modalMessage}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Truck Selection */}
        <section className="mb-6 mt-20">
          <h2 className="text-lg font-bold text-gray-800 mb-2 uppercase">
            Select Vehicle
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {TRUCKS.map((truck) => (
              <button
                key={truck.id}
                onClick={() => handleTruckSelect(truck.id)}
                className={`px-5 py-2 rounded-md font-semibold transition-colors duration-150 transform hover:scale-[1.03] ${
                  selectedTruck === truck.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {truck.name}
              </button>
            ))}
          </div>
        </section>

        {/* Inspector Name */}
        <section className="mb-6 border-b pb-4">
          <label className="block text-gray-800 font-bold mb-2">
            Inspector Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectorName}
            onChange={(e) => setInspectorName(e.target.value)}
            placeholder="Enter your full name or ID"
            className="w-full text-sm uppercase border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50 hover:border-blue-400"
          />
        </section>

        {/* Progress Bar */}
<section className="mb-6">
  <label className="block text-gray-700 font-semibold mb-1">Progress</label>
  <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden">
    <div
      className={`h-6 transition-all duration-500 ${
        progressPercentage <= 33
          ? "bg-red-500"
          : progressPercentage <= 66
          ? "bg-yellow-400"
          : "bg-green-500"
      }`}
      style={{ width: `${progressPercentage}%` }}
    ></div>
    <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">
      {progressPercentage.toFixed(1)}%
    </span>
  </div>
  <p className="text-sm text-gray-600 mt-1">
    {completedItems} of {totalItems} items completed
  </p>
</section>

        {/* Driver/Passenger Sections */}
        {currentChecklistData.map((side) => {
          const isSideOpen = openSections[side.id];
          return (
            <div key={side.id} className="mb-4 rounded-sm bg-white shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection(side.id)}
                className="w-full text-left p-4 font-bold text-gray-900 bg-gray-200 rounded-t-md hover:bg-gray-300 hover:text-red-500 transition"
              >
                {side.title}
              </button>

              {isSideOpen && (
                <div className="px-2 pt-2 pb-4">
                  {side.compartments.map((compartment) => {
                    const isCompOpen = openSections[compartment.id];
                    return (
                      <div
                        key={compartment.id}
                        className="mb-3 border rounded-sm bg-gray-50 shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSection(compartment.id)}
                          className="w-full text-left px-4 py-2 font-semibold text-gray-500 rounded-t-sm transition"
                        >
                          <span className={`fa-solid ${isCompOpen ? "fa-minus" : "fa-plus"} p-4`}></span>
                          {compartment.title}
                        </button>

                        {isCompOpen && (
                          <div className="pl-4 pr-4 pt-2 pb-3 space-y-3">
                            {compartment.items.length > 0 ? (
                              compartment.items.map((item) => (
                                <div
                                  key={item}
                                  className={`flex items-center gap-3 p-2 rounded-lg ${
                                    checklistState[item]?.status === "OK"
                                      ? "bg-green-50 dark:bg-green-900/50"
                                      : "hover:bg-gray-100 dark:hover:bg-gray-600/50"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checklistState[item]?.status === "OK"}
                                    onChange={(e) => handleCheck(item, e.target.checked)}
                                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 dark:bg-gray-900 dark:border-gray-600"
                                  />
                                  <span className="flex-1 text-gray-700">{item}</span>
                                  <input
                                    type="text"
                                    value={checklistState[item]?.notes || ""}
                                    onChange={(e) => handleNotesChange(item, e.target.value)}
                                    placeholder="Notes"
                                    className="flex-1 border border-gray-500 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                                  />
                                </div>
                              ))
                            ) : (
                              <div className="italic text-gray-500 dark:text-gray-400 p-2">
                                No items in this compartment
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex-1 px-2 py-2 bg-red-600 text-white text-sm font-bold uppercase rounded-md hover:bg-red-700 transition shadow-lg disabled:opacity-100"
          >
            {isSaving ? "Saving..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-2 py-2 bg-gray-500 text-white text-sm font-bold uppercase rounded-md hover:bg-gray-600 transition shadow-md"
          >
            Reset Form
          </button>
          <button
            type="button"
            onClick={exportPDF}
            disabled={!inspectorName.trim()}
            className="flex-1 px-2 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-md hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
          >
            Export PDF
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex-1 px-2 py-2 bg-green-600 text-white text-sm font-bold uppercase rounded-md hover:bg-green-700 transition shadow-lg"
          >
            Check All
          </button>
        </div>
      </main>
    </div>
  );
}
