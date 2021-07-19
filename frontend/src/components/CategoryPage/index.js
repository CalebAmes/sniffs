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

const LandingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  
  const eventItems = useSelector((state) => state.event);
  const categoryItems = useSelector((state) => state.category);
  
  const [eventItemsArray, setEventItemsArray] = useState(Object.values(eventItems)
    .filter(ev => ev?.categoryId == id));
  const categoryItemsArray = Object.values(categoryItems);
  const category = categoryItems[id];
  
  const search = (e) => {
    let val = e.target.value.toLowerCase();
    let baseArr = Object.values(eventItems).filter(ev => ev.categoryId == id)
      setEventItemsArray(
        baseArr.filter((el) => {
          let name = el.name.toLowerCase();
          let desc = el.description.toLowerCase();

          if(name.includes(val) || desc.includes(val))
            return el;
          else return;
        })
      )
  }

  const Header = () => (
      <div className='Header'>
        <h1 className='h1'>{category?.name}.</h1>
        <h3 className='h3'>{category?.description}</h3>
      </div>
  )
  
  useEffect(() => {
    body1()
    dispatch(getCategory())
    dispatch(getEvent())
    setEventItemsArray(Object.values(eventItems).filter(ev => ev.categoryId == id))
  }, [dispatch, id])

    return(
      <div className='home'>
      <div className='topPad'></div>
      <div>
        <Header/>
        <div className='eventSearchDiv'>
          <input className='eventSearchInput' onChange={(e)=>search(e)} placeholder={`search ${category?.name}.`}></input>
        </div>
        <div className='carouselDiv'>
          <ScrollingCarousel className='scrollingCarousel'>
            {
              eventItemsArray.map((item, i) => (
                <EventHolder event={ item } i={ i } key={ item?.id }> { item?.name }</EventHolder>
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