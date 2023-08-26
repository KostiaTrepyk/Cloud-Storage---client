import { FC, Ref, forwardRef, useState } from "react";
import { Variants, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
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
	addFileToChecked: (id: number) => void;
	removeFilefromChecked: (id: number) => void;
	className?: string;
	file: FileData;
}

const FilesListItem: FC<Props> = forwardRef(
	(
		{ file, className, addFileToChecked, removeFilefromChecked },
		ref: Ref<HTMLLIElement>
	) => {
		const [isChecked, setIsChecked] = useState<boolean>(false);

		const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
		const fileExtesion = getFileExtension(file.filename);

		const [deleteFile, deleteStatus] =
			cloudStorageApi.useDeleteFileMutation();

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
			const newState = !isChecked;

			setIsChecked(() => newState);
			if (newState) addFileToChecked(file.id);
			else removeFilefromChecked(file.id);
		}

		return (
			<motion.li
				ref={ref}
				className={twMerge(
					`relative flex aspect-square h-56 select-none flex-col items-center justify-normal rounded border border-neutral-50 p-1 pb-0 shadow max-[480px]:w-full ${
						isChecked && "text-rose-900"
					}`,
					className
				)}
				initial={["hideSideButtons", "cardInitial"]}
				whileHover="showSideButtons"
				animate="cardAppear"
				exit="cardExit"
				variants={cardAnimations}
				layout="position"
			>
				<label className="mx-2 flex h-44 w-full cursor-pointer items-center justify-center">
					<input
						className="absolute left-2 top-2 z-10 accent-rose-600"
						onChange={CheckedChangeHandler}
						checked={isChecked}
						type="checkbox"
					/>
					{file.mimetype.startsWith("image/") ? (
						/* Lags !!!!!!!!!!! */
						<img
							className="max-h-full min-h-[7rem] min-w-[7rem] max-w-full rounded-sm object-contain transition duration-500 hover:scale-90"
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
