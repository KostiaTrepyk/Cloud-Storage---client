import { FC, useEffect, useState } from "react";
import { usersApi } from "services/usersApi";
import { shareApi } from "services/shareApi";
import {
	FileData,
	FolderData,
	UserData,
	UserDataWithSharedFiles,
} from "services/types";

import Modal from "components/UI/Modal/Modal";
import Image from "components/UI/Image/Image";

import LoadIcon from "components/SvgIcons/LoadIcon";
import Button from "components/UI/Buttons/Button/Button";
import { isFile } from "helpers/isFile";

interface ShareModalProps {
	open: boolean;
	close: () => void;
	items: (FileData | FolderData)[];
}

const ShareModal: FC<ShareModalProps> = ({ open, close, items }) => {
	const [users, setUsers] = useState<UserDataWithSharedFiles[]>([]);

	const getAllUsers = usersApi.useGetAllUsersQuery(
		{
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
		const fileIds: number[] = [];
		const folderIds: number[] = [];

		for (const item of items) {
			if (item.sharedWith.some((u) => u.id === user.id)) {
				isShared = true;
			}

			if (isFile(item)) fileIds.push(item.id);
			else folderIds.push(item.id);
		}

		if (isShared) {
			await unshare({
				fileIds,
				folderIds,
				userIdsToRemove: [user.id],
			});
		} else {
			await share({
				fileIds,
				folderIds,
				userIdsToShareWith: [user.id],
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
								{items.some((item) =>
									item.sharedWith.some(
										(u) => u.id === user.id
									)
								)
									? "Unshare"
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
