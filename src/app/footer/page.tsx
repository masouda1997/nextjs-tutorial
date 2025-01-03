import React from 'react'
import {IoLogoInstagram } from "react-icons/io5";
import { BsWhatsapp, BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import EntekhabFooter from '@/components/EntekhabFooter';


const quickAccess = [
   {id:"1", text: 'درباره ما ', url: '/' },
   {id:"2", text: 'خدمات', url: '/about' },
   {id:"3", text: 'تماس با ما', url: '/contact' },
   {id:"4", text: ' خانه ', url: '/' },
 ]


const newsAndPapers = [
	{ id: "1", text: "دانشگاه انتخاب،ارزش آفرینی از جنس مهارت", url: "#" },
	{ id: "2", text: "اسنوا برند محبوب ایرانی", url: "#" },
	{
		id: "3",
		text: "دریافت پروانه قعالیت بزرگ مقیاش نفتی از سوی هلدینگ دکا  ",
		url: "##",
	},
	{ id: "4", text: "ابعاد استاندارد چاپ نایلون و نایلکس", url: "#" },
];

const socialMediaLinks = [
	{
		id: "1",
		icon: <IoLogoInstagram className="text-[#2f4eff]"/>,
		href: "https://www.instagram.com",
		color: "#2f4eff",
	},
	{
		id: "2",
		icon: <BsWhatsapp className="text-[#2f4eff]"/>,
		href: "https://www.whatsapp.com",
		color: "#2f4eff",
	},
	{
		id: "3",
		icon: <FaLinkedinIn className="text-[#2f4eff]"/>,
		href: "https://www.linkedin.com",
		color: "#2f4eff",
	},
	{
		id: "4",
		icon: <BsTwitterX className="text-[#2f4eff]"/>,
		href: "https://www.twitter.com",
		color: "#2f4eff",
	},
];

const address =  "اصفهان ، شهرک صنعتی مورچه خورت ، خیابان رازی ، طبقه همکف"



const page = () => {
  return (
   <EntekhabFooter
      dir = {'rtl'} 
      quickAccess={quickAccess} 
      newsAndPapers={newsAndPapers}
      social= {socialMediaLinks}
      address={address}
   />
  )
}

export default page
