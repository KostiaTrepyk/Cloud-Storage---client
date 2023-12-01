import { FC } from "react";
import { motion } from "framer-motion";
import { filesApi } from "../../../../services/filesApi";
import { useStatus } from "../../../../hooks/useStatus";
import { FileData } from "../../../../types/fileData";
import { getCookieValue } from "../../../../helpers/cookie";
import { cookieKeys } from "../../../../types/cookie";
import { buttonVariants } from "./animations";

import IconButton from "../../../../components/UI/Buttons/IconButton";

import DownloadIcon from "../../../../components/SvgIcons/DownloadIcon";
import ShareIcon from "../../../../components/SvgIcons/ShareIcon";
import TrashIcon from "../../../../components/SvgIcons/TrashIcon";
import CloseIcon from "../../../../components/SvgIcons/CloseIcon";

/* Framer components */
const MIconButton = motion(IconButton);

interface Props {
	files: FileData[] | undefined;
	checkedFiles: FileData[];
	clearCheckedFiles: () => void;

	disabled?: boolean
}

const FileActions: FC<Props> = ({ files, checkedFiles, clearCheckedFiles, disabled }) => {
	const [deleteFiles, __deleteStatus] = filesApi.useDeleteFileMutation(
		{ fixedCacheKey: "1" }
	);

	const [deleteFilesStatus] = useStatus(__deleteStatus.status);

	function downloadCheckedFiles() {
		checkedFiles.forEach((file) => {
			fetch("http://localhost:5000/uploads/" + file.filename, {
				method: "GET",
				headers: {
					"Content-Type": "application/pdf",
				},
			})
				.then((response) => response.blob())
				.then((blob) => {
					const url = window.URL.createObjectURL(new Blob([blob]));

					const link = document.createElement("a");
					link.href = url;
					link.download = file.originalname;

					document.body.appendChild(link);

					link.click();

					link.parentNode?.removeChild(link);
				});
		});

		clearCheckedFiles();
	}

	function deleteCheckedFiles() {
		let checkedFilesIds: number[] = [];

		checkedFiles.forEach((file) => {
			checkedFilesIds.push(file.id);
		});

		deleteFiles({
			ids: checkedFilesIds,
			token: getCookieValue(cookieKeys.TOKEN),
		});
	}

	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Uncheck"
				onClick={clearCheckedFiles}
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

export default FileActions;
