import { FC } from "react";
import { FileData } from "../../../types/fileData";

import FilesListItem from "./FilesLisetItem/FilesListItem";

interface Props {
	files: FileData[];
}

const FilesList: FC<Props> = ({ files }) => {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{files.map((file) => (
				<FilesListItem
					key={file.id}
					file={file}
				/>
			))}
		</div>
	);
};

export default FilesList;
