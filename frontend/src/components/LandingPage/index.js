import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import EventHolder from '../EventHolder';
import CategoryHolder from '../CategoryHolder';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import './LandingPage.css';
import { body1 } from '../index';

const LandingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    body1()
    dispatch(getCategory())
    dispatch(getEvent())
  }, [dispatch])
  
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);

  const [eventItemsArray, setEventItemsArray] = useState(Object.values(eventItems));
  const categoryItemsArray = Object.values(categoryItems);
  const category = categoryItems[id];

  const clear = () => {
    setEventItemsArray(Object.values(eventItems))
  }
  
  const search = (e) => {
    let val = e.target.value
    if(val.length === 0){
      clear()
    }
    else {
      setEventItemsArray(
          eventItemsArray.filter(el => el['name'].includes(val) || el['description'].includes(val)))
    }
  }


    return (
      <div className='home'>
        <div className='topPad'></div>
        <div>
          <h1 className='h1'>events.</h1>
          <input onChange={(e)=>search(e)}></input>
            <div className='carouselDiv'>
              <ScrollingCarousel className='scrollingCarousel'>
                {
                  eventItemsArray.map(item => (
                    <EventHolder event={ item } key={ item?.id }> { item?.name }</EventHolder>
                  ))
                }
              </ScrollingCarousel>
            </div>
        </div>
          <h1 className='h1'>categories.</h1>
          <div className='categoryBlock'>
            {
              categoryItemsArray.map(item => (
                <CategoryHolder category={ item } key={ item?.id }>
                  { item?.name }
                </CategoryHolder>
              ))
            }
        </div>
      </div>  
    )
}

export default LandingPage;