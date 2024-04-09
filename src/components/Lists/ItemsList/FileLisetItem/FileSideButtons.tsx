import { FC, useState } from "react";
import { useStatus } from "hooks/useStatus";
import { filesApi } from "services/filesApi";
import { FileData } from "services/types";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import ShareModal from "components/Modals/ShareModal";

import FavouriteIcon from "components/SvgIcons/FavouriteIcon";
import ShareIcon from "components/SvgIcons/ShareIcon";
import MenuIcon from "components/SvgIcons/MenuIcon";

interface SideButtonsProps {
	file: FileData;
}

const FileSideButtons: FC<SideButtonsProps> = ({ file }) => {
	const [isShareModalOpened, setShareModalOpened] = useState<boolean>(false);

	const [updateFile] = filesApi.useUpdateFileMutation();

	const [toggleFavouriteStatus, setToggleFavouriteStatus] = useStatus(
		"uninitialized",
		1_500
	);

	async function toggleFavourite() {
		setToggleFavouriteStatus("pending");

		await updateFile({
			id: file.id,
			isFavourite: !file.isFavourite,
		})
			.unwrap()
			.then(() => setToggleFavouriteStatus("fulfilled"))
			.catch(() => setToggleFavouriteStatus("rejected"));
	}

	function openShareModal() {
		setShareModalOpened(true);
	}

	function closeShareModal() {
		setShareModalOpened(false);
	}

	const showFavouriteBtn =
		file.isFavourite ||
		toggleFavouriteStatus === "pending" ||
		toggleFavouriteStatus === "fulfilled";

	const showShareBtn = file.sharedWith.length > 0;

	return (
		<div className="absolute right-1 top-1 flex w-9 flex-col gap-1">
			<IconButton
				className={`scale-75 text-rose-600 transition-all duration-500 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
					showFavouriteBtn
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
				color="light"
				variant="contained"
				status={toggleFavouriteStatus}
				onClick={toggleFavourite}
			>
				<FavouriteIcon filled={file.isFavourite} />
			</IconButton>

			<IconButton
				className={`scale-75 text-orange-600 transition-all delay-75 duration-500 group-hover:visible group-hover:scale-100 group-hover:opacity-100 ${
					showShareBtn ? "visible opacity-100" : "invisible opacity-0"
				}`}
				color="light"
				variant="contained"
				onClick={openShareModal}
			>
				<ShareIcon filled={file.sharedWith.length > 0} />
			</IconButton>

			<ShareModal
				open={isShareModalOpened}
				close={closeShareModal}
				items={[file]}
			/>
		</div>
	);
};

export default FileSideButtons;
