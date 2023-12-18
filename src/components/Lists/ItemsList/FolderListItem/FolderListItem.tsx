import { twMerge } from "tailwind-merge";
import { Folder } from "services/foldersApi";

import { FolderIcon } from "components/SvgIcons/FolderIcon";
import ItemContainer from "../ItemContainer";

interface FolderListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	item: Folder;
	onDoubleClick: () => void;

	checked?: boolean;
	removeItemfromChecked: (item: Folder) => void;
	addItemToChecked: (item: Folder) => void;
	showCheckIndicator?: boolean;
}

const FolderListItem: React.FC<FolderListItemProps> = ({
	item,
	onDoubleClick,
	checked,
	removeItemfromChecked,
	addItemToChecked,
	showCheckIndicator,
	...liAttrs
}) => {
	function CheckedChangeHandler() {
		if (!checked) addItemToChecked(item);
		else removeItemfromChecked(item);
	}

	return (
		<ItemContainer
			{...liAttrs}
			className={twMerge("group/item", liAttrs.className)}
			checked={checked}
		>
			<input
				className={`absolute left-2 top-2 z-10 aspect-square h-4 cursor-pointer accent-rose-600 transition duration-[500ms] focus-visible:opacity-100 group-hover/item:opacity-100
				${showCheckIndicator ? "opacity-100" : "opacity-0"}`}
				type="checkbox"
				onChange={CheckedChangeHandler}
				checked={checked}
			/>
			<div
				className="mx-2 flex h-[5.5rem] w-full cursor-pointer items-center justify-center sm:h-[7.5rem] md:h-[8.5rem]"
				onDoubleClick={onDoubleClick}
			>
				<FolderIcon className="scale-[0.5] text-neutral-600" />
			</div>

			<div className="mt-auto w-full select-text border-t px-2 py-[0.15rem]">
				<span className="line-clamp-1 text-center">{item.name}</span>
			</div>
		</ItemContainer>
	);
};

export default FolderListItem;