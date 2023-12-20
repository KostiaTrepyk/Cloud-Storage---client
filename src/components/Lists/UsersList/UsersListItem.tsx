import { forwardRef, memo } from "react";
import { UserDataWithSharedFiles } from "services/types";

import Image from "components/UI/Image";

interface UsersListItemProps {
	user: UserDataWithSharedFiles;
}

const UsersListItem = memo(
	forwardRef<HTMLLIElement, UsersListItemProps>(({ user }, ref) => {
		console.log(user);

		return (
			<li
				className="flex h-10"
				ref={ref}
			>
				<Image imgAttrs={{ src: "./fake.jpg" }} />
				<span>{user.fullName}</span>
			</li>
		);
	})
);

export default UsersListItem;
