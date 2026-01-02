import { useState } from "react";
import type { Tab as TabType } from "../../interfaces/User";

interface TabProps {
    tab: TabType;
    onUpdateName: (id: number, name: string) => void;
    onUpdateWeight: (id: number, weight: number) => void;
    onDelete: (id: number) => void;
    onAddScore: (tabId: number, label: string, score: number, totalScore: number) => void;
}

export default function Tab({ tab, onDelete, onAddScore }: TabProps) {
    const [showModal, setShowModal] = useState(false);
    const [label, setLabel] = useState("");
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    const handleAddScore = () => {
        onAddScore(tab.id, label, score, totalScore);
        setLabel("");
        setScore(0);
        setTotalScore(0);
        setShowModal(false);
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
                                <span className="badge text-bg-primary rounded-pill">{score.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="d-flex justify-content-center gap-4">
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(tab.id)}>Delete Tab</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>Add New Score</button>
                </div>
            </div>
            
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ position: 'relative', zIndex: 1001 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Score</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddScore}>Add Score</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}