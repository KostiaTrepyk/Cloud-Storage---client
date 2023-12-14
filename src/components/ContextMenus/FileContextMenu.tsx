import { useState } from "react";
import { FileDataWithSharedWith, filesApi } from "services/filesApi";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";
import { useContextMenuContext } from "contexts/ContextMenuContext";

import Button from "components/UI/Buttons/Button";
import TrashIcon from "components/SvgIcons/TrashIcon";
import ContextMenuContainer from "./ContextMenuContainer";
import BackIcon from "components/SvgIcons/BackIcon";
import RenameIcon from "components/SvgIcons/RenameIcon";
import IconButton from "components/UI/Buttons/IconButton";

interface FileContextMenuProps {
	item: FileDataWithSharedWith;
}

const FileContextMenu: React.FC<FileContextMenuProps> = ({ item }) => {
	const [mode, setMode] = useState<"default" | "rename">("default");
	const [itemName, setItemName] = useState<string>(item.originalname);

	const { close } = useContextMenuContext();

	const [updateFile, updateFileData] = filesApi.useUpdateFileMutation();
	const [deleteFile] = filesApi.useSoftDeleteFileMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				{mode === "rename" ? (
					<form className="flex">
						<IconButton
							className="h-8 w-8 rounded-none rounded-l border-r-0"
							variant="contained"
							color="neutral"
							type="button"
							onClick={() => {
								setItemName(item.originalname);
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
							className="h-8 w-8 rounded-none rounded-r border-l-0"
							variant="contained"
							color="neutral"
							type="submit"
							onClick={() => {
								if (itemName !== item.originalname)
									updateFile({
										id: item.id,
										newOriginalName: itemName,
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
						deleteFile({
							ids: [item.id],
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

export default FileContextMenu;
