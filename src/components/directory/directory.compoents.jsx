import CategoryItem from "../category-item/catelogy-item.component";
import './direcetoty.styles.scss'

const Directory = ({categories}) => {
    return <div className='directory-container'>
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
        ))}
    </div>
}

export default  Directory