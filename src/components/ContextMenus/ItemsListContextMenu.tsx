import { useContextMenuContext } from "contexts/ContextMenuContext";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { foldersApi } from "services/foldersApi";
import { filesApi } from "services/filesApi";

import CreateFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import Button from "components/UI/Buttons/Button/Button";
import AddFileIcon from "components/SvgIcons/AddFileIcon";
import BackIcon from "components/SvgIcons/BackIcon";

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

	function historyBackHandler() {
		historyBack();
		close();
	}

	async function uploadFileHandler() {
		uploadFileHelper({
			uploadFile,
			storageId: currentStoreId,
			folderId: currentFolderId,
		});
		close();
	}

	async function createFolderHandler() {
		await createFolder({
			parentFolderId: currentFolderId,
			storageId: currentStoreId,
			folderName: "New Folder",
		});
		close();
	}

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					className="w-full justify-start"
					color="neutral"
					variant="contained"
					onClick={historyBackHandler}
					disabled={disableBack}
					startIcon={<BackIcon />}
				>
					Back
				</Button>
			</li>

			<li className="h-8">
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={createFolderHandler}
					startIcon={<CreateFolderIcon />}
					status={createFolderResponse.status}
				>
					Create&nbsp;folder
				</Button>
			</li>

			<li className="h-8">
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={uploadFileHandler}
					startIcon={<AddFileIcon />}
				>
					Upload&nbsp;file
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default ItemsListContextMenu;
