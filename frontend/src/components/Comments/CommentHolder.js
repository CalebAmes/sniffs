import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment, updateComment } from '../../store/comment';

const CommentHolder = ({ comment, id }) => {
  console.log(id)
  const dispatch = useDispatch();
  const [commentEditor, setCommentEditor] = useState(false);

  const userId = useSelector(state => state.session.user.id);

	const editComment = async (comment, newComment, id) => {
    console.log('this is comment', comment)
    console.log('this is newComment', newComment)
    console.log('this is id', id)
		if (newComment !== comment.content) {
			// this is where we dispatch an action to the store
      console.log('this is id: ', id)
      dispatch(updateComment({id, newComment}));
		}
		setCommentEditor(!commentEditor)
	}

	const EditComment = ({ func, comment }) => {
		const [value, setValue] = useState(comment.content);
		const keyPress = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				func(comment.content, value, comment.id)
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

  return (
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
  )
}


export default CommentHolder;