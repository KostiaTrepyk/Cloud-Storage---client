import { FC } from "react";
import { motion } from "framer-motion";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { getCookieValue } from "helpers/cookie";
import { filesApi } from "services/filesApi";
import { cookieKeys } from "types/cookie";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import UploadButton from "components/UploadButton";
import BackIcon from "components/SvgIcons/BackIcon";
import { buttonVariants } from "components/ToolBar/animations";

const MIconButton = motion(IconButton);
const MUploadButton = motion(UploadButton);

interface ToolBarDefaultProps {
	currentStorageId: number;
}

const ToolBarDefault: FC<ToolBarDefaultProps> = ({ currentStorageId }) => {
	const { currentFolderId, history, historyBack } =
		useFoldersHistoryContext();

	const [uploadFile, uploadFileResponse] = filesApi.useUploadFileMutation();

	function uploadFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files || uploadFileResponse.isLoading) return;
		const file = e.target.files[0];

		uploadFile({
			file,
			storageId: currentStorageId,
			folderId: currentFolderId,
			token: getCookieValue(cookieKeys.TOKEN),
		});
	}

	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				color="light"
				title="Back"
				onClick={historyBack}
				disabled={history.length === 0}
			>
				<BackIcon />
			</MIconButton>

			<MUploadButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				disabled={uploadFileResponse.isLoading}
				isLoading={uploadFileResponse.isLoading}
				onUpload={uploadFileHandler}
			/>
		</>
	);
};

export default ToolBarDefault;
