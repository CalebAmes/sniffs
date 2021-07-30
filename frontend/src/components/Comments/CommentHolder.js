import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, updateComment } from "../../store/comment";
import "../EventPage/EventPage.css";
import "./comments.css";

const CommentHolder = ({ comment, id }) => {
  const dispatch = useDispatch();
  const [commentEditor, setCommentEditor] = useState(false);

  const userId = useSelector((state) => state.session.user.id);

  const editComment = async (comment, newComment, id) => {
    if (newComment !== comment.content) {
      dispatch(updateComment({ id, newComment }));
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

  const deleteCommentId = (id) => {
    dispatch(removeComment(id));
  };

  return (
    <>
      <div className="commentHolder">
        <img src={comment.User.avatar} className="commentAvatar" />
        <div className="comment">
					<div className="comment-header">
						<h3>{comment.User.username}</h3>
					</div>
          <div key={comment?.id} className="commentContent">
            {comment?.content}
          </div>
        </div>
        {userId === comment.userId && (
          <>
            <div className="commentButton" onClick={() => setCommentEditor(!commentEditor)}>
              edit.
            </div>
            <div className="commentButton" onClick={() => deleteCommentId(comment.id)}>delete.</div>
          </>
        )}
        {commentEditor && <EditComment func={editComment} comment={comment} />}
      </div>
    </>
  );
};

export default CommentHolder;
