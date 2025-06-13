import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilmActor } from '../../redux/slices/FilmSlice';

const FlimActors = ({ id }) => {
    const { flimAllActors } = useSelector((state) => state.film);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmActor(id))
    }, [dispatch])

    // console.log(flimAllActors)

    return (
        <div>
            <div>
                <h1 className='text-2xl text-center'>FlimActors</h1>
            </div>
            <div className='p-3'>
                <ul className='space-y-2'>
                    {flimAllActors?.map((actor) => (
                        <li>{actor.actor.first_name + " " + actor.actor.last_name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FlimActors