import { FileData } from "services/filesApi";
import { Folder } from "services/foldersApi";

import ToolBarDefault from "./ToolBarDefault";
import ToolBarAction from "./ToolBarAction";

type ToolBarType = "action" | "default";

interface ToolBarProps {
	clearCheckedItems: () => void;
	checkedItems: (FileData | Folder)[];
	disableActions?: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({
	checkedItems,
	clearCheckedItems,
	disableActions,
}) => {
	const currentToolBar: ToolBarType =
		checkedItems.length > 0 ? "action" : "default";

	return (
		<div className="h-16 fixed top-0 z-50 mb-2 flex w-full items-center gap-2 overflow-x-auto bg-white py-2.5 sm:gap-3">
			{currentToolBar === "default" ? (
				<ToolBarDefault />
			) : (
				<ToolBarAction
					checkedItems={checkedItems}
					clearCheckedItems={clearCheckedItems}
					disabled={disableActions}
				/>
			)}
		</div>
	);
};

export default ToolBar;