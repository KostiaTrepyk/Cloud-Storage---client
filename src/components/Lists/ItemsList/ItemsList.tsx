import { twMerge } from "tailwind-merge";

interface ItemsListProps
	extends React.PropsWithChildren,
		React.HTMLAttributes<HTMLUListElement> {}

const ItemsList: React.FC<ItemsListProps> = ({ children, ...ulAttrs }) => {
	return (
		<ul
			{...ulAttrs}
			className={twMerge("flex flex-wrap gap-2 p-2", ulAttrs.className)}
		>
			{children}
		</ul>
	);
};

export default ItemsList;