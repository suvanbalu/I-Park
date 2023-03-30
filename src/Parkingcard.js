import React from 'react'

const Parkingcard = ({ slot, id, occupied }) => {
  return (
    <div className={`p-10 h-full w-full flex flex-col rounded-2xl items-center shadow-lg justify-center ${id ? "bg-gradient-to-tl from-red-100 to-red-400" : "bg-gradient-to-tl from-green-100 to-green-400"} text-black `}>
      <p className="font-bold text-3xl ">Slot - {slot}</p>
      <p className="mt-6 text-2xl font-semibold text-black">{id ? `User ${id}` : "Available" }</p>
    </div>
  )
}

export default Parkingcard
