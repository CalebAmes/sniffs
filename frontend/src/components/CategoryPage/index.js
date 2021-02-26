import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../store/event';
import { getCategory } from '../../store/category';
import EventHolder from '../EventHolder';
import CategoryHolder from '../CategoryHolder';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import '../LandingPage/LandingPage.css';
import { body1 } from '../index';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([])
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  const { id } = useParams();
  
  
  const eventItemsArray = Object.values(eventItems);
  const categoryItemsArray = Object.values(categoryItems);
  const array = eventItemsArray.filter(event=> event.categoryId == id);
  const cat = categoryItemsArray.filter(category=> category.id == id)
  const category = cat[0];
  
  useEffect(() => {
    body1()
    dispatch(getEvent())
    dispatch(getCategory())
  }, [dispatch])
  
    return(
      <div className='home'>
      <div className='topPad'></div>
      <div>
        <h1 className='h1'>{category.name}.</h1>
        <h3 className='h3'>{category.description}</h3>
          <div className='carouselDiv'>
            <ScrollingCarousel className='scrollingCarousel'>
              {
                eventItemsArray.filter(event=> event.categoryId == id)
                  .map(item => (
                  <EventHolder event={ item } key={ item.id }> { item.name }</EventHolder>
                ))
              }
            </ScrollingCarousel>
          </div>
      </div>
        <h1 className='h1'>categories.</h1>
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
)}

export default CategoryPage;