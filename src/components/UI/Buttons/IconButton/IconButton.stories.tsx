import IconButton from "./IconButton"
import { Meta, StoryObj } from "@storybook/react";

import Icon from "components/SvgIcons/CopyIcon";

const meta: Meta<typeof IconButton> = {
	title: "UI/Components/IconButton",
	component: IconButton,
	tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

export const Default: Story = {
	args: { children: <Icon />, className: "h-10" },
};

export const WithStatus: Story = {
	args: { children: <Icon />, className: "h-10", status: "pending" },
};

export const Outlined: Story = {
	args: { children: <Icon />, className: "h-10" },
};

export const WithChangedColor: Story = {
	args: {
		children: <Icon />,
		className: "h-10",
		color: "lime",
		variant: "outlined",
	},
};

export const Disabled: Story = {
	args: {
		children: <Icon />,
		className: "h-10",
		color: "lime",
		disabled: true,
	},
};

type Story = StoryObj<typeof meta>;