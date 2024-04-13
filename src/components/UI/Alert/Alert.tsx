import { twMerge } from "tailwind-merge";

import InfoIcon from "components/SvgIcons/InfoIcon";
import DangerIcon from "components/SvgIcons/DangerIcon";
import SuccessIcon from "components/SvgIcons/SuccessIcon";
import WarningIcon from "components/SvgIcons/WarningIcon";

type AlertType = "info" | "success" | "warning" | "danger";

export interface AlertProps {
	text: string;
	type?: AlertType;
	attrs?: React.HTMLAttributes<HTMLDivElement>;
}

const Alert: React.FC<AlertProps> = (props) => {
	const { text, type = "info", attrs } = props;
	return (
		<div
			{...attrs}
			className={twMerge(
				"flex w-full gap-3 rounded px-4 py-2 text-base",

				type === "info" &&
					"border border-cyan-400 bg-cyan-50 text-cyan-600",
				type === "success" &&
					"border border-lime-400 bg-lime-50 text-lime-600",
				type === "warning" &&
					"border border-orange-400 bg-orange-50 text-orange-600",
				type === "danger" &&
					"border border-red-400 bg-red-50 text-red-600",

				attrs?.className
			)}
		>
			<div className="aspect-square h-6">
				{type === "info" && <InfoIcon />}
				{type === "success" && <SuccessIcon />}
				{type === "warning" && <WarningIcon />}
				{type === "danger" && <DangerIcon />}
			</div>

			<div>{text}</div>
		</div>
	);
};

export default Alert;
