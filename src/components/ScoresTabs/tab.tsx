import { useState } from "react";
import type { Tab as TabType } from "../../interfaces/User";

interface TabProps {
    tab: TabType;
    onUpdateName: (id: number, name: string) => void;
    onUpdateWeight: (id: number, weight: number) => void;
    onDelete: (id: number) => void;
    onAddScore: (tabId: number, label: string, score: number, totalScore: number) => void;
    onEditScore: (tabId: number, scoreId: number, label: string, score: number, totalScore: number) => void;
    onDeleteScore: (tabId: number, scoreId: number) => void;
}

export default function Tab({ tab, onDelete, onAddScore, onEditScore, onDeleteScore, onUpdateName, onUpdateWeight }: TabProps) {
    const [showModal, setShowModal] = useState(false);
    const [showEditTabModal, setShowEditTabModal] = useState(false);
    const [label, setLabel] = useState("");
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [editingScoreId, setEditingScoreId] = useState<number | null>(null);
    const [editTabName, setEditTabName] = useState(tab.name);
    const [editTabWeight, setEditTabWeight] = useState(tab.weight);

    const handleAddScore = () => {
        if (editingScoreId !== null) {
            onEditScore(tab.id, editingScoreId, label, score, totalScore);
            setEditingScoreId(null);
        } else {
            onAddScore(tab.id, label, score, totalScore);
        }
        setLabel("");
        setScore(0);
        setTotalScore(0);
        setShowModal(false);
    };

    const handleEditScore = (scoreId: number, currentLabel: string, currentScore: number, currentTotalScore: number) => {
        setEditingScoreId(scoreId);
        setLabel(currentLabel);
        setScore(currentScore);
        setTotalScore(currentTotalScore);
        setShowModal(true);
    };

    const handleDeleteScore = (scoreId: number) => {
        onDeleteScore(tab.id, scoreId);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingScoreId(null);
        setLabel("");
        setScore(0);
        setTotalScore(0);
    };

    const handleSaveTabEdit = () => {
        onUpdateName(tab.id, editTabName);
        onUpdateWeight(tab.id, editTabWeight);
        setShowEditTabModal(false);
    };

    const openEditTabModal = () => {
        setEditTabName(tab.name);
        setEditTabWeight(tab.weight);
        setShowEditTabModal(true);
    };

    const closeEditTabModal = () => {
        setShowEditTabModal(false);
    };


    return (
        <>
            <div className="p-5 bg-body-tertiary rounded-4 justify-content-center text-center">
                <h2 className="fw-bold">{tab.name || 'Scores Tab'}</h2>
                <p className="text-muted">Weight: {tab.weight}%</p>

                <div className="mt-3 mb-3">
                    <ul className="list-group">
                        {tab.scores.map(score => (
                            <li key={score.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{score.label || 'Test Score'}</strong>
                                    <br />
                                    <small className="text-muted">{score.score} / {score.totalScore}</small>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleEditScore(score.id, score.label, score.score, score.totalScore)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteScore(score.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="d-flex justify-content-center gap-4">
                    <button type="button" className="btn btn-primary" onClick={openEditTabModal}>Edit Tab</button>
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(tab.id)}>Delete Tab</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>Add New Score</button>
                </div>
            </div>
            
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ position: 'relative', zIndex: 1001 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingScoreId !== null ? 'Edit Score' : 'Add New Score'}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="scoreLabel" className="form-label">Score Label</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="scoreLabel"
                                        value={label}
                                        onChange={(e) => setLabel(e.target.value)}
                                        placeholder="Enter score label (e.g., Midterm, Quiz)"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="scoreValue" className="form-label">Score</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="scoreValue"
                                        value={score}
                                        onChange={(e) => setScore(parseFloat(e.target.value))}
                                        placeholder="Enter score"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="totalScore" className="form-label">Total Score (Max Score)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="totalScore"
                                        value={totalScore}
                                        onChange={(e) => setTotalScore(parseFloat(e.target.value))}
                                        placeholder="Enter total/max score"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddScore}>{editingScoreId !== null ? 'Update Score' : 'Add Score'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditTabModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ position: 'relative', zIndex: 1001 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Tab</h5>
                                <button type="button" className="btn-close" onClick={closeEditTabModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="tabName" className="form-label">Tab Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tabName"
                                        value={editTabName}
                                        onChange={(e) => setEditTabName(e.target.value)}
                                        placeholder="Enter tab name (e.g., Midterms, Quizzes)"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tabWeight" className="form-label">Weight (%)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="tabWeight"
                                        value={editTabWeight}
                                        onChange={(e) => setEditTabWeight(parseFloat(e.target.value))}
                                        placeholder="Enter weight percentage"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeEditTabModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveTabEdit}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}