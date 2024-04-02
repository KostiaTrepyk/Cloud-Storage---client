import { useState } from "react";
import { useStatus } from "hooks/useStatus";
import { getFileExtension } from "helpers/getFileExtension";
import { downloadFile } from "helpers/downloadFile";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { filesApi } from "services/filesApi";
import { FileData } from "services/types";

import Button from "components/UI/Buttons/Button/Button";
import TrashIcon from "components/SvgIcons/TrashIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import RenameIcon from "components/SvgIcons/RenameIcon";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import RenameForm from "./components/RenameForm";

interface FileContextMenuProps {
	file: FileData;
}

type Mode = "default" | "rename";

const FileContextMenu: React.FC<FileContextMenuProps> = ({ file }) => {
	const [mode, setMode] = useState<Mode>("default");
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
				<Button
					className="w-full justify-start"
					color="neutral"
					variant="contained"
					onClick={openFileHandler}
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
					onClick={downloadFileHandler}
					startIcon={<DownloadIcon />}
					status={downloadingStatus}
					size="small"
				>
					Download
				</Button>
			</li>

			<li>
				{mode === "rename" ? (
					<RenameForm
						name={file.originalname}
						back={() => setMode("default")}
						rename={renameFileHandler}
						status={updateStatus}
					/>
				) : (
					<Button
						className="w-full justify-start hover:bg-yellow-600"
						color="neutral"
						variant="contained"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
						size="small"
						status={updateStatus}
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
					onClick={deleteFileHandler}
					startIcon={<TrashIcon />}
					status={deleteFileStatus}
					size="small"
				>
					Delete
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default FileContextMenu;
