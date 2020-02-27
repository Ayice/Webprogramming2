import React, { Component } from 'react'

const DashboardTile = props => {
	console.log(props.specialProp)
	return (
		<div>
			<h2> {props.title} </h2>
			<h2>{props.specialProp != [] ? props.specialProp.username : 'dsafdf'}</h2>
			{/* {props.specialProp.length > 0 ? <div>{props.specialProp.length > 0 ? specialProp.map(x => <p key={x.username}>{x.username}</p>) : <h3>You dont have any contacts yet</h3>}</div> : ''} */}
		</div>
	)
}
export default DashboardTile
