import { FC, useState } from "react";
import { FileDataWithSharedWith, filesApi } from "services/filesApi";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

import IconButton from "components/UI/Buttons/IconButton";
import ShareUsersModal from "components/ShareUsersModal";

import FavouriteIcon from "components/SvgIcons/FavouriteIcon";
import ShareIcon from "components/SvgIcons/ShareIcon";

interface SideButtonsProps {
	file: FileDataWithSharedWith;
}

const FileSideButtons: FC<SideButtonsProps> = ({ file }) => {
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

	const [addToFavorite, addToFavoriteStatus] =
		filesApi.useAddToFavouriteMutation();
	const [removeFromFavorite, removeFromFavoriteStatus] =
		filesApi.useRemoveFromFavouriteMutation();

	function toggleFavourite() {
		if (file.isFavourite) {
			removeFromFavorite({
				fileId: file.id,
				token: getCookieValue(cookieKeys.TOKEN),
			});
		} else {
			addToFavorite({
				fileId: file.id,
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
					file.isFavourite || addToFavoriteStatus.isLoading
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
				status={
					addToFavoriteStatus.status === "pending" ||
					removeFromFavoriteStatus.status === "pending"
						? "pending"
						: "uninitialized"
				}
				onClick={toggleFavourite}
			>
				<FavouriteIcon
					filled={file.isFavourite || addToFavoriteStatus.isLoading}
				/>
			</IconButton>

			<IconButton
				className={`scale-75 border-0 text-orange-600 transition-all delay-75 duration-500 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
					file.sharedWith.length > 0
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
				onClick={openModal}
			>
				<ShareIcon filled={file.sharedWith.length > 0} />
			</IconButton>

			<ShareUsersModal
				open={isModalOpened}
				close={closeModal}
				file={file}
			/>
		</div>
	);
};

export default FileSideButtons;
