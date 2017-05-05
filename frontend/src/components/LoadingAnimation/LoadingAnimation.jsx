import React from 'react'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './loadingAnimation.css'

module.exports = (({isLoading}) => (
  <ReactCSSTransitionGroup
    transitionName="loading_gif"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}>
    {isLoading ? (<img className={`loading-gif`} src="http://bestanimations.com/Science/Gears/loadinggears/loading-gear.gif"/>) : null}
  </ReactCSSTransitionGroup>  
  )
)
