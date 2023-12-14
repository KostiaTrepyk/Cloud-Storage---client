import ContextMenuContainer from "./ContextMenuContainer";
import Button from "components/UI/Buttons/Button";

import MenuIcon from "components/SvgIcons/MenuIcon";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { foldersApi } from "services/foldersApi";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

interface ItemsListContextMenuProps {
	currentFolderId: number;
}

const ItemsListContextMenu: React.FC<ItemsListContextMenuProps> = ({
	currentFolderId,
}) => {
	const { close } = useContextMenuContext();

	const [createFolder, createFolderData] =
		foldersApi.useCreateFolderMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						createFolder({
							parrentFolderId: currentFolderId,
							folderName: "New Folder",
							token: getCookieValue(cookieKeys.TOKEN),
						});
						close();
					}}
				>
					<MenuIcon className="h-5 w-5" />

					<span>Create Folder</span>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default ItemsListContextMenu;
