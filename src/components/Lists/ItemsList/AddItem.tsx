import AddFileIcon from "components/SvgIcons/AddFileIcon";
import CreateFolderIcon from "components/SvgIcons/CreateFolderIcon";
import IconButton from "components/UI/Buttons/IconButton/IconButton";

interface AddItemProps {
	createFolder: () => void;
	uploadFile: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ createFolder, uploadFile }) => {
	return (
		<div className="group/item flex flex-col items-center justify-center gap-2 px-8 py-2">
			<IconButton
				className="h-9 opacity-0 duration-100 group-focus-within/item:opacity-100 group-hover/item:opacity-100 group-hover/item:transition group-hover/item:duration-500"
				variant="contained"
				color="rose"
				onClick={createFolder}
			>
				<CreateFolderIcon />
			</IconButton>

			<IconButton
				className="h-9 opacity-0 duration-200 group-focus-within/item:opacity-100 group-hover/item:opacity-100 group-hover/item:transition group-hover/item:duration-500"
				variant="contained"
				color="rose"
				onClick={uploadFile}
			>
				<AddFileIcon />
			</IconButton>
		</div>
	);
};

export default AddItem;
