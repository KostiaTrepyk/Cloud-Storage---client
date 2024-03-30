import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useStatus } from "hooks/useStatus";
import { getFileExtension } from "helpers/getFileExtension";
import { downloadFolder } from "helpers/downloadFolder";
import { isFile } from "helpers/isFile";
import { foldersApi } from "services/foldersApi";
import { filesApi } from "services/filesApi";
import { FileData, FolderData } from "services/types";

import { buttonVariants } from "components/ToolBar/animations";
import ShareModal from "components/Modals/ShareModal";
import IconButton from "components/UI/Buttons/IconButton/IconButton";
import CloseIcon from "components/SvgIcons/CloseIcon";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import ShareIcon from "components/SvgIcons/ShareIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";

/* Framer components */
const MIconButton = motion(IconButton);

interface ToolBarActionProps {
	currentStorageId: number;
	checkedItems: (FileData | FolderData)[];
	clearCheckedItems: () => void;
	disabled?: boolean;
}

const ToolBarAction: FC<ToolBarActionProps> = ({
	currentStorageId,
	checkedItems,
	clearCheckedItems,
	disabled,
}) => {
	const [isShareModalOpened, setShareModalOpened] = useState<boolean>(false);

	const [deleteFolders, __deleteFoldersStatus] =
		foldersApi.useDeleteFolderMutation();
	const [deleteFiles, __deleteFilesStatus] =
		filesApi.useSoftDeleteFileMutation();
	const [deleteFilesStatus] = useStatus(__deleteFilesStatus.status);

	function downloadCheckedFiles() {
		for (const item of checkedItems) {
			if (isFile(item)) {
				fetch("http://localhost:5000/uploads/" + item.filename, {
					method: "GET",
					headers: {
						"Content-Type": "application/pdf",
					},
				})
					.then((response) => response.blob())
					.then((blob) => {
						const url = window.URL.createObjectURL(
							new Blob([blob])
						);

						const link = document.createElement("a");
						link.href = url;
						link.download =
							item.originalname +
							"." +
							getFileExtension(item.filename);

						document.body.appendChild(link);

						link.click();

						link.parentNode?.removeChild(link);
					});
			} else {
				downloadFolder({
					storageId: currentStorageId,
					folderId: item.id,
				});
			}
		}

		clearCheckedItems();
	}

	function deleteCheckedFiles() {
		const folderIds: number[] = [];
		let fileIds: number[] = [];

		checkedItems.forEach((item) => {
			if (isFile(item)) fileIds.push(item.id);
			else folderIds.push(item.id);
		});

		deleteFiles({ ids: fileIds });
		deleteFolders({ foldersIds: folderIds });

		clearCheckedItems();
	}

	function openShareModal() {
		setShareModalOpened(true);
	}

	function closeShareModal() {
		setShareModalOpened(false);
	}

	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Uncheck"
				onClick={clearCheckedItems}
				disabled={disabled}
			>
				<CloseIcon />
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={1}
				color="lime"
				title="Download"
				onClick={downloadCheckedFiles}
				disabled={disabled}
			>
				<DownloadIcon />
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={2}
				color="amber"
				title="Share"
				onClick={openShareModal}
				disabled={disabled}
			>
				<ShareIcon filled />
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={3}
				color="red"
				title="Delete"
				onClick={deleteCheckedFiles}
				status={deleteFilesStatus}
				disabled={disabled}
			>
				<TrashIcon />
			</MIconButton>

			<ShareModal
				open={isShareModalOpened}
				close={closeShareModal}
				items={checkedItems}
			/>
		</>
	);
};

export default ToolBarAction;
