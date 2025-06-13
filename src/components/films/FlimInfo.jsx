import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilmActor, getFilmInfo } from '../../redux/slices/FilmSlice';

const FlimInfo = ({ id }) => {
  const { flimInfo } = useSelector((state) => state.film);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmInfo(id))
  }, [dispatch])

  // console.log(id)
  // console.log(flimInfo)

  return (
    <div className='flex flex-col gap-4'>
      <div className='mb-2'>
        <h1 className='text-2xl text-center'>FlimInfo</h1>
      </div>
      <div className=' space-y-5 text-left p-4'>
        <div className='space-x-3'>
          <label className='text-xl font-bold'>Title:</label>
          <span className='font-medium text-md'>{flimInfo?.title}</span>
        </div>
        <div className='space-x-3'>
          <label className='text-xl font-bold'>Release year:</label>
          <span className='font-medium text-md'>{flimInfo?.release_year}</span>
        </div>
        <div className='space-x-3'>
          <label className='text-xl font-bold'>Length:</label>
          <span className='font-medium text-md'>{flimInfo?.length}</span>
        </div>
        <div className='space-x-3'>
          <label className='text-xl font-bold'>Replacement cost:</label>
          <span className='font-medium text-md'>{flimInfo?.replacement_cost}</span>
        </div>
        <div className='space-x-3'>
          <label className='text-xl font-bold'>Rating:</label>
          <span className='font-medium text-md'>{flimInfo?.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default FlimInfo