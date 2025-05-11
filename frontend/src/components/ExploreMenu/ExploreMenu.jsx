import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

// destructuring category
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and sulinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    // onclick checking if previous state is equal to item.menu_name set to All else set to item.menu_item
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        {/* creating dynamic active class for each item on onclick  */}
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
      
    </div>
  )
}

export default ExploreMenu
