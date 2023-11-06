import { forwardRef, memo } from "react";
import { UserData, UserDataWithSharedFiles } from "../../../types/user";
import Image from "../../UI/Image";

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
