import AddFileIcon from "components/SvgIcons/AddFileIcon";
import Fade from "components/UI/Animations/Fade/Fade";
import Button from "components/UI/Buttons/Button/Button";
import IconButton from "components/UI/Buttons/IconButton/IconButton";

interface EmptyListProps {
	createFolder: () => void;
	uploadFile: () => void;
}

const EmptyList: React.FC<EmptyListProps> = ({ createFolder, uploadFile }) => {
	return (
		<Fade className="w-full">
			<div className="flex w-full flex-col items-center gap-6 p-2">
				<span className="text-2xl font-semibold text-rose-600">
					Empty
				</span>

				<div className="flex h-10 w-full justify-center gap-1">
					<Button
						variant="contained"
						color="rose"
						onClick={() => {
							createFolder();
						}}
					>
						Create new folder
					</Button>

					<IconButton
						className="rounded"
						variant="contained"
						color="rose"
						onClick={() => uploadFile()}
					>
						<AddFileIcon />
					</IconButton>
				</div>
			</div>
		</Fade>
	);
};

export default EmptyList;
