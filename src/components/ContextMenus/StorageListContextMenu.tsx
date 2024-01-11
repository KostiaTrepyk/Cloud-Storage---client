import { useContextMenuContext } from "contexts/ContextMenuContext";
import { getCookieValue } from "helpers/cookie";
import { storagesApi } from "services/storagesApi";
import { cookieKeys } from "types/cookie";

import CraeteFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./ContextMenuContainer";
import Button from "components/UI/Buttons/Button/Button";

interface StorageListContextMenuProps {}

const StorageListContextMenu: React.FC<StorageListContextMenuProps> = () => {
	const { close } = useContextMenuContext();

	const [createStorage, createStorageResponse] =
		storagesApi.useCreateStorageMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						createStorage({
							name: "New Storage",
							token: getCookieValue(cookieKeys.TOKEN),
						});
						close();
					}}
				>
					<CraeteFolderIcon className="h-5 w-5" />

					<span>Create&nbsp;storage</span>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default StorageListContextMenu;
