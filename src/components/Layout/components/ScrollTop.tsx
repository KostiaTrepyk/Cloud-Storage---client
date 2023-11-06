import { FC, useEffect, useState } from "react";
import ArrowRightIcon from "../../SvgIcons/ArrowRightIcon";
import IconButton from "../../UI/Buttons/IconButton";

interface ScrollTopProps {
	size?: number;
	bottom?: number;
}

const ScrollTop: FC<ScrollTopProps> = ({ size = 12, bottom = 12 }) => {
	const [visible, setVisible] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener("scrollend", scrollEndHandler);

		return () => {
			window.removeEventListener("scrollend", scrollEndHandler);
		};
	}, []);

	function scrollEndHandler() {
		if (window.scrollY > 500) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}

	function ClickHandler() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	if (!visible) return null;

	return (
		<IconButton
			className="fixed right-2 z-50 aspect-square"
			style={{ height: size * 4, bottom: bottom * 4 }}
			onClick={ClickHandler}
		>
			<ArrowRightIcon className="-rotate-90" />
		</IconButton>
	);
};

export default ScrollTop;
