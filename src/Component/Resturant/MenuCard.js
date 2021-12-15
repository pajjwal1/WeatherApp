import React from 'react'

const MenuCard = ({ menuData }) => {
    console.log(menuData);
    return (
        <>
            <section className="main-card--cointainer">
                {
                    menuData.map((curElm) => {
                        return (
                            <>
                                <div className="card-container" key="curElm.id">
                                    <div className="card">
                                        <div className="card-body">
                                            <span className="card-number card-circle subtle">{curElm.id}</span>
                                            <span className="card-author subtle">{curElm.name}</span>
                                            <h2 className="card-title">{curElm.name}</h2>
                                            <span className="card-description subtle">{curElm.description}</span>
                                            <div className="card-read">Read</div>
                                        </div>
                                        <img src={curElm.image} alt="images" className="card-media" />
                                        <span className="card-tag subtle">Order Now</span>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </section>
        </>
    )
}

export default MenuCard
