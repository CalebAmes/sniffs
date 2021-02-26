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
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState([])
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  const { id } = useParams();
  const category = useState([])
  
  if(id) {
    console.log(category[0])
    console.log(
      )
    }

  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])
      
  if(id){
    const array = eventItemsArray.filter(event=> event.categoryId == id);
    const cat = categoryItemsArray.filter(category=> category.id == id);
    setEvents(array);
    setCategory(cat[0]);
    
    return(
      <div className='home'>
      <div className='topPad'></div>
      <div>
        <h1 className='h1'>{category.name}:</h1>
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