import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import EventHolder from '../EventHolder';
import CategoryHolder from '../CategoryHolder';
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
    { width: 500, itemsToShow: 2 },
    { width: 755, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1400, itemsToShow: 5 }
  ]
  
  useEffect(() => {
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])

  return (
    <div className='home'>
      <div className='topPad'></div>
      <div>
        <h1 className='h1'>Events:</h1>
          <div className='carouselDiv'>
            <Carousel className='carousel' breakPoints={ breakPoints }>
              {
                eventItemsArray.map(item => (
                  <EventHolder event={ item } key={ item.id }> { item.name }</EventHolder>
                  ))
              }
            </Carousel>
          </div>
      </div>
        <h1 className='h1'>Categories:</h1>
        <div className='categoryBlock'>
          {
            categoryItemsArray.map(item => (
              <CategoryHolder category={ item } key={ item.id }>
                { item.name }
              </CategoryHolder>
            ))
          }
      </div>
    </div>  
  )
}

export default LandingPage;