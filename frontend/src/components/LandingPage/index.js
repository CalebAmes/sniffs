import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../../store/event";
import { getCategory } from "../../store/category";
import EventHolder from "../EventHolder";
import CategoryHolder from "../CategoryHolder";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import "./LandingPage.css";
import { body1 } from "../index";

const LandingPage = () => {
  const dispatch = useDispatch();

  const categoryItems = useSelector((state) => state.category);
  const eventItems = useSelector((state) => state.event);

  const [eventItemsArray, setEventItemsArray] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const categoryItemsArray = Object.values(categoryItems);

  useEffect(() => {
    body1();
    dispatch(getCategory());
    dispatch(getEvent());
    setEventItemsArray(Object.values(eventItems));
    setIsLoaded(true);
  }, [dispatch]);

  const search = (e) => {
    let val = e.target.value.toLowerCase();
    setEventItemsArray(
      Object.values(eventItems).filter((el) => {
        let name = el.name.toLowerCase();
        let desc = el.description.toLowerCase();

        return name.includes(val) || desc.includes(val);
      })
    );
  };

  return (
    <>
      {!isLoaded && <div className="loading" />}
      {isLoaded && (
        <div className="home">
          <div className="topPad"></div>
          <div>
            <div className="headerDiv">
              <h1 className="h1">events.</h1>
            </div>
            <div className="eventSearchDiv">
              <input
                className="eventSearchInput"
                onChange={(e) => search(e)}
                placeholder="search."
              ></input>
            </div>
            <div className="carouselDiv">
              <ScrollingCarousel className="scrollingCarousel">
                {eventItemsArray.map((item, i) => (
                  <EventHolder event={item} i={i} key={item?.id}>
                    {" "}
                    {item?.name}
                  </EventHolder>
                ))}
              </ScrollingCarousel>
            </div>
          </div>
          <h1 className="h1">categories.</h1>
          <div className="categoryBlock">
            {categoryItemsArray.map((item) => (
              <CategoryHolder category={item} key={item?.id}>
                {item?.name}
              </CategoryHolder>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
