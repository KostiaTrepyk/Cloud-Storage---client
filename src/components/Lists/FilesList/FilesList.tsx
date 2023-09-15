import { FC, HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { FileData } from "../../../types/fileData";

import FilesListItem from "./FilesLisetItem/FilesListItem";

const MFilesListItem = motion(FilesListItem);

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
	files: FileData[];
	checkedFiles?: FileData[];
	onChange?: (checkedFiles: FileData[]) => void;
}

const FilesList: FC<Props> = memo(
	({ files, onChange, checkedFiles = [], ...ulAttributes }) => {
		function addFileToChecked(file: FileData): void {
			const newChekedFiles = [...checkedFiles, file];
			onChange && onChange(newChekedFiles);
		}

		function removeFilefromChecked(file: FileData): void {
			const newChekedFiles = checkedFiles.filter(
				(_file) => _file !== file
			);
			onChange && onChange(newChekedFiles);
		}

		return (
			<ul
				{...ulAttributes}
				className={twMerge(
					"flex flex-wrap justify-center gap-4",
					ulAttributes.className
				)}
			>
				<AnimatePresence>
					{!files.length && (
						<span className="py-2 text-2xl font-bold text-rose-600 sm:py-4">
							Empty
						</span>
					)}

					{files.map((file) => (
						<MFilesListItem
							key={file.id}
							file={file}
							addFileToChecked={addFileToChecked}
							removeFilefromChecked={removeFilefromChecked}
							checked={checkedFiles.includes(file)}
							showCheckIndicator={Boolean(checkedFiles.length)}
						/>
					))}
				</AnimatePresence>
			</ul>
		);
	}
);

export default FilesList;
