import { FC } from "react";
import { Link } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { cloudStorageApi } from "../../../../services/CloudStorageApi";
import { getFileExtension } from "../../../../helpers/getFileExtension";
import { getCookieValue } from "../../../../helpers/cookie";
import { FILEROUTE } from "../../../../core/Router/types/routes";
import { FileData } from "../../../../types/fileData";

import IconButton from "../../../UI/Buttons/IconButton";
import CopyIcon from "../../../SvgIcons/CopyIcon";
import SideButtons from "./components/SideButtons";

// Framer Animations
const cardAnimation: Variants = {
	hidden: {
		visibility: "hidden",
		opacity: 0,
		scale: 0.7,
	},
	visible: {
		visibility: "visible",
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5 },
	},
};

const sideButtonsAnimation: Variants = {
	hidden: {
		visibility: "hidden",
		opacity: 0,
	},
	active: {
		opacity: 1,
		visibility: "visible",
		transition: { duration: 0.5, ease: [0.1, 0.3, 0.6, 1] },
	},
};

// Framer Components
const MSideButtons = motion(SideButtons);

interface Props {
	file: FileData;
}

const FilesListItem: FC<Props> = ({ file }) => {
	const fileUrl = "http://localhost:5000/uploads/" + file.filename;
	const fileExtesion = getFileExtension(file.filename);

	const [deleteFile, deleteStatus] = cloudStorageApi.useDeleteFileMutation();

	const downloadFileHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
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
	};

	const deleteFileHandler = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		deleteFile({
			ids: String(file.id),
			token: getCookieValue("token"),
		});
	};

	const copyFileName = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		navigator.clipboard.writeText(file.originalname);
	};

	return (
		<motion.article
			className="relative flex aspect-square h-56 flex-col items-center justify-normal rounded p-1 pb-0 shadow max-[360px]:w-full"
			initial="hidden"
			whileHover="active"
			whileInView="visible"
			variants={cardAnimation}
			layout="position"
		>
			<Link
				to={FILEROUTE.path?.replace(":filename", file.filename)!}
				className="mx-2 flex h-44 w-full items-center justify-center transition duration-500 hover:scale-90"
			>
				{file.mimetype.startsWith("image/") ? (
					/* Lags */
					<img
						className="max-h-full min-h-[7rem] min-w-[7rem] max-w-full rounded-sm object-contain"
						src={fileUrl}
						alt={fileExtesion || "file"}
						loading="lazy"
						decoding="async"
					/>
				) : (
					<span className="max-w-[12rem] overflow-hidden text-2xl font-bold uppercase">
						{fileExtesion}
					</span>
				)}
			</Link>

			<div className="mt-auto flex h-9 w-full items-center justify-between border-t p-2">
				<span className="line-clamp-1 grow">{file.originalname}</span>

				<motion.div variants={sideButtonsAnimation}>
					<IconButton
						className="h-7 p-[0.35rem]"
						onClick={copyFileName}
					>
						<CopyIcon />
					</IconButton>
				</motion.div>
			</div>

			<MSideButtons
				variants={sideButtonsAnimation}
				deleteFileHandler={deleteFileHandler}
				downloadFileHandler={downloadFileHandler}
			/>

			{deleteStatus.isLoading && (
				<div className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center text-2xl font-bold text-red-600 backdrop-blur-sm">
					Wait
				</div>
			)}

			{deleteStatus.isSuccess && (
				<div className="absolute left-0 top-0 flex aspect-square h-full items-center justify-center text-2xl font-bold text-red-600 backdrop-blur-sm">
					Deleted
				</div>
			)}
		</motion.article>
	);
};

export default FilesListItem;
