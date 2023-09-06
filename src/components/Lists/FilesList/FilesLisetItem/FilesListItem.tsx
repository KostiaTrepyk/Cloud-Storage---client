import { FC, Ref, forwardRef, useLayoutEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { cloudStorageApi } from "../../../../services/CloudStorageApi";
import { getFileExtension } from "../../../../helpers/getFileExtension";
import { getCookieValue } from "../../../../helpers/cookie";
import { FileData } from "../../../../types/fileData";
import { cookieKeys } from "../../../../types/cookie";

import IconButton from "../../../UI/Buttons/IconButton";
import SideButtons from "./components/SideButtons";

import CopyIcon from "../../../SvgIcons/CopyIcon";

// Framer Animations
const cardAnimations: Variants = {
	cardInitial: {
		opacity: 0,
	},
	cardAppear: {
		opacity: 1,
	},
	cardExit: {
		opacity: 0,
	},
};

const sideButtonsAnimation: Variants = {
	hideSideButtons: {
		visibility: "hidden",
		opacity: 0,
	},
	showSideButtons: {
		opacity: 1,
		visibility: "visible",
		transition: { duration: 0.5, ease: [0.1, 0.3, 0.6, 1] },
	},
};

// Framer Components
const MSideButtons = motion(SideButtons);

interface Props {
	file: FileData;
	checked?: boolean;
	removeFilefromChecked: (id: FileData) => void;
	addFileToChecked: (id: FileData) => void;
	showCheckIndicator?: boolean;
}

const FilesListItem: FC<Props> = forwardRef(
	(
		{
			file,
			addFileToChecked,
			removeFilefromChecked,
			checked = false,
			showCheckIndicator = false,
		},
		ref: Ref<HTMLLIElement>
	) => {
		const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
		const fileExtesion = getFileExtension(file.filename);
		const fileType = file.mimetype.split("/")[0];

		const [isImageLoading, setIsIamgeLoading] = useState<boolean>(false);

		const [deleteFile, deleteStatus] =
			cloudStorageApi.useDeleteFileMutation();

		useLayoutEffect(() => {
			if (fileType === "image") {
				setIsIamgeLoading(true);
			}
		}, [fileType]);

		function downloadFileHandler(
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) {
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

		function deleteFileHandler(
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) {
			deleteFile({
				ids: String(file.id),
				token: getCookieValue(cookieKeys.TOKEN),
			});
		}

		function copyFileName(
			e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) {
			navigator.clipboard.writeText(file.originalname);
		}

		function CheckedChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
			if (!checked) addFileToChecked(file);
			else removeFilefromChecked(file);
		}

		return (
			<motion.li
				ref={ref}
				className={`relative flex aspect-square h-56 select-none flex-col items-center justify-normal rounded border border-neutral-50 p-1 pb-0 shadow max-[480px]:w-full ${
					checked && "text-rose-900"
				}`}
				initial={["hideSideButtons", "cardInitial"]}
				whileHover="showSideButtons"
				animate="cardAppear"
				exit="cardExit"
				variants={cardAnimations}
				layout="position"
			>
				<label className="mx-2 flex h-44 w-full cursor-pointer items-center justify-center">
					<input
						className={`absolute left-2 top-2 z-10 accent-rose-600 transition duration-[500ms] hover:opacity-100 focus-visible:opacity-100
						 ${!showCheckIndicator && "opacity-0"}`}
						onChange={CheckedChangeHandler}
						checked={checked}
						type="checkbox"
					/>
					{fileType === "image" ? (
						/* Lags !!!!!!!!!!! */

						<img
							className={`max-h-full min-h-[7rem] min-w-[7rem] max-w-full rounded-sm object-contain transition duration-500 hover:scale-90 ${
								isImageLoading &&
								"m-1 h-full w-full animate-pulse rounded-md bg-neutral-100"
							}`}
							src={fileUrl}
							alt={fileExtesion || "file"}
							onLoad={() => setIsIamgeLoading(false)}
							loading="lazy"
							decoding="async"
						/>
					) : (
						<span className="max-w-[12rem] overflow-hidden text-2xl font-bold uppercase">
							{fileExtesion}
						</span>
					)}
				</label>

				<div className="mt-auto flex h-9 w-full select-text items-center justify-between border-t px-2 py-1">
					<span className="line-clamp-1 grow">
						{file.originalname}
					</span>

					<motion.div
						className="aspect-square h-full"
						variants={sideButtonsAnimation}
					>
						<IconButton onClick={copyFileName}>
							<CopyIcon />
						</IconButton>
					</motion.div>
				</div>

				<MSideButtons
					variants={sideButtonsAnimation}
					deleteFileHandler={deleteFileHandler}
					downloadFileHandler={downloadFileHandler}
				/>

				{/* Status */}
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
			</motion.li>
		);
	}
);

export default FilesListItem;
