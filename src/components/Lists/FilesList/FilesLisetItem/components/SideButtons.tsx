import { FC, forwardRef } from "react";
 
import ShareIcon from "../../../../SvgIcons/ShareIcon";
import TrashIcon from "../../../../SvgIcons/TrashIcon";
import IconButton from "../../../../UI/Buttons/IconButton";
import DownloadIcon from "../../../../SvgIcons/DownloadIcon";

interface Props {
	downloadFileHandler: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
	deleteFileHandler: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
}

const SideButtons: FC<Props> = forwardRef(
	({ downloadFileHandler, deleteFileHandler }, ref: any) => {
		return (
			<div
				className="absolute right-1 top-1 flex flex-col gap-1"
				ref={ref}
			>
				<IconButton
					className="h-7 border-0 text-black"
					color="lime"
					title="Download"
					onClick={downloadFileHandler}
				>
					<DownloadIcon />
				</IconButton>

				<IconButton
					className="border-0 text-black"
					color="amber"
					title="Share"
					onClick={(e) => console.log("Share")}
				>
					<ShareIcon />
				</IconButton>
				<IconButton
					className="border-0 text-black"
					color="red"
					title="Delete"
					onClick={deleteFileHandler}
				>
					<TrashIcon />
				</IconButton>
			</div>
		);
	}
);

export default SideButtons;
