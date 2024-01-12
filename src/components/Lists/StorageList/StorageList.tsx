import { twMerge } from "tailwind-merge";

interface StorageListProps
	extends React.PropsWithChildren,
		React.HTMLAttributes<HTMLUListElement> {}

const StorageList: React.FC<StorageListProps> = ({ children, ...ulAttrs }) => {
	return (
		<ul
			{...ulAttrs}
			className={twMerge("flex flex-col gap-3 p-1", ulAttrs.className)}
		>
			{children}
		</ul>
	);
};

export default StorageList;
