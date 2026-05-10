import React from 'react'

const UserProfile = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const { id } = await params

  return (

    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-white bg-black'>

      <h1 className='text-4xl mb-4'>
        User Profile
      </h1>.

      <hr className='w-60 mb-5' />

      <p className='text-4xl'>
        UserProfile Page

        <span className='text-blue-500 ml-3'>
          {id}
        </span>

      </p>

    </div>
  )
}

export default UserProfile