import { useContextMenuContext } from "contexts/ContextMenuContext";
import { getCookieValue } from "helpers/cookie";
import { foldersApi } from "services/foldersApi";
import { cookieKeys } from "types/cookie";

import CraeteFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./ContextMenuContainer";
import Button from "components/UI/Buttons/Button";

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
					<CraeteFolderIcon className="h-5 w-5" />

					<span>Create&nbsp;folder</span>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default ItemsListContextMenu;
