import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import useKeyPress from "hooks/useKeyPress";

import Popup, { type PopupProps } from "../Popup/Popup";

interface MenuProps extends React.PropsWithChildren {
	popupProps: Omit<PopupProps, "children">;
	listArgs?: React.HTMLAttributes<HTMLUListElement>;
}

const Menu: React.FC<MenuProps> = (props) => {
	const { children, listArgs, popupProps } = props;

	const isEscapePressed = useKeyPress("Escape");

	useEffect(() => {
		if (isEscapePressed && popupProps.open) {
			popupProps.onClose();
		}
	}, [isEscapePressed, popupProps]);

	return (
		<Popup {...popupProps}>
			<ul
				{...listArgs}
				className={twMerge(
					"flex flex-col gap-1 rounded bg-neutral-500 p-2",
					listArgs?.className
				)}
			>
				{children}
			</ul>
		</Popup>
	);
};

export default Menu;
