import { twMerge } from "tailwind-merge";

import Button from "components/UI/Buttons/Button/Button";
import Modal from "components/UI/Modal/Modal";
import Alert, { AlertProps } from "components/UI/Alert/Alert";

interface ConfirmModalProps {
	title?: string;
	open?: boolean;
	onConfirm: () => void;
	onClose: () => void;
	alertProps?: AlertProps;
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
	const {
		title = "Are you sure?",
		open = false,
		onConfirm,
		onClose,
		alertProps,
	} = props;

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<h3 className="mb-4 text-2xl">{title}</h3>

				{alertProps?.text && (
					<Alert
						{...alertProps}
						attrs={{
							...alertProps.attrs,
							className: twMerge(
								"w-5/6",
								alertProps.attrs?.className
							),
						}}
					/>
				)}

				<div className="mt-6 flex gap-3">
					<Button
						className="hover:bg-lime-500 hover:text-white"
						onClick={() => {
							onConfirm();
							onClose();
						}}
						color="light"
					>
						Yes
					</Button>

					<Button
						className="hover:bg-red-500 hover:text-white"
						onClick={() => onClose()}
						color="light"
					>
						No
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
