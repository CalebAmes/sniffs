import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getComment, createComment } from "../../store/comment";
import { getEventDetails } from "../../store/event";
import CommentHolder from "./CommentHolder";
import "./comments.css";

const CommentSection = ({ id, userId, comments }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const comments2 = useSelector((state) => state.event[id].comments);
  const commentArray = Object.values(comments2);
  const commentBox = useRef();

  const [content, setContent] = useState("");

  const scroll2 = () => {
    const commentBox = document.querySelector('.comments');
    commentBox.scrollTop = commentBox.scrollHeight;
  }

  const addComment = async (e) => {
    if (!userId) return history.push("/login");
    if (e) e.preventDefault();
    await dispatch(
      createComment({
        userId,
        content,
        eventId: id,
      })
    );
    setContent("");
    scroll2();
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addComment();
    }
  };

  // This is a fix for poorly designed redux state that requires a redesign of my state management. This was my first react redux project
  const update = () => {
    dispatch(getEventDetails(id))
  }

  useEffect(async () => {
    const comments = commentBox.current;
    const scroll = () => {
      comments.scrollTop = comments.scrollHeight;
    };
    scroll();
  }, [dispatch, comments]);

  return (
    <div className="commentBlock">
      <div className="comments" ref={commentBox}>
        {commentArray?.map((comment) => (
          <CommentHolder comment={comment} id={id} key={comment.id} update={update} />
        ))}
        {!commentArray.length && <h3>This is where you can post comments</h3>}
      </div>
      <div>
        <form value={userId} onSubmit={addComment}>
          <div className="postComment">
            <textarea
              type="text"
              className="input commentIn"
              maxLength="140"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={keyPress}
              required
            />
            <button className="submit commentB" type="submit">
              comment.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
