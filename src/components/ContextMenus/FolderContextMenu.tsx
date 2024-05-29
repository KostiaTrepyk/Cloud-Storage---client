import { useState } from "react";
import { useStatus } from "hooks/useStatus";
import { foldersApi } from "services/foldersApi";
import { downloadFolder } from "helpers/downloadFolder";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { FolderData } from "services/types";

import Button from "components/UI/Buttons/Button/Button";

import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import RenameIcon from "components/SvgIcons/RenameIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import RenameForm from "./components/RenameForm";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";

interface FolderContextMenuProps {
	currentStorageId: number;
	item: FolderData;
	changeFolderId: (id: number) => void;
}

type Mode = "default" | "rename";

const FolderContextMenu: React.FC<FolderContextMenuProps> = ({
	currentStorageId,
	item,
	changeFolderId,
}) => {
	const [mode, setMode] = useState<Mode>("default");
	const [isConfirmDeletingOpened, setConfirmDeletingOpened] = useState(false);

	const [downloadingStatus, setDownloadingStatus] =
		useStatus("uninitialized");
	const [updateFolderStatus, setUpdateFolderStatus] =
		useStatus("uninitialized");
	const [deleteFolderStatus, setDeleteFolderStatus] =
		useStatus("uninitialized");

	const { close } = useContextMenuContext();

	const [updateFolder] = foldersApi.useUpdateFolderMutation();
	const [deleteFolder] = foldersApi.useDeleteFolderMutation();

	function openFolderHandler() {
		changeFolderId(item.id);
		close();
	}

	async function downloadFolderHandler() {
		setDownloadingStatus("pending");

		await downloadFolder({
			storageId: currentStorageId,
			folderId: item.id,
		})
			.then(() => {
				setDownloadingStatus("fulfilled");
				close();
			})
			.catch(() => setDownloadingStatus("rejected"));
	}

	async function renameFodlerHandler(id: number, newName: string) {
		if (newName === item.name) {
			close();
			return;
		}

		setUpdateFolderStatus("pending");

		await updateFolder({
			folderId: id,
			newFolderName: newName,
		})
			.then(() => {
				setUpdateFolderStatus("fulfilled");
				close();
			})
			.catch(() => setUpdateFolderStatus("rejected"));
	}

	async function deleteFolderHandler(id: number) {
		setDeleteFolderStatus("pending");

		await deleteFolder({ foldersIds: [id] })
			.then(() => {
				setDeleteFolderStatus("fulfilled");
				close();
			})
			.catch(() => setDeleteFolderStatus("rejected"));
	}

	return (
		<ContextMenuContainer>
			<li>
				<Button
					className="w-full justify-start"
					color="neutral"
					variant="contained"
					onClick={openFolderHandler}
					startIcon={<OpenFolderIcon />}
					size="small"
				>
					Open
				</Button>
			</li>

			<li>
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={downloadFolderHandler}
					startIcon={<DownloadIcon />}
					status={downloadingStatus}
					size="small"
					disabled={downloadingStatus === "pending"}
				>
					Download
				</Button>
			</li>

			<li>
				{mode === "rename" ? (
					<RenameForm
						name={item.name}
						back={() => setMode("default")}
						onSubmit={(newName) =>
							renameFodlerHandler(item.id, newName)
						}
						status={updateFolderStatus}
					/>
				) : (
					<Button
						className="w-full justify-start hover:bg-yellow-600"
						color="neutral"
						variant="contained"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
						size="small"
						status={updateFolderStatus}
						disabled={updateFolderStatus === "pending"}
					>
						Rename
					</Button>
				)}
			</li>

			<li>
				<Button
					className="w-full justify-start hover:bg-red-600"
					color="neutral"
					variant="contained"
					onClick={() => setConfirmDeletingOpened(true)}
					startIcon={<TrashIcon />}
					status={deleteFolderStatus}
					size="small"
					disabled={deleteFolderStatus === "pending"}
				>
					Delete
				</Button>
			</li>

			<ConfirmModal
				open={isConfirmDeletingOpened}
				onConfirm={() => deleteFolderHandler(item.id)}
				onClose={() => setConfirmDeletingOpened(false)}
				alertProps={{
					text: "If you delete this folder, you will not be able to recover it.",
					type: "danger",
				}}
			/>
		</ContextMenuContainer>
	);
};

export default FolderContextMenu;
