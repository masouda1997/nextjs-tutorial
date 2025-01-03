import EntekhabFooter from "@/components/EntekhabFooter";
import {  ComponentProps } from "react";
import { Meta , StoryObj } from '@storybook/react';


type StoryProps = ComponentProps<typeof EntekhabFooter>

const meta: Meta<StoryProps> = {
   component: EntekhabFooter,
 };
 export default meta

type Story = StoryObj <typeof EntekhabFooter>

export const Default: Story = {
	args: {
		dir: "rtl", // Default direction for the footer
		address: "123 خیابان اصلی، شهر، کشور",
		quickAccess: [
			{ id: "1", text: "خانه", url: "/" },
			{ id: "2", text: "درباره ما", url: "/about" },
		],
		newsAndPapers: [
			{ id: "1", text: "خبر 1", url: "/news/1" },
			{ id: "2", text: "خبر 2", url: "/news/2" },
		],
		social: [
			{
				id: "1",
				href: "https://facebook.com",
				icon: <span>FB</span>, // Replace with your actual icon components
			},
			{
				id: "2",
				href: "https://twitter.com",
				icon: <span>TW</span>, // Replace with your actual icon components
			},
		],
	},
};