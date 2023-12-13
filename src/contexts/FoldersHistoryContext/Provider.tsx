import { PropsWithChildren, useState } from "react";
import FoldersHistoryContext from "."

export const FoldersHistoryContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const [currentFolderId, setCurrentFolderId] = useState<number>(0);
	const [history, setHistory] = useState<number[]>([]);

	function historyNext(folderId: number) {
		setCurrentFolderId(folderId);
		setHistory((prev) => [...prev, folderId]);
	}

	function historyBack() {
		if (history.length === 0) {
			setCurrentFolderId(0);
			return;
		}

		setHistory((prev) => {
			const result = prev;
			result.length = prev.length - 1;
			return prev;
		});
		setCurrentFolderId(history.at(history.length - 1) ?? 0);
	}

	const value = {
		currentFolderId,
		history,
		historyNext,
		historyBack,
	};

	return (
		<FoldersHistoryContext.Provider value={value}>
			{children}
		</FoldersHistoryContext.Provider>
	);
};