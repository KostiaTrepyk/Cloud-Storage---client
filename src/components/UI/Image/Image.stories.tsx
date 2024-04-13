import { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

import Img from "assets/Logo.webp";

const meta: Meta<typeof Image> = {
	title: "UI/Components/Image",
	component: Image,
	tags: ["autodocs"],
} satisfies Meta<typeof Image>;

export default meta;

export const Default: Story = {
	args: {
		containerAttrs: {
			className: "h-20",
		},
		imgAttrs: {
			src: Img,
		},
	},
};

export const ImageNotLoaded: Story = {
	args: {
		containerAttrs: {
			className: "h-20",
		},
		imgAttrs: {
			src: "fakeUrl",
		},
	},
};

type Story = StoryObj<typeof Image>;