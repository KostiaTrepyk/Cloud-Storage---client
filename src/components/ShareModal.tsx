import { FC, useEffect, useState } from "react";
import { getCookieValue } from "helpers/cookie";
import { usersApi } from "services/usersApi";
import { shareApi } from "services/shareApi";
import {
	FileData,
	FolderData,
	UserData,
	UserDataWithSharedFiles,
} from "services/types";
import { cookieKeys } from "types/cookie";

import Modal from "components/UI/Modal/Modal";
import Image from "components/UI/Image/Image";

import LoadIcon from "components/SvgIcons/LoadIcon";
import Button from "components/UI/Buttons/Button/Button";

interface ShareModalProps {
	open: boolean;
	close: () => void;
	files?: FileData[];
	folders?: FolderData[];
}

const ShareModal: FC<ShareModalProps> = ({
	open,
	close,
	files = [],
	folders = [],
}) => {
	const [users, setUsers] = useState<UserDataWithSharedFiles[]>([]);

	const getAllUsers = usersApi.useGetAllUsersQuery(
		{
			token: getCookieValue(cookieKeys.TOKEN),
			orderBy: "SharedWith",
			orderValue: "DESC",
		},
		{ skip: !open }
	);

	const [share, shareStatus] = shareApi.useShareMutation();
	const [unshare, unshareStatus] = shareApi.useUnshareMutation();

	useEffect(() => {
		setUsers(getAllUsers.data?.users || []);
	}, [getAllUsers.data]);

	async function handleShare(user: UserData) {
		let isShared: boolean = false;

		for (const file of files) {
			if (file.sharedWith.some((u) => u.id === user.id)) {
				isShared = true;
			}
			if (isShared) break;
		}
		for (const folder of folders) {
			if (folder.sharedWith.some((u) => u.id === user.id)) {
				isShared = true;
			}
			if (isShared) break;
		}

		if (isShared) {
			await unshare({
				fileIds: files.map((file) => file.id),
				folderIds: folders.map((folder) => folder.id),
				userIdsToRemove: [user.id],
				token: getCookieValue(cookieKeys.TOKEN),
			});
		} else {
			await share({
				fileIds: files.map((file) => file.id),
				folderIds: folders.map((folder) => folder.id),
				userIdsToShareWith: [user.id],
				token: getCookieValue(cookieKeys.TOKEN),
			});
		}
	}

	return (
		<Modal
			open={open}
			close={close}
		>
			{getAllUsers.data?.users && getAllUsers.data.users.length > 0 && (
				<ul className="flex max-h-96 flex-col gap-1 overflow-y-scroll pr-1">
					{users.map((user) => (
						<li
							className="flex h-10"
							key={user.id}
						>
							<div className="flex w-full items-center gap-2 rounded-l bg-neutral-100 transition hover:bg-neutral-200">
								<Image imgAttrs={{ src: "./fake.jpg" }} />
								<span>{user.fullName}</span>
							</div>

							<Button
								className="w-24 rounded-none rounded-r"
								onClick={() => handleShare(user)}
								color="amber"
								status={
									(shareStatus.originalArgs
										?.userIdsToShareWith[0] === user.id &&
										shareStatus.isLoading) ||
									(unshareStatus.originalArgs
										?.userIdsToRemove[0] === user.id &&
										unshareStatus.isLoading)
										? "pending"
										: "uninitialized"
								}
							>
								{[...files, ...folders].some((item) =>
									item.sharedWith.some(
										(u) => u.id === user.id
									)
								)
									? "Shared"
									: "Share"}
							</Button>
						</li>
					))}
				</ul>
			)}

			{getAllUsers.isFetching && (
				<LoadIcon
					className="m-auto my-3 h-8 md:h-10"
					spin
				/>
			)}
		</Modal>
	);
};

export default ShareModal;
