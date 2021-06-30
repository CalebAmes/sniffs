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
  
  const categoryItems = useSelector((state) => state.category);
  const eventItems = useSelector((state) => state.event);
  
  const [eventItemsArray, setEventItemsArray] = useState(Object.values(eventItems));
  const [isLoaded, setIsLoaded] = useState(false);
  const categoryItemsArray = Object.values(categoryItems);
  const category = categoryItems[id];
  
  useEffect(() => {
    body1()
    dispatch(getCategory())
    dispatch(getEvent())
    setEventItemsArray(Object.values(eventItems))
    setIsLoaded(true)
  }, [dispatch])
  
  const clear = () => {
    setEventItemsArray(Object.values(eventItems))
  }
  
  const search = (e) => {
    let val = e.target.value.toLowerCase()
    if(val.length === 0){
      clear()
    }
    else {
      setEventItemsArray(
          Object.values(eventItems).filter((el) => {
            let name = el.name.toLowerCase();
            let desc = el.description.toLowerCase();

            if(name.includes(val) || desc.includes(val))
              return el;
            else return;
          }))
    }
  }


    return (
      <>
      { isLoaded &&
        <div className='home'>
          <div className='topPad'></div>
          <div>
            <div className='headerDiv'>
              <h1 className='h1'>events.</h1>
            </div>
              <div className='eventSearchDiv'>
                <input className='eventSearchInput' onChange={(e)=>search(e)} placeholder='search.'></input>
              </div>
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
      }
      </>
    )
}

export default LandingPage;