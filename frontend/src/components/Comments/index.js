import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment, createComment } from '../../store/comment';
import CommentHolder from './CommentHolder';

const CommentSection = ({ id, userId }) => {
  const dispatch = useDispatch();

  const commentItems = useSelector((state) => state.comment);
	const commentsArray = Object.values(commentItems).filter(comment =>
			comment.eventId === parseInt(id))

  const [content, setContent] = useState('');

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
						<CommentHolder comment = {comment} id = { id }key={comment.id} />
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