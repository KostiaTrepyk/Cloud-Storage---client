import AddFileIcon from "components/SvgIcons/AddFileIcon";
import CraeteFolderIcon from "components/SvgIcons/CreateFolderIcon";
import IconButton from "components/UI/Buttons/IconButton";
import { getCookieValue } from "helpers/cookie";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { UploadFileBody } from "services/filesApi";
import { createFolderBody } from "services/foldersApi";
import { cookieKeys } from "types/cookie";

interface AddItemProps {
	createFolder: (data: createFolderBody) => void;
	uploadFile: (data: UploadFileBody) => void;
	folderId: number;
}

const AddItem: React.FC<AddItemProps> = ({
	createFolder,
	uploadFile,
	folderId,
}) => {
	return (
		<div className="group/item flex flex-col items-center justify-center gap-2 px-8 py-2">
			<IconButton
				className="h-9 opacity-0 duration-100 group-focus-within/item:opacity-100 group-hover/item:opacity-100 group-hover/item:transition group-hover/item:duration-500"
				variant="contained"
				color="rose"
				onClick={() => {
					createFolder({
						parrentFolderId: folderId,
						folderName: "New Folder",
						token: getCookieValue(cookieKeys.TOKEN),
					});
				}}
			>
				<CraeteFolderIcon />
			</IconButton>

			<IconButton
				className="h-9 opacity-0 duration-200 group-focus-within/item:opacity-100 group-hover/item:opacity-100 group-hover/item:transition group-hover/item:duration-500"
				variant="contained"
				color="rose"
				onClick={() => {
					uploadFileHelper({
						uploadFile,
						currentFolderId: folderId,
					});
				}}
			>
				<AddFileIcon />
			</IconButton>
		</div>
	);
};

export default AddItem;
