import { useStatus } from "hooks/useStatus";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { storagesApi } from "services/storagesApi";

import CreateFolderIcon from "components/SvgIcons/CreateFolderIcon";
import ContextMenuContainer from "./components/ContextMenuContainer";
import Button from "components/UI/Buttons/Button/Button";

interface StorageListContextMenuProps {}

const StorageListContextMenu: React.FC<StorageListContextMenuProps> = () => {
	const [createStorageStatus, setCreateStorageStatus] =
		useStatus("uninitialized");

	const { close } = useContextMenuContext();

	const [createStorage] = storagesApi.useCreateStorageMutation();

	async function createStorageHandler() {
		setCreateStorageStatus("pending");

		await createStorage({ name: "New Storage" })
			.then(() => {
				setCreateStorageStatus("fulfilled");
				close();
			})
			.catch(() => setCreateStorageStatus("rejected"));
	}

	return (
		<ContextMenuContainer>
			<li>
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start hover:bg-lime-600"
					onClick={createStorageHandler}
					startIcon={<CreateFolderIcon />}
					status={createStorageStatus}
					size="small"
				>
					Create&nbsp;storage
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default StorageListContextMenu;
