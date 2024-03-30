import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { getFileExtension } from "helpers/getFileExtension";
import { FileData } from "services/types";

import ItemContainer from "components/Lists/ItemsList/ItemContainer";
import Image from "components/UI/Image/Image";
import FileSideButtons from "./FileSideButtons";

interface FileListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	file: FileData;
	checked?: boolean;
	removeFilefromChecked: (file: FileData) => void;
	addFileToChecked: (file: FileData) => void;
	showCheckIndicator?: boolean;
}

const FileListItem = memo(
	forwardRef<HTMLLIElement, FileListItemProps>(
		(
			{
				file,
				checked = false,
				addFileToChecked,
				removeFilefromChecked,
				showCheckIndicator = false,
				...liAttrs
			},
			ref
		) => {
			const fileUrl = `http://localhost:5000/uploads/${file.filename}`;
			const fileExtesion = getFileExtension(file.filename);
			const fileType = file.mimetype.split("/")[0];

			function CheckedChangeHandler() {
				if (!checked) addFileToChecked(file);
				else removeFilefromChecked(file);
			}

			return (
				<ItemContainer
					{...liAttrs}
					className={twMerge("group/item", liAttrs.className)}
					checked={checked}
					ref={ref}
				>
					<input
						className={`absolute left-2 top-2 z-10 aspect-square h-4 cursor-pointer accent-rose-600 transition duration-[500ms] hover:opacity-100 focus-visible:opacity-100 group-hover/item:opacity-100
						${showCheckIndicator ? "opacity-1000" : "opacity-0"}`}
						type="checkbox"
						onChange={CheckedChangeHandler}
						checked={checked}
					/>
					<label className="mx-2 flex h-[5.5rem] w-full cursor-pointer items-center justify-center sm:h-[7.5rem] md:h-[8.5rem]">
						{fileType === "image" /* &&
						file.size < 250_000 */ /* 250KB */ ? (
							<Image
								imgAttrs={{
									className:
										"transition duration-500 hover:scale-90",
									src: fileUrl,
									alt: file.originalname,
									draggable: false,
								}}
							/>
						) : (
							<span className="max-w-[12rem] overflow-hidden text-xl font-bold uppercase sm:text-2xl">
								{fileExtesion}
							</span>
						)}
					</label>

					<div className="mt-auto w-full select-text border-t px-2 py-[0.15rem]">
						<span className="line-clamp-1 text-center">
							{file.originalname}
						</span>
					</div>

					<FileSideButtons file={file} />
				</ItemContainer>
			);
		}
	)
);

export default FileListItem;
		