import Progress from "components/UI/Progress/Progress";
import { StorageDataWithRemainingSpace } from "services/types";
import { twMerge } from "tailwind-merge";

interface StorageListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	item: StorageDataWithRemainingSpace;
	active?: boolean;
}

const StorageListItem: React.FC<StorageListItemProps> = ({
	item,
	active,
	...liAttrs
}) => {
	return (
		<li
			{...liAttrs}
			className={twMerge(
				"flex flex-col gap-1 rounded border border-neutral-100 p-2 shadow-md transition-colors duration-300",
				active ? "bg-neutral-100 text-rose-600" : "",
				liAttrs.className
			)}
		>
			<h2 className="text-lg font-semibold">{item.name}</h2>
			<Progress value={100 - (item.remainingSpace / item.size) * 100} />
			<span className="text-sm">
				{Number(item.remainingSpace).toFixed(1)}MB / {item.size}MB
			</span>
		</li>
	);
};

export default StorageListItem;
