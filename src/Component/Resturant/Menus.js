import React, { useState } from 'react'
import './style.css'
import Menu from './menuApi'
import MenuCard from './MenuCard'

const uniqueList = [...new Set(Menu.map((curElm) => {
    return curElm.category;
})), "All"];
const Menus = () => {
    const [menuData, setMenuData] = useState(Menu)
    const [menuList, setMenuList] = useState(uniqueList);
    // console.log(menuData);
    const filteredItem = (category) => {
        if (category === "All") {
            setMenuData(Menu);
            return;
        }
        const updatedList = Menu.filter((curElm) => {
            return curElm.category === category;
        });
        setMenuData(updatedList);
    }
    return (
        <>
            <nav className="navbar">
                <div className="btn-group">
                    {
                        menuList.map((curElm) => {
                            return (
                                <button className="btn-group__item" onClick={() => filteredItem(curElm)}>{curElm}</button>
                            )
                        })
                    }
                </div>
            </nav>
            <MenuCard menuData={menuData} />

        </>
    )
}

export default Menus
