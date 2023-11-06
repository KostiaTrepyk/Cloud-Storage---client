import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import UploadIcon from "../../SvgIcons/UploadIcon";

interface Props {
	isLoading: boolean;
	onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	disabled?: boolean;
}

const UploadButton = forwardRef<HTMLLabelElement, Props>(
	({ isLoading, onUpload, className, disabled }, ref) => {
		return (
			<label
				className={twMerge(
					"flex h-full w-fit cursor-pointer items-center rounded bg-amber-500 px-3 py-2 text-center text-lg font-semibold text-white outline-2 outline-offset-2 outline-rose-600 transition duration-300 focus-within:outline-dashed hover:bg-orange-500 aria-disabled:bg-neutral-500 sm:gap-2",
					disabled && "contrast-75",
					className
				)}
				aria-disabled={isLoading}
				title="Upload"
				ref={ref}
			>
				<UploadIcon
					className="h-7 justify-self-start text-amber-500 transition"
					currentColor={isLoading}
				/>
				<span className="block max-sm:hidden">
					{isLoading ? "Wait" : "Upload"}
				</span>
				<input
					className="h-0 w-0 focus-visible:outline-none"
					type="file"
					onChange={onUpload}
					disabled={isLoading}
				/>
			</label>
		);
	}
);

export default UploadButton;
