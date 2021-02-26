import './CategoryHolder.css'
import { Link } from 'react-router-dom'

const CategoryHolder = ({ category }) => {
  
  return (
    <Link className='categoryHolder' to={`/category/${category.id}`}>
        { category.name }
    </Link>
  )
}

export default CategoryHolder;