import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment, createComment, removeComment } from '../../store/comment';

const CommentSection = ({ id, userId }) => {
  const dispatch = useDispatch();

  const commentItems = useSelector((state) => state.comment);
	const commentsArray = Object.values(commentItems).filter(comment =>
			comment.eventId === parseInt(id))

  const [content, setContent] = useState('');
	const [commentEditor, setCommentEditor] = useState(false);

  const addComment = (e) => {
		if (e) e.preventDefault();
		dispatch(
			createComment({
				userId,
				content,
				eventId: id,
			})
		);
		setContent('');
	};

	const editComment = async (comment, newComment, id) => {
		if (newComment !== comment.content) {
			console.log('in editComment()')
		}
		setCommentEditor(!commentEditor)
	}

	const EditComment = ({ func, comment }) => {
		const [value, setValue] = useState(comment.content);
		const keyPress = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				func(value, comment.id)
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
		)
	}
	const deleteCommentId = (id) => {
		dispatch(removeComment(id));
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addComment();
		}
	};

  useEffect(() => {
    dispatch(getComment())
  }, [dispatch])

  return (
    <div className="commentBlock">
      <div className="comments">
        {commentsArray
          ?.map((comment) => (
            <>
              <div key={comment?.id} className="comment">
                {comment?.content}
              </div>
              {userId === comment.userId && (
                <>
                  <button onClick={() => setCommentEditor(!commentEditor)}>edit.</button>
                  <button onClick={() => deleteCommentId(comment.id)}>delete.</button>
                </>
              )}
              {commentEditor &&
                <EditComment func={editComment} comment={comment} />
              }
            </>
          ))}
      </div>
      <div>
        <form value={userId} onSubmit={addComment}>
          <div className="postComment">
            <textarea
              type="text"
              className="input"
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
  )
}

export default CommentSection