"use client"
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

function Loader({loading}: {loading: boolean}) {
    console.log(loading)
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <ClipLoader color="gray" aria-label="Loading Spinner"
        data-testid="loader" loading={loading} size={35}  />
    </div>
  )
}

export default Loader