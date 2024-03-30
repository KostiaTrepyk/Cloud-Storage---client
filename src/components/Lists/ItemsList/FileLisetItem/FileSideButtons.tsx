import { FC, useState } from "react";
import { getCookieValue } from "helpers/cookie";
import { filesApi } from "services/filesApi";
import { FileData } from "services/types";
import { cookieKeys } from "types/cookie";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import ShareModal from "components/ShareModal";

import FavouriteIcon from "components/SvgIcons/FavouriteIcon";
import ShareIcon from "components/SvgIcons/ShareIcon";

interface SideButtonsProps {
	file: FileData;
}

const FileSideButtons: FC<SideButtonsProps> = ({ file }) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const [updateFile, updateStatus] = filesApi.useUpdateFileMutation();

	async function toggleFavourite() {
		if (file.isFavourite) {
			await updateFile({
				id: file.id,
				isFavourite: false,
				token: getCookieValue(cookieKeys.TOKEN),
			});
		} else {
			await updateFile({
				id: file.id,
				isFavourite: true,
				token: getCookieValue(cookieKeys.TOKEN),
			});
		}
	}

	function openModal() {
		setIsModalOpened(true);
	}

	function closeModal() {
		setIsModalOpened(false);
	}

	return (
		<div className="absolute right-1 top-1 flex w-9 flex-col gap-1">
			<IconButton
				className={`scale-75 border-0 text-rose-600 transition-all duration-500 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
					file.isFavourite || updateStatus.isLoading
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
				color="light"
				variant="contained"
				status={
					updateStatus.status === "pending"
						? "pending"
						: "uninitialized"
				}
				onClick={toggleFavourite}
			>
				<FavouriteIcon
					filled={file.isFavourite || updateStatus.isLoading}
				/>
			</IconButton>

			<IconButton
				className={`scale-75 border-0 text-orange-600 transition-all delay-75 duration-500 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
					file.sharedWith.length > 0
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
				color="light"
				variant="contained"
				onClick={openModal}
			>
				<ShareIcon filled={file.sharedWith.length > 0} />
			</IconButton>

			<ShareModal
				open={isModalOpened}
				close={closeModal}
				items={[file]}
			/>
		</div>
	);
};

export default FileSideButtons;
