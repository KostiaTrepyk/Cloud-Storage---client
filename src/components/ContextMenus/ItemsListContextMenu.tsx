import { useContextMenuContext } from "contexts/ContextMenuContext";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { getCookieValue } from "helpers/cookie";
import { foldersApi } from "services/foldersApi";
import { cookieKeys } from "types/cookie";

import CraeteFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./ContextMenuContainer";
import Button from "components/UI/Buttons/Button";
import AddFileIcon from "components/SvgIcons/AddFileIcon";
import BackIcon from "components/SvgIcons/BackIcon";
import { filesApi } from "services/filesApi";

interface ItemsListContextMenuProps {
	currentFolderId: number;
	currentStoreId: number;
	historyBack: () => void;
	disableBack?: boolean;
}

const ItemsListContextMenu: React.FC<ItemsListContextMenuProps> = ({
	currentFolderId,
	currentStoreId,
	historyBack,
	disableBack = false,
}) => {
	const { close } = useContextMenuContext();

	const [createFolder, createFolderResponse] =
		foldersApi.useCreateFolderMutation();
	const [uploadFile, uploadFileResponse] = filesApi.useUploadFileMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						historyBack();
						close();
					}}
					disabled={disableBack}
				>
					<BackIcon className="h-5 w-5" />

					<span>Back</span>
				</Button>
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						createFolder({
							parentFolderId: currentFolderId,
							storageId: currentStoreId,
							folderName: "New Folder",
							token: getCookieValue(cookieKeys.TOKEN),
						});
						close();
					}}
				>
					<CraeteFolderIcon className="h-5 w-5" />

					<span>Create&nbsp;folder</span>
				</Button>
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						uploadFileHelper({
							uploadFile,
							storageId: currentStoreId,
							folderId: currentFolderId,
						});
						close();
					}}
				>
					<AddFileIcon className="h-5 w-5" />

					<span>Upload&nbsp;file</span>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default ItemsListContextMenu;
