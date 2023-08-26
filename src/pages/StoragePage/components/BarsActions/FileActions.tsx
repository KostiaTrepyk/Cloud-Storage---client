import { FC } from "react";
import { motion } from "framer-motion";
import { cloudStorageApi } from "../../../../services/CloudStorageApi";
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
	checkedFiles: number[];
	clearCheckedFiles: () => void;
}

const FileActions: FC<Props> = ({ files, checkedFiles, clearCheckedFiles }) => {
	const [deleteFiles, __deleteStatus] =
		cloudStorageApi.useDeleteFileMutation();

	const [deleteFilesStatus] = useStatus(__deleteStatus.status);

	function downloadCheckedFiles() {
		const filesToDownload =
			files?.filter((file) => checkedFiles.includes(file.id)) || [];

		filesToDownload.forEach((file) => {
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
			>
				<ShareIcon />
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={3}
				color="red"
				title="Delete"
				onClick={() =>
					deleteFiles({
						ids: checkedFiles.join(","),
						token: getCookieValue(cookieKeys.TOKEN),
					})
				}
				status={deleteFilesStatus}
			>
				<TrashIcon />
			</MIconButton>
		</>
	);
};

export default FileActions;
