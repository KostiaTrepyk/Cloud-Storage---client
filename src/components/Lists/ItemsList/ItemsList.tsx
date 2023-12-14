import { twMerge } from "tailwind-merge";
import { useContextMenuContext } from "contexts/ContextMenuContext";

import ItemsListContextMenu from "components/ContextMenus/ItemsListContextMenu";

interface ItemsListProps
	extends React.PropsWithChildren,
		React.HTMLAttributes<HTMLUListElement> {
	currentFolderId: number;
}

const ItemsList: React.FC<ItemsListProps> = ({
	currentFolderId,
	children,
	...ulAttrs
}) => {
	const { handleContextMenu } = useContextMenuContext();

	return (
		<ul
			{...ulAttrs}
			className={twMerge("flex flex-wrap gap-2", ulAttrs.className)}
			onContextMenu={(e) => {
				handleContextMenu(
					e,
					<ItemsListContextMenu currentFolderId={currentFolderId} />
				);
			}}
		>
			{children}
		</ul>
	);
};

export default ItemsList;