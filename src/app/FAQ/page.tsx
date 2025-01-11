import React from 'react'
import EntekhabFaq from './faq'


const page = () => {
  return (
   <div className="w-auto h-auto lg:mr-[300px] lg:ml-[300px] md:mr-[100px] md:ml-[100px] mr-5 mt-10 ml-5">
       <EntekhabFaq
          appId="ebfac6fa-3b92-4d03-a4d3-2d973f07199c"
          headerClassName="w-full h-full !bg-[#EFEFF1]"
          contentClassName="bg-white w-full"
          accordionClassName="w-full mt-5"
          title="سوالات شما"
          description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،"
        />
   </div>
  )
}

export default page
