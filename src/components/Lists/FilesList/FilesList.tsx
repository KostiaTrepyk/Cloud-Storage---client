import { FC, HTMLAttributes, memo, useEffect, useState } from "react";
import { FileData } from "../../../types/fileData";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

import FilesListItem from "./FilesLisetItem/FilesListItem";

const MFilesListItem = motion(FilesListItem);

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
	onChange?: (checkedFiles: number[]) => void;
	files: FileData[];
}

const FilesList: FC<Props> = memo(({ files, onChange, ...ulAttributes }) => {
	const [checkedFiles, setCheckedFiles] = useState<number[]>([]);

	function addFileToChecked(id: number): void {
		const newChekedFiles = [...checkedFiles, id];
		setCheckedFiles(() => newChekedFiles);
		onChange && onChange(newChekedFiles);
	}

	function removeFilefromChecked(id: number): void {
		const newChekedFiles = checkedFiles.filter((_id) => _id !== id);
		setCheckedFiles(() => newChekedFiles);
		onChange && onChange(newChekedFiles);
	}

	/* Deletes file IDs that have been removed */
	useEffect(() => {
		if (checkedFiles.length) {
			const newCheckedFiles: number[] = [];

			files.forEach((file) => {
				checkedFiles.forEach((id) => {
					if (file.id === id) newCheckedFiles.push(id);
				});
			});

			setCheckedFiles(() => newCheckedFiles);
			onChange && onChange(newCheckedFiles);
		}
		// eslint-disable-next-line
	}, [files]);

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
					/>
				))}
			</AnimatePresence>
		</ul>
	);
});

export default FilesList;
