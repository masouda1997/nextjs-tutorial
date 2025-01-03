"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	IoLocationSharp,
	// IoLogoInstagram
} from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
// import { BsWhatsapp, BsTwitterX } from "react-icons/bs";
// import { FaLinkedinIn } from "react-icons/fa6";
import { Input } from "antd";
import type { GetProps } from "antd";




type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
	console.log(info?.source, value);



const EntekhabFooter = ({ quickAccess, newsAndPapers, social, address , dir }:any) => {
	return (
		<footer dir={`${dir}`}>
			{/* top section */}
			<div className="border-t border-b border-[#E6EAFF] flex flex-col">
				{/* Flex container for columns */}
				<div className="flex flex-col md2:flex-row justify-between items-start gap-5 mb-6">
					{/* Column 1 */}
					<div className="md:basis-1/4 flex flex-col justify-between self-stretch">
						{/* Cart title */}
						<div className="flex items-center py-5">
							{/* <h2 className="text-lg text-font16 font-bold font-YekanFonts">
                دسترسی سریع
              </h2> */}
							<h2 className="text-sm md:text-lg font-bold font-YekanFonts">
								دسترسی سریع
							</h2>
							<div className="flex-grow border-b border-gray-300 mx-2"></div>
						</div>

						<div className="flex flex-col gap-1">
							{quickAccess.map((link: any) => (
								<Link
									key={link.id}
									href={link.url}
									className="text-sm md:text-lg font-bold font-YekanFonts"
								>
									{link.text}
								</Link>
							))}
							{/* className="text-blue-500 text-font14 font-YekanFonts hover:underline" */}
						</div>

						{/* Cart title */}
						<div className="flex items-center py-5">
							<h2 className="text-lg text-font16 font-bold font-YekanFonts">
								اشتراک خبرنامه
							</h2>
							<div className="flex-grow border-b border-gray-300 mx-4"></div>
						</div>
						{/* <form
							action={"#"}
							className="flex items-center gap-3 justify-between"
						>
							<input
								type="text"
								placeholder="جستجو..."
								className="border font-YekanFonts border-gray-300 p-2 w-7/12"
							/>
							<button
								type="submit"
								className="bg-[#2F4EFF] hover:bg-[#322fff] transition duration-75 w-5/12 text-white p-2 font-YekanFonts"
							>
								جستجو
							</button>
						</form> */}
						<Search
							placeholder="جستحو..."
							allowClear
							enterButton="جستجو "
							size="large"
							onSearch={onSearch}
						/>
					</div>

					{/* Column 2 */}
					<div className="md:basis-1/4 self-stretch">
						<div className="flex items-center py-5">
							<h2 className="text-lg font-bold font-YekanFonts">
								اخبار و مقالات
							</h2>
							<div className="flex-grow border-b border-gray-300 mx-4"></div>
						</div>
						<div className="flex flex-col gap-8 justify-start">
							{newsAndPapers.map((link: any) => (
								<Link
									key={link.id}
									href={link.url}
									className="text-blue-500 text-sm md:text-base font-YekanFonts hover:underline"
								>
									{link.text}
								</Link>
							))}
						</div>
					</div>

					{/* Column 3 */}
					<div className="md:basis-2/4 self-stretch">
						<div className="flex items-center py-5">
							<h2 className="text-lg font-bold font-YekanFonts">
								درباره گروه صنعتی انتخاب
							</h2>
							<div className="flex-grow border-b border-gray-300 mx-4"></div>
						</div>
						<div>
							{/* <p className="text-font14 font-YekanFonts leading-10">
                        سرآغاز فعالیت گروه صنعتی انتخاب الکترونیک با تاسیس شرکت حایرآسا
                        در بیست و نهم آبان‌ماه ۱۳۷۹ کلید خورده است؛ حایرآسا که ماموریت
                        تولید محصولات برودتی (انواع یخچال و فریزر، سایدبای ساید و …) را
                        برعهده دارد از سال ۱۳۸۴ در کارخانه‌ای به مساحت ۲ هزار و ۵۰۰ متر
                        مربع در محل شهرک صنعتی مورچه خورت اصفهان فعالیت‌های تولیدی خود
                        را آغاز کرده و در سال ۱۳۹۸ به عنوان شرکت سرمجموعه هلدینگ لوازم
                        خانگی گروه توسعه سرمایه‌گذاری انتخاب معرفی شد.
                     </p> */}
							<p className="text-sm md:text-base font-YekanFonts leading-10">
								سرآغاز فعالیت گروه صنعتی انتخاب الکترونیک با
								تاسیس شرکت حایرآسا در بیست و نهم آبان‌ماه ۱۳۷۹
								کلید خورده است؛ حایرآسا که ماموریت تولید محصولات
								برودتی (انواع یخچال و فریزر، سایدبای ساید و …)
								را برعهده دارد از سال ۱۳۸۴ در کارخانه‌ای به
								مساحت ۲ هزار و ۵۰۰ متر مربع در محل شهرک صنعتی
								مورچه خورت اصفهان فعالیت‌های تولیدی خود را آغاز
								کرده و در سال ۱۳۹۸ به عنوان شرکت سرمجموعه هلدینگ
								لوازم خانگی گروه توسعه سرمایه‌گذاری انتخاب معرفی
								شد.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom section */}
			<div className="flex flex-col md2:flex-row items-center justify-between gap-6 pb-4 border-b">
				<div className="flex flex-col md2:flex-row justify-start gap-5">
					<p className="flex items-center text-font14 font-YekanFonts ">
						<IoLocationSharp className="text-[#2f4eff]" />
						{address}{" "}
					</p>

					<span className="flex justify-around items-center gap-3">
						<span className="flex justify-between items-center gap-2">
							<FiPhone className="text-[#2f4eff]" /> 031-3232
						</span>
						<figure className="flex justify-between gap-1 items-center">
							{social.map((link: any) => (
								<Link key={link.id} href={link.href}>
									{link.icon}
								</Link>
							))}
						</figure>
					</span>
				</div>

				<figure className="flex items-center justify-end">
					<Image
						className="bg-red-500"
						width={100}
						height={10}
						src="/images/blogo.png"
						alt="Logo"
					/>
				</figure>
			</div>

			{/* copy right */}
			<div className="bg-[#0FE883] h-6  flex text-center justify-center">
				<span className="text-font10 font-YekanFonts mt-1">
					تمامی حقوق مادی و معنوی این سایت برای گروه صنعتی انتخاب
					محفوظ می باشد- 1403
				</span>
			</div>
		</footer>
	);
};

export default EntekhabFooter;
