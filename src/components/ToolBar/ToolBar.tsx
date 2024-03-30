import { FileData, FolderData, } from "services/types";

import ToolBarDefault from "./ToolBarDefault";
import ToolBarAction from "./ToolBarAction";

type ToolBarType = "action" | "default";

interface ToolBarProps {
	currentStorageId: number;
	clearCheckedItems: () => void;
	checkedItems: (FileData | FolderData)[];
	disableActions?: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({
	currentStorageId,
	checkedItems,
	clearCheckedItems,
	disableActions,
}) => {
	const currentToolBar: ToolBarType =
		checkedItems.length > 0 ? "action" : "default";

	return (
		<div className="sticky top-0 z-50 mb-2 flex h-16 w-full items-center gap-2 bg-white py-2.5 sm:gap-3">
			{currentToolBar === "default" ? (
				<ToolBarDefault currentStorageId={currentStorageId} />
			) : (
				<ToolBarAction
					currentStorageId={currentStorageId}
					checkedItems={checkedItems}
					clearCheckedItems={clearCheckedItems}
					disabled={disableActions}
				/>
			)}
		</div>
	);
};

export default ToolBar;