import { FC } from "react";
import { getCookieValue } from "helpers/cookie";
import { downloadFolderWithFiles } from "helpers/downloadFolder";
import { foldersApi } from "services/foldersApi";
import { cookieKeys } from "types/cookie";

import IconButton from "components/UI/Buttons/IconButton";
import DownloadIcon from "components/SvgIcons/DownloadIcon";

interface SideButtonsProps {
	folderId: number;
}

const FolderSideButtons: FC<SideButtonsProps> = ({ folderId }) => {
	const { data } = foldersApi.useGetFolderQuery({
		folderId,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	return (
		<div className="absolute right-1 top-1 flex w-9 flex-col gap-1">
			{data && (
				<IconButton
					className={`scale-75 border-0 text-lime-600 opacity-0 transition-all duration-500 focus-visible:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100`}
					color="light"
					variant="contained"
					onClick={() => {
						downloadFolderWithFiles(
							data.currentFolder?.name ?? "Folder",
							data.files
						);
					}}
				>
					<DownloadIcon />
				</IconButton>
			)}
		</div>
	);
};

export default FolderSideButtons;
