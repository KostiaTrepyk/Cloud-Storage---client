import { useRef, useState } from "react";

import IconButton from "components/UI/Buttons/IconButton/IconButton";
import Menu from "components/UI/Menu/Menu";
import MenuItem from "components/UI/Menu/MenuItems";
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";
import InfoIcon from "components/SvgIcons/InfoIcon";
import Button from "components/UI/Buttons/Button/Button";
import Popup from "components/UI/Popup/Popup";

import MenuIcon from "components/SvgIcons/MenuIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import BackIcon from "components/SvgIcons/BackIcon";
import DownloadIcon from "components/SvgIcons/DownloadIcon";
import Popover from "components/UI/Popover/Popover";

const HomePage = () => {
	const [isPopoverOpened, setPopoverOpened] = useState(false);
	const [isFirstOpened, setFirstOpened] = useState(false);
	const [isSecondOpened, setSecondOpened] = useState(false);
	const [isConfirmDeletingOpened, setConfirmDeletingOpened] = useState(false);

	const btnRef = useRef<HTMLButtonElement>(null);
	const refFirst = useRef<HTMLButtonElement>(null);
	const refSecond = useRef<HTMLButtonElement>(null);

	function del() {
		console.log("deleted");
	}

	const color = "rose";

	return (
		<main className="flex grow gap-4 px-2 py-10">
			<div className="flex gap-1 bg-rose-100 p-2">
				<Button
					variant="contained"
					color={color}
				>
					Button
				</Button>
				<Button
					variant="contained"
					color={color}
					disabled
				>
					Button
				</Button>
				<Button
					variant="outlined"
					color={color}
				>
					Button
				</Button>
				<Button
					variant="outlined"
					color={color}
					disabled
				>
					Button
				</Button>
				<Button
					variant="text"
					color={color}
				>
					Button
				</Button>
				<Button
					variant="text"
					color={color}
					disabled
				>
					Button
				</Button>
			</div>

			<IconButton
				className="mr-2 h-12"
				color="red"
				onClick={() => setConfirmDeletingOpened(true)}
			>
				<TrashIcon />
			</IconButton>

			<Button
				onClick={() => setPopoverOpened(true)}
				ref={btnRef}
			>
				Open
			</Button>

			<Popover
				open={isPopoverOpened}
				anchorElement={btnRef}
				anchorOrigin={{ horizontal: "center", vertical: "top" }}
				transformOrigin={{ horizontal: "center", vertical: "top" }}
			>
				Popover
			</Popover>

			<ConfirmModal
				open={isConfirmDeletingOpened}
				onConfirm={del}
				onClose={() => setConfirmDeletingOpened(false)}
			/>

			<IconButton
				className="h-12"
				onClick={() => setFirstOpened(!isFirstOpened)}
				ref={refFirst}
			>
				<MenuIcon />
			</IconButton>

			<Menu
				popupProps={{
					anchorElement: refFirst,
					open: isFirstOpened,
					onClose: () => setFirstOpened(false),
					anchorOrigin: { horizontal: "center", vertical: "top" },
					transformOrigin: {
						horizontal: "center",
						vertical: "bottom",
					},
				}}
			>
				<MenuItem startIcon={<InfoIcon />}>Item 1</MenuItem>
				<MenuItem startIcon={<InfoIcon />}>Item 2</MenuItem>
				<MenuItem startIcon={<InfoIcon />}>Item 3</MenuItem>
			</Menu>

			<IconButton
				className="h-12"
				onContextMenu={(e) => {
					e.preventDefault();
					setSecondOpened(!isFirstOpened);
				}}
				ref={refSecond}
			>
				<MenuIcon />
			</IconButton>

			<Menu
				popupProps={{
					anchorElement: refSecond,
					open: isSecondOpened,
					onClose: () => setSecondOpened(false),
				}}
			>
				<MenuItem startIcon={<BackIcon />}>Back</MenuItem>
				<MenuItem
					className="hover:bg-lime-600"
					startIcon={<DownloadIcon />}
				>
					Download
				</MenuItem>
				<MenuItem
					className="hover:bg-red-600"
					startIcon={<TrashIcon />}
				>
					Delete
				</MenuItem>
			</Menu>
			
			<Button>Button</Button>
			<Button>Button</Button>
			<Button>Button</Button>
		</main>
	);
};
export default HomePage;
