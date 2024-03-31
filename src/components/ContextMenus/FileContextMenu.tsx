import { useState } from "react";
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
	const [isDownloading, setDownloading] = useState<boolean>();

	const { close } = useContextMenuContext();

	const [updateFile, updateFileResponse] = filesApi.useUpdateFileMutation();
	const [deleteFile, deleteFileResponse] =
		filesApi.useSoftDeleteFileMutation();

	function openFileHandler() {
		throw new Error("Not implemented!");
	}

	async function downloadFileHandler() {
		setDownloading(true);
		await downloadFile({
			path: "http://localhost:5000/uploads/" + file.filename,
			name: file.originalname,
			extension: getFileExtension(file.filename) ?? "",
		});
		setDownloading(false);
		close();
	}

	async function deleteFileHandler() {
		await deleteFile({ ids: [file.id] });
		close();
	}

	async function renameFileHandler(newName: string) {
		if (newName !== file.originalname)
			await updateFile({
				id: file.id,
				newOriginalName: newName,
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
					onClick={openFileHandler}
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
					onClick={downloadFileHandler}
					startIcon={<DownloadIcon />}
					status={isDownloading ? "pending" : "uninitialized"}
				>
					Download
				</Button>
			</li>

			<li className="h-8">
				{mode === "rename" ? (
					<RenameForm
						name={file.originalname}
						back={() => setMode("default")}
						rename={renameFileHandler}
						status={updateFileResponse.status}
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
					onClick={deleteFileHandler}
					startIcon={<TrashIcon />}
					status={deleteFileResponse.status}
				>
					Delete
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default FileContextMenu;
