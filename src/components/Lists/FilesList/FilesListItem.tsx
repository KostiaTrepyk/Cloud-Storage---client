import { FC } from "react";
import { Link } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { getFileExtension } from "../../../helpers/getFileExtension";
import { FILEROUTE } from "../../../core/Router/types/routes";
import { FileData } from "../../../types/fileData";

import DownloadIcon from "../../SvgIcons/DownloadIcon";
import ShareIcon from "../../SvgIcons/ShareIcon";
import TrashIcon from "../../SvgIcons/TrashIcon";
import IconButton from "../../UI/Buttons/IconButton";

// Framer Animations
const sideButtonsAnimation: Variants = {
	hidden: {
		visibility: "hidden",
		opacity: 0,
	},
	active: {
		visibility: "visible",
		opacity: 1,
	},
};

interface Props {
	file: FileData;
}

const FilesListItem: FC<Props> = ({ file }) => {
	const fileUrl = "http://localhost:5000/uploads/" + file.filename;
	const fileExtesion = getFileExtension(file.filename);

	function downloadFile() {
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
	}

	return (
		<motion.article
			className="relative aspect-square h-64 overflow-hidden rounded p-1 shadow max-[360px]:w-full"
			initial="hidden"
			whileHover={"active"}
		>
			<div className="flex h-full flex-col items-center justify-center">
				<Link
					to={FILEROUTE.path?.replace(":id", file.filename)!}
					className="mx-2 flex h-52 w-60 items-center justify-center transition duration-500 hover:scale-90"
				>
					{file.mimetype.startsWith("image/") ? (
						<img
							className="max-h-full min-h-[7rem] min-w-[7rem] max-w-full rounded-sm object-contain"
							src={fileUrl}
							alt={fileExtesion || "file"}
						/>
					) : (
						<span className="flex h-52 w-60 items-center justify-center overflow-hidden text-center text-2xl font-bold uppercase">
							{fileExtesion}
						</span>
					)}
				</Link>
				<div className="mt-auto flex h-8 w-full items-center justify-between border-t px-2">
					<span className="line-clamp-1 text-left">
						{file.originalname}
					</span>

					{/* <IconButton className="h-7 p-[0.35rem]">
						<CopyIcon />
					</IconButton> */}
				</div>
			</div>
			<motion.div
				className="absolute right-1 top-1 flex flex-col gap-1"
				variants={sideButtonsAnimation}
			>
				<IconButton
					className="h-7 border-neutral-500 bg-lime-400 p-[.3rem] text-black hover:bg-lime-300"
					title="Download"
					onClick={downloadFile}
				>
					<DownloadIcon />
				</IconButton>

				<IconButton
					className="h-7 border-neutral-500 bg-amber-400 p-[.3rem] text-black hover:bg-amber-300"
					title="Share"
					onClick={(e) => console.log("Share")}
				>
					<ShareIcon />
				</IconButton>
				<IconButton
					className="h-7 border-neutral-500 bg-red-400 p-[.3rem] text-black hover:bg-red-300"
					title="Delete"
					onClick={(e) => console.log("Delete")}
				>
					<TrashIcon />
				</IconButton>
			</motion.div>
		</motion.article>
	);
};

export default FilesListItem;
