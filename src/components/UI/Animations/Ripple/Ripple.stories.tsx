import { Meta, StoryObj } from "@storybook/react";
import Ripple from "./Ripple";

const meta: Meta<typeof Ripple> = {
	title: "UI/Animations/Ripple",
	component: Ripple,
	render: (props) => (
		<div
			className="relative w-fit select-none border px-3 py-2"
			style={{
				borderRadius: props.borderRadius,
			}}
		>
			Element with ripple animation!
			<Ripple {...props} />
		</div>
	),
} satisfies Meta<typeof Ripple>;

export default meta;

export const Default: Story = {};

export const WithBorderRadius: Story = {
	args: {
		borderRadius: 20,
	},
};

export const WithColor: Story = {
	args: {
		color: "amber",
	},
};

export const WithDuration: Story = {
	args: {
		duration: 3000,
	},
};

type Story = StoryObj<typeof meta>;