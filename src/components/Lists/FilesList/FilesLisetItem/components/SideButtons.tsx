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
					className="h-7 border-neutral-500 bg-lime-400 p-[.3rem] text-black hover:bg-lime-300"
					title="Download"
					onClick={downloadFileHandler}
				>
					<DownloadIcon />
				</IconButton>

				<IconButton
					className="h-7 border-neutral-500 bg-amber-400 p-[.3rem] text-black hover:bg-amber-300"
					title="Share"
					onClick={(e) => console.log("Share")}
				>
					<ShareIcon />
				</IconButton>
				<IconButton
					className="h-7 border-neutral-500 bg-red-400 p-[.3rem] text-black hover:bg-red-300"
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
