import { twMerge } from "tailwind-merge";
import Button, { ButtonProps } from "components/UI/Buttons/Button/Button"


interface ContextMenuButtonProps extends ButtonProps {}

const ContextMenuButton: React.FC<ContextMenuButtonProps> = (props) => {
	const { children, ...buttonProps } = props;

	return (
		<Button
			color="neutral"
			variant="contained"
			size="small"
			{...buttonProps}
			className={twMerge("w-full justify-start", buttonProps.className)}
		>
			{children}
		</Button>
	);
};

export default ContextMenuButton;

