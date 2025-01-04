"use client"

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";

const { Meta } = Card;

interface CardData {
   title: string;
   content: string;
   imgurl?: string;
 }


const cards: CardData[] = [
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   {
     title: "توضیحات مربوط به تبلیغات",
     content:
       "برای تولید با کیفیت قطعات صنعتی، ما مفتخر به داشتن قابلیت های زیر هستیم.",
     imgurl: "https://fakeimg.pl/250x200/",
   },
   // Add more cards as needed
 ];

type Props = {}
const settings = {
   dots: true,
   infinite: false,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 2,
   initialSlide: 0,
   centerMode: false, // Enable center mode
  centerPadding: "20px", // Add padding around each slide
   responsive: [
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 3,
         infinite: true,
         dots: true
       }
     },
     {
       breakpoint: 600,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2,
         initialSlide: 2
       }
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1
       }
     }
   ]
 };

const newsSlider = (props: Props) => {
   return (
     <section dir="rtl" className="bg-red-300">
       <div className="slider-container">
         <span className="flex text-center font-YekanFonts justify-center mt-10 mb-5  text-font32 ">
           جدیدترین اخبار
         </span>

         <div className="text-font16  font-YekanFonts text-center justify-center mt-5 mb-7">
           جدیدترین مصوبات و اخبار و دستورالعمل های اجرایی
         </div>

         <Slider {...settings}>
         {/* <div className="flex justify-between items-center !flex-row m-3 "> */}
           {cards.map((card, index) => (
            //  <Card
            //    dir="rtl"
            //    hoverable
            //    style={{ margin: 20,}}
            //    cover={
            //      <img
            //        alt="example"
            //        src={card.imgurl}
            //      />
            //    }
            //  >
            //    <Meta
            //      title={card.title}
            //      description={card.content}
            //    />
            //  </Card>
             <section dir="rtl" key={index} className="flex flex-col justify-center items-center p-2 ">
                <div>
                   <img alt="example" src={card.imgurl}/>
                </div>
                <div className="bg-blue-500">
                   <p className="">{card.title}</p>
                   <p className="">{card.content}</p>
                </div>
             </section>
           ))}
         {/* </div> */}
         </Slider>
       </div>
     </section>
   );
}

export default newsSlider


