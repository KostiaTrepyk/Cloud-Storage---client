import { twMerge } from "tailwind-merge";

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
	return (
		<ul
			{...ulAttrs}
			className={twMerge("flex flex-wrap gap-2", ulAttrs.className)}
		>
			{children}
		</ul>
	);
};

export default ItemsList;