import { useContext } from "react";
import FoldersHistoryContext from ".";

export const useFoldersHistoryContext = () => {
	const foldersHistory = useContext(FoldersHistoryContext);

	if (!foldersHistory) throw new Error("FoldersHistoryContext Provider !!!");

	return foldersHistory;
};