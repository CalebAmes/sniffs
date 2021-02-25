import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import EventHolder from '../EventHolder'
import Carousel from 'react-elastic-carousel';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ]
  
  useEffect(() => {
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])

  return (
    <>
      <div>
        <p>This is the landing page</p>
      </div>
      <div>
        <h1>Events:</h1>
        <div className='carouselDiv'>
          <Carousel breakPoints={ breakPoints }>
            {
              eventItemsArray.map(item => (
                <EventHolder event={ item } key={ item.id }> { item.name }</EventHolder>
              ))
            }
          </Carousel>
        </div>
      </div>
      <div>
        <h1>Categories:</h1>
        <ul>
          {
            categoryItemsArray.map(item => (
              <li key={ item.id }>{ item.name }</li>
            ))
          }
        </ul>
      </div>  
    </>
  )
}

export default LandingPage;