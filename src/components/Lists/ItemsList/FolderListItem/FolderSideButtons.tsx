import { FC } from "react";
import { downloadFolder } from "helpers/downloadFolder";
import { foldersApi } from "services/foldersApi";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import DownloadIcon from "components/SvgIcons/DownloadIcon";

interface SideButtonsProps {
	folderId: number;
	storageId: number;
}

const FolderSideButtons: FC<SideButtonsProps> = ({ folderId, storageId }) => {
	const { data } = foldersApi.useGetFolderQuery({ storageId, folderId });

	return (
		<div className="absolute right-1 top-1 flex w-9 flex-col gap-1">
			{data && (
				<IconButton
					className={`scale-75 border-0 text-lime-600 opacity-0 transition-all duration-500 focus-visible:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100`}
					color="light"
					variant="contained"
					onClick={() => {
						downloadFolder({ storageId, folderId });
					}}
				>
					<DownloadIcon />
				</IconButton>
			)}
		</div>
	);
};

export default FolderSideButtons;
