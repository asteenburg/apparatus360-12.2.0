"use client";

import { useState, useCallback, useMemo } from "react";
import { jsPDF } from "jspdf";
import trucksData from "@/data/trucks.json";
import truck341Checklist from "@/data/truck341.json";
import truck342Checklist from "@/data/truck342.json";
import truck344Checklist from "@/data/truck344.json";

type ChecklistItem = { status: "Defect" | "OK"; notes: string; checkTimestamp: string | null };
type ChecklistState = Record<string, ChecklistItem>;
type ChecklistSection = { title: string; items: string[] };

const CHECKLIST_MAP: Record<number, { checklist: ChecklistSection[] }> = {
  341: truck341Checklist,
  342: truck342Checklist,
  344: truck344Checklist,
};

const TRUCKS = trucksData.trucks;
const DEFAULT_TRUCK_ID = TRUCKS[0]?.id || 341;

const createInitialChecklistState = (data: ChecklistSection[]): ChecklistState => {
  const state: ChecklistState = {};
  data.forEach((section) =>
    section.items.forEach((item) => {
      state[item] = { status: "Defect", notes: "", checkTimestamp: null };
    })
  );
  return state;
};

export default function CheckListApp() {
  const [selectedTruck, setSelectedTruck] = useState<number>(DEFAULT_TRUCK_ID);
  const [inspectorName, setInspectorName] = useState("");
  const [checklistState, setChecklistState] = useState<ChecklistState>(() =>
    createInitialChecklistState(CHECKLIST_MAP[DEFAULT_TRUCK_ID].checklist)
  );
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const currentChecklistData = useMemo(() => CHECKLIST_MAP[selectedTruck]?.checklist || [], [selectedTruck]);

  // New function to simply clear the message state
  const clearMessage = useCallback(() => setMessage(null), []);

  const handleTruckSelect = useCallback((truckId: number) => {
    setSelectedTruck(truckId);
    setChecklistState(createInitialChecklistState(CHECKLIST_MAP[truckId]?.checklist || []));
  }, []);

  const handleCheck = useCallback((itemName: string, isChecked: boolean) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        status: isChecked ? "OK" : "Defect",
        checkTimestamp: isChecked ? new Date().toISOString() : null,
      },
    }));
  }, []);

  const handleNotesChange = useCallback((itemName: string, notes: string) => {
    setChecklistState((prev) => ({
      ...prev,
      [itemName]: { ...prev[itemName], notes },
    }));
  }, []);

  const handleSelectAll = () => {
    const newState: ChecklistState = {};
    currentChecklistData.forEach((section) =>
      section.items.forEach((item) => {
        newState[item] = { ...checklistState[item], status: "OK", checkTimestamp: new Date().toISOString() };
      })
    );
    setChecklistState(newState);
  };

  const handleReset = () => {
    setChecklistState(createInitialChecklistState(currentChecklistData));
    setInspectorName("");
    setMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectorName.trim()) {
      setMessage({ type: "error", text: "Inspector Name is required!" });
      return;
    }

    const inspection = {
      truck_id: selectedTruck,
      inspector_name: inspectorName.trim(),
      timestamp: new Date().toISOString(),
      results: checklistState,
    };

    setIsSaving(true);
    try {
      const inspections = JSON.parse(localStorage.getItem("inspections") || "[]");
      inspections.push(inspection);
      localStorage.setItem("inspections", JSON.stringify(inspections));
      setMessage({ type: "success", text: `Inspection for Truck ${selectedTruck} saved locally!` });
      setTimeout(handleReset, 2000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Local storage error" });
    } finally {
      setIsSaving(false);
    }
  };

  const exportPDF = () => {
    if (!inspectorName.trim()) {
      setMessage({ type: "error", text: "Inspector Name required for PDF export." });
      return;
    }

    const pdf = new jsPDF();
    let y = 10;
    const truckNameObj = TRUCKS.find((t) => t.id === selectedTruck);
    const truckName = truckNameObj ? truckNameObj.name : `Truck ${selectedTruck}`;
    const timestamp = new Date().toLocaleString();

    pdf.setFontSize(18);
    pdf.text("Truck Inspection Report", 105, y, { align: "center" });
    y += 10;
    pdf.setFontSize(12);
    pdf.text(`Truck: ${truckName}`, 10, y);
    pdf.text(`Inspector: ${inspectorName}`, 100, y);
    y += 6;
    pdf.text(`Date: ${timestamp}`, 10, y);
    y += 10;

    currentChecklistData.forEach((section) => {
      pdf.setFontSize(14);
      pdf.text(section.title, 10, y);
      y += 7;

      section.items.forEach((item) => {
        const itemData = checklistState[item];
        if (!itemData) return;

        const statusText = itemData.status === "OK" ? "PASS" : "DEFECT";
        const statusColor = itemData.status === "OK" ? "#10B981" : "#EF4444";

        pdf.setFillColor(statusColor);
        pdf.circle(12, y - 3, 1, "F");
        pdf.setFontSize(11);
        pdf.text(`  ${item} - ${statusText}`, 15, y);
        y += 5;

        if (itemData.notes.trim()) {
          pdf.setFontSize(10);
          pdf.text(`   Notes: ${itemData.notes}`, 15, y);
          y += 5;
        }

        const time = itemData.checkTimestamp ? new Date(itemData.checkTimestamp).toLocaleTimeString() : "—";
        pdf.setFontSize(10);
        pdf.text(`   Time: ${time}`, 15, y);
        y += 6;

        if (y > 270) {
          pdf.addPage();
          y = 10;
        }
      });
      y += 5;
    });

    pdf.save(`Truck_${selectedTruck}_Inspection_${new Date().toLocaleDateString()}.pdf`);
  };

  return {
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
    clearMessage, // <-- NEW: Exported to allow external modal closing
  };
}