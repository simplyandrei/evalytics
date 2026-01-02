import { useState } from "react";
import type { Tab } from "../interfaces/User";

interface SettingsModalProps {
    tabs: Tab[];
    onAddTab: (name: string, weight: number) => void;
}

export default function SettingsModal({ tabs, onAddTab }: SettingsModalProps) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);

    const currentTotalWeight = tabs.reduce((sum, tab) => sum + tab.weight, 0);

    const handleAddTab = () => {
        const newTotalWeight = currentTotalWeight + weight;

        if (newTotalWeight > 100) {
            alert(`Weight exceeds 100%! Current total: ${currentTotalWeight}%. Please enter a weight of ${100 - currentTotalWeight}% or less.`);
            setWeight(0);
            return;
        }

        onAddTab(name, weight);
        setName("");
        setWeight(0);
        setShowModal(false);
    };

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                Add Tab
            </button>

            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Tab</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="tabName" className="form-label">Tab Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tabName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter tab name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tabWeight" className="form-label">Weight (%) - Current Total: {currentTotalWeight}%</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="tabWeight"
                                        value={weight}
                                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                                        placeholder={`Enter weight (max ${100 - currentTotalWeight}%)`}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddTab}>Create Tab</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}