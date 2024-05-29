import { useState } from "react";
import { useStatus } from "hooks/useStatus";
import { getFileExtension } from "helpers/getFileExtension";
import { downloadFile } from "helpers/downloadFile";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { filesApi } from "services/filesApi";
import { FileData } from "services/types";

import TrashIcon from "components/SvgIcons/TrashIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import RenameIcon from "components/SvgIcons/RenameIcon";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import RenameForm from "./components/RenameForm";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";
import ContextMenuButton from "./components/ContextMenuButton";

interface FileContextMenuProps {
	file: FileData;
}

type Mode = "default" | "rename";

const FileContextMenu: React.FC<FileContextMenuProps> = ({ file }) => {
	const [mode, setMode] = useState<Mode>("default");
	const [isConfirmDeletingOpened, setConfirmDeletingOpened] = useState(false);

	const [downloadingStatus, setDownloadingStatus] =
		useStatus("uninitialized");
	const [updateStatus, setUpdateStatus] = useStatus("uninitialized");
	const [deleteFileStatus, setDeleteFileStatus] = useStatus("uninitialized");

	const { close } = useContextMenuContext();

	const [updateFile] = filesApi.useUpdateFileMutation();
	const [deleteFile] = filesApi.useDeleteFileMutation();

	function openFileHandler() {
		throw new Error("Not implemented!");
	}

	async function downloadFileHandler() {
		setDownloadingStatus("pending");

		await downloadFile({
			path: "http://localhost:5000/uploads/" + file.filename,
			name: file.originalname,
			extension: getFileExtension(file.filename) ?? "",
		})
			.then(() => {
				setDownloadingStatus("fulfilled");
				close();
			})
			.catch(() => setDownloadingStatus("rejected"));
	}

	async function deleteFileHandler() {
		setDeleteFileStatus("pending");

		await deleteFile({ id: file.id })
			.unwrap()
			.then(() => {
				setDeleteFileStatus("fulfilled");
				close();
			})
			.catch(() => setDeleteFileStatus("rejected"));
	}

	async function renameFileHandler(newName: string) {
		if (newName === file.originalname) {
			close();
			return;
		}

		setUpdateStatus("pending");

		await updateFile({
			id: file.id,
			newOriginalName: newName,
		})
			.unwrap()
			.then(() => {
				setUpdateStatus("fulfilled");
				close();
			})
			.catch(() => setUpdateStatus("rejected"));
	}

	return (
		<ContextMenuContainer>
			<li>
				<ContextMenuButton
					onClick={openFileHandler}
					startIcon={<OpenFolderIcon />}
				>
					Open
				</ContextMenuButton>
			</li>

			<li>
				<ContextMenuButton
					className="hover:bg-lime-600"
					onClick={downloadFileHandler}
					startIcon={<DownloadIcon />}
					status={downloadingStatus}
					disabled={downloadingStatus === "pending"}
				>
					Download
				</ContextMenuButton>
			</li>

			<li>
				{mode === "rename" ? (
					<RenameForm
						name={file.originalname}
						back={() => setMode("default")}
						onSubmit={renameFileHandler}
						status={updateStatus}
					/>
				) : (
					<ContextMenuButton
						className="hover:bg-yellow-600"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
						status={updateStatus}
						disabled={updateStatus === "pending"}
					>
						Rename
					</ContextMenuButton>
				)}
			</li>

			<li>
				<ContextMenuButton
					className="hover:bg-red-600"
					onClick={() => setConfirmDeletingOpened(true)}
					startIcon={<TrashIcon />}
					status={deleteFileStatus}
					disabled={deleteFileStatus === "pending"}
				>
					Delete
				</ContextMenuButton>
			</li>

			<ConfirmModal
				open={isConfirmDeletingOpened}
				onConfirm={deleteFileHandler}
				onClose={() => setConfirmDeletingOpened(false)}
				alertProps={{
					text: "If you delete this file, you will not be able to recover it.",
					type: "danger",
				}}
			/>
		</ContextMenuContainer>
	);
};

export default FileContextMenu;
