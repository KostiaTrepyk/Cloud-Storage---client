import { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";


const meta: Meta<typeof Modal> = {
	title: "UI/Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	render: (props) => {
		return (
			<>
				<div id="modal"></div>

				<Modal {...props}>
					<div>Modal</div>
				</Modal>
			</>
		);
	},
} satisfies Meta<typeof Modal>;

export default meta;

export const Default: Story = {
	args: {
		open: true,
	},
};

type Story = StoryObj<typeof meta>;