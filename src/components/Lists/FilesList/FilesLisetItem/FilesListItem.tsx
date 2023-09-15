import { FC, Ref, forwardRef, useLayoutEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import { getFileExtension } from "../../../../helpers/getFileExtension";
import { FileData } from "../../../../types/fileData";

import IconButton from "../../../UI/Buttons/IconButton";

import FavouriteIcon from "../../../SvgIcons/FavouriteIcon";
import ShareIcon from "../../../SvgIcons/ShareIcon";

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

const sideButtonsAnimations: Variants = {
	hideSideButtons: {
		display: "none",
		opacity: 0,
		scale: 0.7,
	},
	showSideButtons: {
		display: "block",
		opacity: 1,
		scale: 1,
	},
};

// Framer Components
const MIconButton = motion(IconButton);

interface Props {
	file: FileData;
	checked?: boolean;
	removeFilefromChecked: (file: FileData) => void;
	addFileToChecked: (file: FileData) => void;
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

		useLayoutEffect(() => {
			if (fileType === "image") {
				setIsIamgeLoading(true);
			}
		}, [fileType]);

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
					{fileType === "image" && file.size < 50_000 ? (
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
					<span className="line-clamp-1 grow text-center">
						{file.originalname}
					</span>
				</div>

				<div className="absolute right-1 top-1 flex w-9 flex-col gap-1">
					{/* FIX */}
					<MIconButton
						className="border-0 text-rose-600"
						variants={sideButtonsAnimations}
						animate={file.isFavourite && "showSideButtons"}
					>
						<FavouriteIcon filled={file.isFavourite} />
					</MIconButton>
					<MIconButton
						className="border-0 text-orange-600"
						variants={sideButtonsAnimations}
						/* animate={
							file.sharedWith.length > 0 && "showSideButtons"
						} */
					>
						<ShareIcon />
					</MIconButton>
				</div>
			</motion.li>
		);
	}
);

export default FilesListItem;
