import { Meta, StoryObj } from "@storybook/react"
import Fade from "./Fade"
import Button from "components/UI/Buttons/Button/Button";

const meta: Meta<typeof Fade> = {
	title: "UI/Animations/Fade",
	component: Fade,
	tags: ["autodocs"],
	render: (props) => (
		<Fade {...props}>
			<Button>Button</Button>
		</Fade>
	),
} satisfies Meta<typeof Fade>;

export default meta;

export const Default: Story = {};

export const WithDelay: Story = {
	args: {
		delay: 1,
	},
};

export const WithDuration: Story = {
	args: {
		duration: 2,
	},
};

type Story = StoryObj<typeof meta>;