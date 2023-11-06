import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { FileDataWithSharedWith } from "../../../types/fileData";

import FileListItem from "./FileLisetItem/FileListItem";

interface Props extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
	files: FileDataWithSharedWith[];
	checkedFiles?: FileDataWithSharedWith[];
	onChange?: (checkedFiles: FileDataWithSharedWith[]) => void;
}

const FileList = forwardRef<HTMLUListElement, Props>(
	({ files, onChange, checkedFiles = [], ...ulAttributes }, ref) => {
		function addFileToChecked(file: FileDataWithSharedWith): void {
			const newChekedFiles = [...checkedFiles, file];
			onChange && onChange(newChekedFiles);
		}

		function removeFilefromChecked(file: FileDataWithSharedWith): void {
			const newChekedFiles = checkedFiles.filter(
				(_file) => _file !== file
			);
			onChange && onChange(newChekedFiles);
		}

		return (
			<ul
				{...ulAttributes}
				ref={ref}
				className={twMerge(
					"flex flex-wrap justify-center gap-4",
					ulAttributes.className
				)}
				role="group"
			>
				{!files.length && (
					<span className="py-2 text-2xl font-bold text-rose-600 sm:py-4">
						Empty
					</span>
				)}

				{files.map((file) => (
					<FileListItem
						key={file.id}
						file={file}
						addFileToChecked={addFileToChecked}
						removeFilefromChecked={removeFilefromChecked}
						checked={checkedFiles.includes(file)}
						showCheckIndicator={Boolean(checkedFiles.length)}
					/>
				))}
			</ul>
		);
	}
);
export default FileList;
