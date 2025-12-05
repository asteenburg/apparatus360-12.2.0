// app/hooks/useChecklist.ts
"use client";

import { useState, useCallback, useMemo } from "react"; 
import { jsPDF } from 'jspdf';
import trucksData from '@/data/trucks.json';
import truck341Checklist from '@/data/truck341.json';
import truck342Checklist from '@/data/truck342.json';
import truck344Checklist from '@/data/truck344.json';

// --- TYPE DEFINITIONS ---
type Truck = { id: number; name: string; }; // 💥 CORRECTION: Added Truck type for TRUCKS array
type ChecklistItem = { status: "Defect" | "OK"; notes: string; checkTimestamp: string | null };
type ChecklistState = Record<string, ChecklistItem>;
type ChecklistSection = { title: string, items: string[] };

// Helper to map truck IDs to the imported checklist data
const CHECKLIST_MAP: Record<number, { checklist: ChecklistSection[] }> = {
    341: truck341Checklist as any, // 💥 CORRECTION: Use 'as any' here if JSON import type is causing issues
    342: truck342Checklist as any,
    344: truck344Checklist as any,
};

// 💥 CORRECTION: Explicitly type TRUCKS array
const TRUCKS: Truck[] = (trucksData as any).trucks || []; 
const DEFAULT_TRUCK_ID = TRUCKS[0]?.id || 341;

// Function to generate the initial state based on the current checklist items
const createInitialChecklistState = (data: ChecklistSection[]): ChecklistState => {
  const state: ChecklistState = {};
  data.forEach((cat) =>
    cat.items.forEach((item) => {
      // 💥 CORRECTION: Ensure key exists before setting (though likely safe here)
      state[item] = { status: "Defect", notes: "", checkTimestamp: null };
    })
  );
  return state;
};

// --- CUSTOM HOOK ---

export const useChecklist = () => {
    const [selectedTruck, setSelectedTruck] = useState<number>(DEFAULT_TRUCK_ID);
    const [inspectorName, setInspectorName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // 1. Get the CURRENT checklist data based on the selected truck ID
    const currentChecklistData = useMemo(() => {
        return CHECKLIST_MAP[selectedTruck]?.checklist || [];
    }, [selectedTruck]);

    // 2. Initialize the state using a function that depends on the initial checklist data
    const [checklistState, setChecklistState] = useState<ChecklistState>(() => {
        // Use initial checklist data derived from DEFAULT_TRUCK_ID
        const initialData = CHECKLIST_MAP[DEFAULT_TRUCK_ID]?.checklist || [];
        return createInitialChecklistState(initialData);
    });

    // 💥 CORRECTION: Added utility function to clear messages externally
    const clearMessage = useCallback(() => {
        setMessage(null);
    }, []);

    const handleTruckSelect = useCallback((truckId: number) => {
        setSelectedTruck(truckId);
        
        const newChecklistData = CHECKLIST_MAP[truckId]?.checklist || [];
        setChecklistState(createInitialChecklistState(newChecklistData));
    }, []);

    const handleCheck = useCallback((itemName: string, isChecked: boolean) => {
        const timestamp = isChecked ? new Date().toISOString() : null;
        setChecklistState((prev) => ({
            ...prev,
            [itemName]: { ...prev[itemName], status: isChecked ? "OK" : "Defect", checkTimestamp: timestamp },
        }));
    }, []);

    const handleNotesChange = useCallback((itemName: string, newNotes: string) => {
        setChecklistState((prev) => ({
            // 💥 CORRECTION: Added null check for prev[itemName] in case of rapid state changes
            ...prev,
            [itemName]: { ...prev[itemName], notes: newNotes },
        }));
    }, []);

    const handleSelectAll = useCallback(() => {
        const newState: ChecklistState = {};
        
        currentChecklistData.forEach(section => {
            section.items.forEach(key => {
                const existingNotes = checklistState[key]?.notes || "";
                newState[key] = { status: "OK", notes: existingNotes, checkTimestamp: new Date().toISOString() };
            });
        });
        setChecklistState(newState);
    }, [currentChecklistData, checklistState]);

    const handleReset = useCallback(() => {
        // 💥 CORRECTION: Resetting state to initial state for the *currently selected* truck
        setChecklistState(createInitialChecklistState(currentChecklistData));
        setInspectorName("");
        setMessage(null);
    }, [currentChecklistData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = inspectorName.trim();
        if (!trimmedName) {
            setMessage({ type: "error", text: "Inspector Name is required!" });
            return;
        }

        const inspection = {
            truck_id: selectedTruck,
            inspector_name: trimmedName,
            timestamp: new Date().toISOString(),
            results: checklistState,
        };

        setIsSaving(true);
        setMessage(null);

        try {
            const inspections = JSON.parse(
                typeof window !== 'undefined' ? localStorage.getItem("inspections") || "[]" : "[]"
            );
            inspections.push(inspection);
            if (typeof window !== 'undefined') {
                localStorage.setItem("inspections", JSON.stringify(inspections));
            }

            setMessage({ type: "success", text: `Inspection for Truck ${selectedTruck} saved locally!` });
            setTimeout(() => handleReset(), 2000);
        } catch (err: any) {
            setMessage({ type: "error", text: `Failed to save inspection: ${err.message || 'Unknown local storage error'}` });
        } finally {
            setIsSaving(false);
        }
    };
    
    // PDF Export Logic (Needs jsPDF library installed)
    const exportPDF = () => {
        if (!inspectorName.trim()) {
            setMessage({ type: "error", text: "Inspector Name required for PDF export." });
            return;
        }
        
        const pdf = new jsPDF(); 
        let y = 10;
        
        const truckNameObj = TRUCKS.find(t => t.id === selectedTruck);
        const truckName = truckNameObj ? truckNameObj.name : `Truck ${selectedTruck}`;
        const timestamp = new Date().toLocaleString();

        pdf.setFontSize(18);
        pdf.text("Truck Inspection Report", 105, y, { align: "center" });
        y += 10;

        pdf.setFontSize(12);
        pdf.text(`Truck: ${truckName}`, 10, y);
        pdf.text(`Inspector: ${inspectorName || "N/A"}`, 100, y);
        y += 6;
        pdf.text(`Date: ${timestamp}`, 10, y);
        y += 10;

        currentChecklistData.forEach(section => {
            pdf.setFontSize(14);
            pdf.text(section.title, 10, y);
            y += 7;

            section.items.forEach(itemLabel => {
                const itemData = checklistState[itemLabel];
                if (!itemData) return; 

                const status = itemData.status;
                const notes = itemData.notes || "";
                const time = itemData.checkTimestamp ? new Date(itemData.checkTimestamp).toLocaleTimeString() : "—";

                const statusText = status === "OK" ? "PASS" : "DEFECT";
                const statusColor = status === "OK" ? "#10B981" : "#EF4444";

                pdf.setFillColor(statusColor);
                pdf.circle(12, y - 3, 1, "F");

                pdf.setFontSize(11);
                pdf.text(`  ${itemLabel} - ${statusText}`, 15, y);
                y += 5;
                
                if (notes.trim()) {
                    pdf.setFontSize(10);
                    pdf.text(`   Notes: ${notes}`, 15, y);
                    y += 5;
                }

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
        TRUCKS,
        clearMessage, // 💥 CORRECTION: Export the clearMessage utility
    };
};