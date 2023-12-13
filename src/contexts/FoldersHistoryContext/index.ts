import { createContext } from "react";
import { useFoldersHistoryContext } from "./useFoldersHistoryContext";
import { FoldersHistoryContextProvider } from "./Provider";

interface FoldersHistoryContextType {
	currentFolderId: number;
	history: number[];
	historyNext: (folderId: number) => void;
	historyBack: () => void;
}

const FoldersHistoryContext = createContext<FoldersHistoryContextType | null>(null);

export default FoldersHistoryContext
export {
	useFoldersHistoryContext,
	FoldersHistoryContextProvider,
};