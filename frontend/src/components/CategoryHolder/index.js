import './CategoryHolder.css'

const CategoryHolder = ({ category }) => {
  
  return (
    <div className='categoryHolder'>
        { category.name }
    </div>
  )
}

export default CategoryHolder;