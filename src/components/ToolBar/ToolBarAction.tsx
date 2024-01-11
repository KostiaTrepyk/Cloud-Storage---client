import { FC } from "react";
import { motion } from "framer-motion";
import { useStatus } from "hooks/useStatus";
import { getCookieValue } from "helpers/cookie";
import { getFileExtension } from "helpers/getFileExtension";
import { cookieKeys } from "types/cookie";
import { filesApi } from "services/filesApi";
import { FileData, FolderData } from "services/types";

import { buttonVariants } from "components/ToolBar/animations";
import CloseIcon from "components/SvgIcons/CloseIcon";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import ShareIcon from "components/SvgIcons/ShareIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import IconButton from "components/UI/Buttons/IconButton/IconButton";
import { downloadFolder } from "helpers/downloadFolder";

/* Framer components */
const MIconButton = motion(IconButton);

interface ToolBarActionProps {
	currentStorageId: number;
	checkedItems: (FileData | FolderData)[];
	clearCheckedItems: () => void;
	disabled?: boolean;
}

function isFile(item: FileData | FolderData): item is FileData {
	if ((item as FileData).filename === undefined) return false;

	return true;
}

const ToolBarAction: FC<ToolBarActionProps> = ({
	currentStorageId,
	checkedItems,
	clearCheckedItems,
	disabled,
}) => {
	const [deleteFiles, __deleteStatus] = filesApi.useSoftDeleteFileMutation({
		fixedCacheKey: "1",
	});

	const [deleteFilesStatus] = useStatus(__deleteStatus.status);

	function downloadCheckedFiles() {
		checkedItems.forEach((item) => {
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
		});

		clearCheckedItems();
	}

	function deleteCheckedFiles() {
		let checkedFilesIds: number[] = [];

		checkedItems.forEach((file) => {
			checkedFilesIds.push(file.id);
		});

		deleteFiles({
			ids: checkedFilesIds,
			token: getCookieValue(cookieKeys.TOKEN),
		});

		clearCheckedItems();
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
		</>
	);
};

export default ToolBarAction;
