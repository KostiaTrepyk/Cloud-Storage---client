import { twMerge } from "tailwind-merge";
import Button, { ButtonProps } from "../Buttons/Button/Button";


interface MenuItemProps
	extends React.PropsWithChildren,
		Omit<ButtonProps, "color" | "variant"> {}

const MenuItem: React.FC<MenuItemProps> = ({ children, ...btnProps }) => {
	return (
		<li>
			<Button
				variant="contained"
				color="neutral"
				size="small"
				{...btnProps}
				className={twMerge(
					"w-full justify-start text-sm font-semibold normal-case tracking-wide",
					btnProps.className
				)}
			>
				{children}
			</Button>
		</li>
	);
};

export default MenuItem;
