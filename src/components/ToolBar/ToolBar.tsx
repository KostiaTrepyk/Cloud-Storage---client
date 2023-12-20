import { FileData, Folder } from "services/types";

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
		<div className="fixed top-0 z-50 mb-2 flex h-16 w-full items-center gap-2 overflow-x-auto bg-white py-2.5 sm:gap-3">
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