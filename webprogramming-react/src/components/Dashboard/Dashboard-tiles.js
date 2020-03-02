import React from 'react'
import './Dashboard.css'

const DashboardTile = props => {
	return (
		<div className='dashboard-tile'>
			<h2 className='tile-title'> {props.title} </h2>
		</div>
	)
}
export default DashboardTile
