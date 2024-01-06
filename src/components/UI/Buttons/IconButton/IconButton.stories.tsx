import IconButton from "./IconButton"
import { Meta, StoryObj } from "@storybook/react";

import Icon from "components/SvgIcons/CopyIcon";

const meta: Meta<typeof IconButton> = {
	title: "IconButton",
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

type Story = StoryObj<typeof meta>;