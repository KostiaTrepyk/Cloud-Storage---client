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
import Tooltip from "components/UI/Tooltip/Tooltip";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";

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
	const [isConfirmDeletingOpened, setConfirmDeletingOpened] = useState(false);

	const [downloadStatus, setDownloadStatus] = useStatus("uninitialized");
	const [deleteFilesStatus, setDeleteFilesStatus] =
		useStatus("uninitialized");

	const [deleteFolder] = foldersApi.useDeleteFolderMutation();
	const [deleteFile] = filesApi.useSoftDeleteFileMutation();

	async function downloadCheckedItems() {
		setDownloadStatus("pending");

		await Promise.all(
			checkedItems.map(async (item) => {
				if (isFile(item)) {
					await fetch(
						"http://localhost:5000/uploads/" + item.filename,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/pdf",
							},
						}
					)
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
					await downloadFolder({
						storageId: currentStorageId,
						folderId: item.id,
					});
				}
			})
		)
			.then(() => {
				setDownloadStatus("fulfilled");
				clearCheckedItems();
			})
			.catch(() => {
				setDownloadStatus("rejected");
			});
	}

	async function deleteCheckedItems() {
		setDeleteFilesStatus("pending");

		const folderIds: number[] = [];
		let fileIds: number[] = [];

		checkedItems.forEach((item) => {
			if (isFile(item)) fileIds.push(item.id);
			else folderIds.push(item.id);
		});

		await Promise.all([
			...fileIds.map(async (id) => {
				await deleteFile({ id });
			}),
			await deleteFolder({ foldersIds: folderIds }),
		])
			.then(() => {
				setDeleteFilesStatus("fulfilled");
				clearCheckedItems();
			})
			.catch(() => setDeleteFilesStatus("rejected"));
	}

	function openShareModal() {
		setShareModalOpened(true);
	}

	function closeShareModal() {
		setShareModalOpened(false);
	}

	return (
		<>
			<Tooltip
				title="Uncheck all items"
				className="aspect-square h-full"
				position="bottom-start"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={0}
					onClick={clearCheckedItems}
					disabled={disabled}
				>
					<CloseIcon />
				</MIconButton>
			</Tooltip>

			<Tooltip
				title="Download"
				className="aspect-square h-full"
				position="bottom-center"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={1}
					color="lime"
					onClick={downloadCheckedItems}
					disabled={disabled}
					status={downloadStatus}
				>
					<DownloadIcon />
				</MIconButton>
			</Tooltip>

			<Tooltip
				title="Share"
				className="aspect-square h-full"
				position="bottom-center"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={2}
					color="amber"
					onClick={openShareModal}
					disabled={disabled}
				>
					<ShareIcon filled />
				</MIconButton>
			</Tooltip>

			<Tooltip
				title="Delete"
				className="aspect-square h-full"
				position="bottom-center"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={3}
					color="red"
					onClick={() => setConfirmDeletingOpened(true)}
					status={deleteFilesStatus}
					disabled={disabled}
				>
					<TrashIcon />
				</MIconButton>
			</Tooltip>

			<ConfirmModal
				open={isConfirmDeletingOpened}
				onConfirm={deleteCheckedItems}
				onClose={() => setConfirmDeletingOpened(false)}
				alertProps={{
					text: "Once deleted, you will not be able to recover them.",
					type: "danger",
				}}
			/>

			<ShareModal
				open={isShareModalOpened}
				close={closeShareModal}
				items={checkedItems}
			/>
		</>
	);
};

export default ToolBarAction;
