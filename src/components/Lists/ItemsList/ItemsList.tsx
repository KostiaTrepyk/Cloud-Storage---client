interface ItemsListProps extends React.PropsWithChildren {}

const ItemsList: React.FC<ItemsListProps> = ({ children }) => {
	return <ul className="flex flex-wrap gap-2">{children}</ul>;
};

export default ItemsList;