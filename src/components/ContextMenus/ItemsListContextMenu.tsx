import { useStatus } from "hooks/useStatus";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { getFile } from "helpers/getFile";
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
	const [createFolderStatus, setCreateFolderStatus] =
		useStatus("uninitialized");
	const [uploadFileStatus, setUploadFileStatus] = useStatus("uninitialized");

	const { close } = useContextMenuContext();

	const [createFolder] = foldersApi.useCreateFolderMutation();
	const [uploadFile] = filesApi.useUploadFileMutation();

	function historyBackHandler() {
		historyBack();
		close();
	}

	async function uploadFileHandler() {
		getFile(async (file) => {
			setUploadFileStatus("pending");

			await uploadFile({
				storageId: currentStoreId,
				folderId: currentFolderId,
				file,
			})
				.unwrap()
				.then(() => {
					setUploadFileStatus("fulfilled");
					close();
				})
				.catch(() => {
					setUploadFileStatus("rejected");
				});
		});
	}

	async function createFolderHandler() {
		setCreateFolderStatus("pending");

		await createFolder({
			parentFolderId: currentFolderId,
			storageId: currentStoreId,
			folderName: "New Folder",
		})
			.then(() => {
				setCreateFolderStatus("fulfilled");
				close();
			})
			.catch(() => setCreateFolderStatus("rejected"));
	}

	return (
		<ContextMenuContainer>
			<li>
				<Button
					className="w-full justify-start"
					color="neutral"
					variant="contained"
					onClick={historyBackHandler}
					disabled={disableBack}
					startIcon={<BackIcon />}
					size="small"
				>
					Back
				</Button>
			</li>

			<li>
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={createFolderHandler}
					startIcon={<CreateFolderIcon />}
					status={createFolderStatus}
					size="small"
				>
					Create&nbsp;folder
				</Button>
			</li>

			<li>
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={uploadFileHandler}
					startIcon={<AddFileIcon />}
					size="small"
					status={uploadFileStatus}
				>
					Upload&nbsp;file
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default ItemsListContextMenu;
