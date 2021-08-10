import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getComment, createComment } from "../../store/comment";
import CommentHolder from "./CommentHolder";
import "./comments.css";

const CommentSection = ({ id, userId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const commentItems = useSelector((state) => state.comment);
  const commentsArray = Object.values(commentItems).filter(
    (comment) => comment.eventId === parseInt(id)
  );

  const commentArray = useSelector((state) => state.event[id].Comments);
  console.log('this is commentArray ------=->>>>>>>>>:', commentArray);
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

  useEffect(async () => {
    const comments = commentBox.current;
    const scroll = () => {
      comments.scrollTop = comments.scrollHeight;
    };
    scroll();
  }, [dispatch]);

  return (
    <div className="commentBlock">
      <div className="comments" ref={commentBox}>
        {commentArray?.map((comment) => (
          <CommentHolder comment={comment} id={id} key={comment.id} />
        ))}
        {!commentsArray.length && <h3>This is where you can post comments</h3>}
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
