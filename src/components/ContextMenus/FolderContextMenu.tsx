import { useState } from "react";
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
	const [isDownloading, setDownloading] = useState<boolean>(false);

	const { close } = useContextMenuContext();

	const [updateFolder, updateFolderResponse] =
		foldersApi.useUpdateFolderMutation();
	const [deleteFolder, deleteFolderResponse] =
		foldersApi.useDeleteFolderMutation();

	function openFolderHandler() {
		changeFolderId(item.id);
		close();
	}

	async function downloadFolderHandler() {
		setDownloading(true);
		await downloadFolder({
			storageId: currentStorageId,
			folderId: item.id,
		});
		setDownloading(false);
		close();
	}

	async function renameFodlerHandler(id: number, newName: string) {
		if (newName !== item.name)
			await updateFolder({
				folderId: id,
				newFolderName: newName,
			});
		close();
	}

	async function deleteFolderHandler(id: number) {
		await deleteFolder({ foldersIds: [id] });
		close();
	}

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					className="w-full justify-start"
					color="neutral"
					variant="contained"
					onClick={openFolderHandler}
					startIcon={<OpenFolderIcon />}
				>
					Open
				</Button>
			</li>

			<li className="h-8">
				<Button
					className="w-full justify-start hover:bg-lime-600"
					color="neutral"
					variant="contained"
					onClick={downloadFolderHandler}
					startIcon={<DownloadIcon />}
					status={isDownloading ? "pending" : "uninitialized"}
				>
					Download
				</Button>
			</li>

			<li className="h-8">
				{mode === "rename" ? (
					<RenameForm
						name={item.name}
						back={() => setMode("default")}
						rename={(newName) =>
							renameFodlerHandler(item.id, newName)
						}
						status={updateFolderResponse.status}
					/>
				) : (
					<Button
						className="w-full justify-start hover:bg-yellow-600"
						color="neutral"
						variant="contained"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
					>
						Rename
					</Button>
				)}
			</li>

			<li className="h-8">
				<Button
					className="w-full justify-start hover:bg-red-600"
					color="neutral"
					variant="contained"
					onClick={() => deleteFolderHandler(item.id)}
					startIcon={<TrashIcon />}
					status={deleteFolderResponse.status}
				>
					Delete
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default FolderContextMenu;
