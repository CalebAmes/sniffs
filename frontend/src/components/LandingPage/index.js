import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import EventHolder from '../EventHolder';
import CategoryHolder from '../CategoryHolder';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import './LandingPage.css';
import { body1 } from '../index'

const LandingPage = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  

  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])

  return (
    <div className='home'>
      <div className='topPad'></div>
      <div>
        <h1 className='h1'>Events:</h1>
          <div className='carouselDiv'>
            <ScrollingCarousel className='scrollingCarousel'>
              {
                eventItemsArray.map(item => (
                  <EventHolder event={ item } key={ item.id }> { item.name }</EventHolder>
                  ))
              }
            </ScrollingCarousel>
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