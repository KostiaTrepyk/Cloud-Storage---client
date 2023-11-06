import { forwardRef, memo, useId } from "react";
import { motion } from "framer-motion";
import { getFileExtension } from "../../../../helpers/getFileExtension";
import { FileDataWithSharedWith } from "../../../../types/fileData";

import SideButtons from "./SideButtons";
import Image from "../../../UI/Image";

interface Props {
	file: FileDataWithSharedWith;
	checked?: boolean;
	removeFilefromChecked: (file: FileDataWithSharedWith) => void;
	addFileToChecked: (file: FileDataWithSharedWith) => void;
	showCheckIndicator?: boolean;
}

const FileListItem = memo(
	forwardRef<HTMLLIElement, Props>(
		(
			{
				file,
				addFileToChecked,
				removeFilefromChecked,
				checked = false,
				showCheckIndicator = false,
			},
			ref
		) => {
			const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
			const fileExtesion = getFileExtension(file.filename);
			const fileType = file.mimetype.split("/")[0];

			const checkboxId = useId();

			function CheckedChangeHandler() {
				if (!checked) addFileToChecked(file);
				else removeFilefromChecked(file);
			}

			return (
				<motion.li
					ref={ref}
					className={`group relative flex aspect-square h-32 select-none flex-col items-center justify-normal rounded border border-neutral-50 p-1 pb-0 shadow transition-colors duration-300 sm:h-40 md:h-44 ${
						checked ? "bg-neutral-100 text-rose-900" : ""
					}`}
					initial={{
						opacity: 0,
					}}
					animate={{ opacity: 1 }}
					layout="position"
				>
					<input
						className={`absolute left-2 top-2 z-10 cursor-pointer accent-rose-600 transition duration-[500ms] hover:opacity-100 focus-visible:opacity-100
						 ${!showCheckIndicator && "opacity-0"}`}
						id={checkboxId}
						type="checkbox"
						onChange={CheckedChangeHandler}
						checked={checked}
					/>
					<label
						className="mx-2 flex h-[5.5rem] w-full cursor-pointer items-center justify-center sm:h-[7.5rem] md:h-[8.5rem]"
						htmlFor={checkboxId}
					>
						{fileType === "image" /* &&
						file.size < 250_000 */ /* 250KB */ ? (
							<Image
								imgAttrs={{
									className:
										"transition duration-500 hover:scale-90",
									src: fileUrl,
									alt: file.originalname,
								}}
							/>
						) : (
							<span className="max-w-[12rem] overflow-hidden text-xl font-bold uppercase sm:text-2xl">
								{fileExtesion}
							</span>
						)}
					</label>

					<div className="mt-auto flex w-full select-text items-center justify-between border-t px-2 py-[0.15rem]">
						<span className="line-clamp-1 grow text-center">
							{file.originalname}
						</span>
					</div>

					<SideButtons file={file} />
				</motion.li>
			);
		}
	)
);

export default FileListItem;
