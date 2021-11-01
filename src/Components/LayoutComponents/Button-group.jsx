import React from 'react'

function ButtonGroup({ next, previous }) {
    return (
        <div className="buttons_group_container">
            <span onClick={previous} aria-label="Previous" className="button_group">
            <i className='bx bx-chevron-left slider_arrow' ></i>
            </span>
            <span onClick={next} aria-label="Next" className="button_group">
            <i className='bx bx-chevron-right slider_arrow' ></i>
            </span>
        </div>
    )
}

export default ButtonGroup
