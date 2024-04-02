import { FC } from "react";
import { motion } from "framer-motion";
import { getFile } from "helpers/getFile";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { filesApi } from "services/filesApi";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import BackIcon from "components/SvgIcons/BackIcon";
import { buttonVariants } from "components/ToolBar/animations";
import TrashIcon from "components/SvgIcons/TrashIcon";
import Tooltip from "components/UI/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import { TRASHROUTE } from "core/Router/routes";
import Button from "components/UI/Buttons/Button/Button";
import UploadIcon from "components/SvgIcons/UploadIcon";
import { useStatus } from "hooks/useStatus";

const MIconButton = motion(IconButton);
const MButton = motion(Button);

interface ToolBarDefaultProps {
	currentStorageId: number;
}

const ToolBarDefault: FC<ToolBarDefaultProps> = ({ currentStorageId }) => {
	const navigate = useNavigate();

	const { currentFolderId, history, historyBack } =
		useFoldersHistoryContext();

	const [uploadFileMutation, uploadFileResponse] =
		filesApi.useUploadFileMutation();
	const [uploadFileStatus] = useStatus(uploadFileResponse.status);

	function uploadFileHandler() {
		getFile(async (file) => {
			await uploadFileMutation({
				file,
				storageId: currentStorageId,
				folderId: currentFolderId,
			});
		});
	}

	return (
		<>
			<Tooltip
				title="Back"
				className="aspect-square h-full"
				position="bottom-start"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={0}
					color="light"
					onClick={historyBack}
					disabled={history.length === 0}
				>
					<BackIcon />
				</MIconButton>
			</Tooltip>

			<Tooltip
				title="Upload file"
				position="bottom-center"
			>
				<MButton
					className="capitalize"
					startIcon={<UploadIcon />}
					color="amber"
					size="large"
					onClick={uploadFileHandler}
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={0}
					disabled={uploadFileResponse.isLoading}
					status={uploadFileStatus}
				>
					Upload
				</MButton>
			</Tooltip>

			<Tooltip
				title="Trash"
				className="aspect-square h-full"
				position="bottom-center"
			>
				<MIconButton
					initial="initial"
					animate="reveal"
					variants={buttonVariants}
					custom={0}
					color="light"
					onClick={() => navigate(TRASHROUTE.path!)}
				>
					<TrashIcon />
				</MIconButton>
			</Tooltip>
		</>
	);
};

export default ToolBarDefault;
