import Tab from "./tab";
import type { Tab as TabType } from "../../interfaces/User";

interface ScoresTabProps {
    tabs: TabType[];
    onUpdateTabName: (id: number, name: string) => void;
    onUpdateTabWeight: (id: number, weight: number) => void;
    onDeleteTab: (id: number) => void;
    onAddScore: (tabId: number, label: string, score: number, totalScore: number) => void;
}

export default function ScoresTab({ tabs, onUpdateTabName, onUpdateTabWeight, onDeleteTab, onAddScore }: ScoresTabProps) {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {tabs.map(tab => (
                    <Tab key={tab.id} tab={tab} onUpdateName={onUpdateTabName} onUpdateWeight={onUpdateTabWeight} onDelete={onDeleteTab} onAddScore={onAddScore} />
                ))}
            </div>
        </>
    );
}