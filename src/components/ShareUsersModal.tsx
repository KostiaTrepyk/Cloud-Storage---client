import { FC, useEffect, useState } from "react";
import { getCookieValue } from "helpers/cookie";
import { usersApi } from "services/usersApi";
import { filesApi } from "services/filesApi";
import {
	FileDataWithSharedWith,
	UserDataWithSharedFiles,
} from "services/types";
import { cookieKeys } from "types/cookie";

import Modal from "./UI/Modal";
import Image from "./UI/Image";

import LoadIcon from "./SvgIcons/LoadIcon";
import Button from "./UI/Buttons/Button";

interface ShareUsersModalProps {
	open: boolean;
	close: () => void;
	file: FileDataWithSharedWith;
}

const ShareUsersModal: FC<ShareUsersModalProps> = ({ open, close, file }) => {
	const [users, setUsers] = useState<UserDataWithSharedFiles[]>([]);

	const getAllUsers = usersApi.useGetAllUsersQuery(
		{
			token: getCookieValue(cookieKeys.TOKEN),
			orderBy: "SharedWith",
			orderValue: "DESC",
		},
		{ skip: !open }
	);

	const [share, shareStatus] = filesApi.useShareMutation();
	const [unshare, unshareStatus] = filesApi.useRemoveFromSharedMutation();

	useEffect(() => {
		setUsers(getAllUsers.data?.users || []);
	}, [getAllUsers.data]);

	function handleShare(userId: number) {
		if (
			file.sharedWith.filter(
				(sharedWithUser) => sharedWithUser.id === userId
			).length > 0
		) {
			unshare({
				fileId: file.id,
				userIdsToRemove: [userId],
				token: getCookieValue(cookieKeys.TOKEN),
			});
		} else {
			share({
				fileId: file.id,
				shareWith: [userId],
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
								onClick={() => handleShare(user.id)}
								color="amber"
								status={
									(shareStatus.originalArgs?.shareWith[0] ===
										user.id &&
										shareStatus.isLoading) ||
									(unshareStatus.originalArgs
										?.userIdsToRemove[0] === user.id &&
										unshareStatus.isLoading)
										? "pending"
										: "uninitialized"
								}
							>
								{file.sharedWith.filter(
									(sharedWithuser) =>
										user.id === sharedWithuser.id
								).length > 0
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

export default ShareUsersModal;
