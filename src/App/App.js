import {ActivityPanels} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import PropTypes from 'prop-types';
import Changeable from '@enact/ui/Changeable';

import Detail from '../views/Detail';
import List from '../views/List';
import axios from "axios";

let kittens = [
	' ',
	' ',
	' ',
	' ',
	' ',
	' '];

let ids=[];

axios.request({
	url: 'http://app.nettv.com.np/api/v3/users/channel-categories?with=channels',
	method: 'get',
	headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJlYmFzZSI6ImNzc2RtTlNGNXlxWW86QVBBOTFiRlgwOU9vVlFHRjAyZ1NFTUhsZU9WWUVNZXpVVFpXSUd3OHp6NnA2b0hnMG54c1k0OWNpZDlNTSIsInN1YiI6NjQ0NTYzLCJpc3MiOiJodHRwczovL2FwcC5uZXR0di5jb20ubnAvYXBpL3YzL2xvZ2luIiwiaWF0IjoxNTQ4MzA4NTA3LCJleHAiOjE3MzE2MzA4NTA3LCJuYmYiOjE1NDgzMDg1MDcsImp0aSI6IlVESXpjbzQ0ekxJQzg3QXAifQ.QRqOU2e-l6s92qTCkRp2SdXVJJ3HEdEANOtqaUvrhAE'}
})
.then(res => {
	let arr = [];
	let arr1=[];
	for(let i=0; i<6; i++){
		arr.push(res.data[0].channels[i].channel_name);
		arr1.push(res.data[0].channels[i].channel_id);
	}
	setTimeout(function(){
		kittens = arr;
		ids = arr1;
		console.log(arr1);
	},600)
});

// setTimeout(function(){
//     axios.request({
//         url: 'http://app.nettv.com.np/api/v3/channels',
//         method: 'get',
//         headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJlYmFzZSI6ImNzc2RtTlNGNXlxWW86QVBBOTFiRlgwOU9vVlFHRjAyZ1NFTUhsZU9WWUVNZXpVVFpXSUd3OHp6NnA2b0hnMG54c1k0OWNpZDlNTSIsInN1YiI6NjQ0NTYzLCJpc3MiOiJodHRwczovL2FwcC5uZXR0di5jb20ubnAvYXBpL3YzL2xvZ2luIiwiaWF0IjoxNTQ4MzA4NTA3LCJleHAiOjE3MzE2MzA4NTA3LCJuYmYiOjE1NDgzMDg1MDcsImp0aSI6IlVESXpjbzQ0ekxJQzg3QXAifQ.QRqOU2e-l6s92qTCkRp2SdXVJJ3HEdEANOtqaUvrhAE'}
//     })
//         .then(res => {
//             let chLink = [];
//             for(let i=0; i<6; i++){
//                 arr.push(res.data[0].channels[i].channel_name);
//                 arr1.push(res.data[0].channels[i].channel_id);
//             }
//             setTimeout(function(){
//                 kittens = arr;
//                 ids = arr1;
//                 console.log(arr1);
//             },600)
//         });
// },605)

const AppBase = kind({
	name: 'App',

	propTypes: {
		index: PropTypes.number,
		kitten: PropTypes.number,
		onNavigate: PropTypes.func,
		onSelectKitten: PropTypes.func
	},

	defaultProps: {
		index: 0,
		kitten: 0
	},

	handlers: {
		onSelectKitten: (ev, {onNavigate, onSelectKitten}) => {
			if (onSelectKitten) {
				onSelectKitten({
					kitten: ev.index
				});
			}

			// navigate to the detail panel on selection
			if (onNavigate) {
				onNavigate({
					index: 1
				});
			}
		}
	},

	render: ({index, kitten, onNavigate, onSelectKitten, ...rest}) => (
		<ActivityPanels {...rest} index={index} onSelectBreadcrumb={onNavigate}>
			<List onSelectKitten={onSelectKitten}>{kittens}</List>
			<Detail name={kittens[kitten]} id={ids[kitten]}/>
		</ActivityPanels>
	)
});

const App = Changeable({prop: 'index', change: 'onNavigate'},
	Changeable({prop: 'kitten', change: 'onSelectKitten'},
		MoonstoneDecorator(AppBase)
	)
);
export default App;
export {App, AppBase};