import { useContextMenuContext } from "contexts/ContextMenuContext";
import { storagesApi } from "services/storagesApi";

import CreateFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import Button from "components/UI/Buttons/Button/Button";

interface StorageListContextMenuProps {}

const StorageListContextMenu: React.FC<StorageListContextMenuProps> = () => {
	const { close } = useContextMenuContext();

	const [createStorage, createStorageResponse] =
		storagesApi.useCreateStorageMutation();

	async function createStorageHandler() {
		await createStorage({ name: "New Storage" });
		close();
	}

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start"
					onClick={createStorageHandler}
					startIcon={<CreateFolderIcon />}
					status={createStorageResponse.status}
				>
					Create&nbsp;storage
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default StorageListContextMenu;
