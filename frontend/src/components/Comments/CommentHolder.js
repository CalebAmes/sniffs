import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, updateComment } from "../../store/comment";
import "../EventPage/EventPage.css";
import "./comments.css";

const CommentHolder = ({ comment, id, update }) => {
  const dispatch = useDispatch();
  const [commentEditor, setCommentEditor] = useState(false);
  const [hover, setHover] = useState(false);

  const userId = useSelector((state) => state.session.user.id);

  const editComment = async (comment, newComment, id) => {
    if (newComment !== comment.content) {
      await dispatch(updateComment({ id, newComment }));
      update();
    }
    setCommentEditor(!commentEditor);
  };

  const EditComment = ({ func, comment }) => {
    const [value, setValue] = useState(comment.content);
    const keyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        func(comment.content, value, comment.id);
      }
    };
    return (
      <div className="editCommentDiv">
        <textarea
          maxLength="140"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={keyPress}
          value={value}
          className="messageInputTextarea"
        >
          {comment.content}
        </textarea>
      </div>
    );
  };

  const deleteCommentId = async (comment) => {
    await dispatch(removeComment(comment));
    update();
  };

  return (
    <>
      <div
        className="commentHolder"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={comment.User.avatar} className="commentAvatar" />
        <div className="comment">
          <div className="comment-header">
            <h3>{comment.User.username}</h3>
          </div>
          <div key={comment?.id} className="commentContent">
            {comment?.content}
          </div>
        </div>
        {userId === comment.userId && hover && (
          <div className="commentMods">
            <div
              className="commentButton"
              onClick={() => setCommentEditor(!commentEditor)}
            >
              edit.
            </div>
            <div
              className="commentButton"
              onClick={() => deleteCommentId(comment)}
            >
              delete.
            </div>
          </div>
        )}
        {commentEditor && <EditComment func={editComment} comment={comment} />}
      </div>
    </>
  );
};

export default CommentHolder;
