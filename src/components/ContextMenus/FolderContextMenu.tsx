import { useState } from "react";
import { foldersApi } from "services/foldersApi";
import { getCookieValue } from "helpers/cookie";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { Folder } from "services/types";
import { cookieKeys } from "types/cookie";

import Button from "components/UI/Buttons/Button";

import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import IconButton from "components/UI/Buttons/IconButton";
import RenameIcon from "components/SvgIcons/RenameIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import BackIcon from "components/SvgIcons/BackIcon";
import ContextMenuContainer from "./ContextMenuContainer";

interface FolderContextMenuProps {
	item: Folder;
	changeFolderId: (id: number) => void;
}

const FolderContextMenu: React.FC<FolderContextMenuProps> = ({
	item,
	changeFolderId,
}) => {
	const [mode, setMode] = useState<"default" | "rename">("default");
	const [itemName, setItemName] = useState<string>(item.name);
	const { close } = useContextMenuContext();

	const [updateFolder, updateFolderResponse] =
		foldersApi.useUpdateFolderMutation();
	const [deleteFolder, deleteFolderResponse] =
		foldersApi.useDeleteFolderMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						changeFolderId(item.id);
						close();
					}}
				>
					<OpenFolderIcon className="h-5 w-5" />

					<div>Open</div>
				</Button>
			</li>

			<li className="h-8">
				{mode === "rename" ? (
					<form className="flex">
						<IconButton
							className="h-8 w-8 rounded-none rounded-l border border-r-0"
							variant="contained"
							color="neutral"
							type="button"
							onClick={() => {
								setItemName(item.name);
								setMode("default");
							}}
						>
							<BackIcon />
						</IconButton>

						<input
							className="h-8 w-32 rounded-none border-x-0 border-y bg-neutral-500 px-2 text-white hover:bg-neutral-500 focus:bg-neutral-500"
							type="text"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>

						<IconButton
							className="h-8 w-8 rounded-none rounded-r border border-l-0"
							variant="contained"
							color="neutral"
							type="submit"
							onClick={() => {
								if (itemName !== item.name)
									updateFolder({
										folderId: item.id,
										newFolderName: itemName,
										token: getCookieValue(cookieKeys.TOKEN),
									});
								close();
							}}
						>
							<RenameIcon />
						</IconButton>
					</form>
				) : (
					<Button
						color="neutral"
						variant="contained"
						className="flex h-full w-full items-center gap-2"
						onClick={() => setMode("rename")}
					>
						<RenameIcon className="h-5 w-5" />

						<div>Rename</div>
					</Button>
				)}
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						deleteFolder({
							foldersIds: [item.id],
							token: getCookieValue(cookieKeys.TOKEN),
						});
						close();
					}}
				>
					<TrashIcon className="h-5 w-5" />

					<div>Delete</div>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default FolderContextMenu;
