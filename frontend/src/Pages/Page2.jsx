import React from 'react'
 import Eating from '../assets/Eating.jpg'
 import Serve from '../assets/Waiter.jpg'
 import Food from '../assets/Food.jpg'
 import Happy from '../assets/Happy.jpg'
 import Footer from '../Components/Footer'

 
const data = [
    {
        "id": 1,
        "image": Serve,
        "title": "Delicious Meals",
        "description": "We pride ourselves on serving up delicious meals that are crafted with the freshest ingredients and bursting with flavor. From classic comfort foods to innovative culinary creations, our menu is designed to satisfy every palate."
    },
    {
        "id": 2,
        "image": Food,
        "title": "Delicious Food",
        "description": "We pride ourselves on serving up delicious meals that are crafted with the freshest ingredients and bursting with flavor. From classic comfort foods to innovative culinary creations, our menu is designed to satisfy every palate."
    },
    {
        "id": 3,
        "image": Eating,
        "title": "Cozy Ambiance",
        "description": "Step into our restaurant and experience a cozy ambiance that makes you feel right at home. With warm lighting, comfortable seating, and a welcoming atmosphere, we create the perfect setting for enjoying great food and good company."
    },
    {
        "id": 4,
        "image": Happy,
        "title": "Happy Customers",
        "description": "Our customers are our top priority. We strive to create a welcoming atmosphere where everyone feels comfortable and satisfied with their dining experience."
    }
]

function Page2() {
  return (
    <>
      <div className='w-full bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col items-center py-12 sm:py-16 md:py-20 px-4 sm:px-6'>

        {data.map(({id, image, title, description}) => (
            <div className={`content flex flex-col md:flex-row items-center justify-center my-8 sm:my-10 w-full max-w-5xl gap-6 sm:gap-8 ${id % 2 == 1 ? 'md:flex-row-reverse' : ''}`} key={id}>
                <img src={image} alt={title} className='w-full md:w-1/3 h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg'/>
                <div className='md:ml-6'>
                    <h2 className='text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4'>{title}</h2>
                    <p className='text-white text-sm sm:text-base leading-relaxed'>{description}</p>
                </div>
            </div>
        ))}
      </div>
      <Footer/>
    </>
  )
}

export default Page2
