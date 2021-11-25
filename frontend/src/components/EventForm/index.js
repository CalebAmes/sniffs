import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/category";
import { body2 } from "../index";
import "./EventForm.css";
import "../../index.css";
import AddEventForm from "./Form";

const EventForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getCategory());
    body2();
  }, [dispatch]);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="formDiv SignupFormDiv">
      <AddEventForm />
    </div>
  );
};

export default EventForm;
