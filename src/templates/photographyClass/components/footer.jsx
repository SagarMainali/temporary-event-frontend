import React from 'react'


const Footer = ({ day, date, location, organiser, phone, mail }) => {

  return (
    <div className='w-full flex justify-between border-t-2 border-t-[#989595] py-15 max-sm:flex-wrap gap-6'>

      <div className='w-[25%] max-sm:w-[50%]'>
        <p className='text-xl font-bold'>{day}</p>
      </div>

      <div className='flex flex-col gap-2.5 max-sm:w-[40%]'>
        <p className='font-bold'>{date}</p>
        <p>{location}</p>
      </div>


      <div className='flex flex-col gap-2.5 w-[17] max-sm:w-[50%]'>
        <p>{organiser}</p>
        <p>{phone}</p>
        <p>{mail}</p>
      </div>



    </div>
  )
}

export default Footer;