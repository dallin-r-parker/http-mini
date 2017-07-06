import axios from 'axios'

export function getTroops(){
	return axios.get('http://192.168.2.119:3005/defenses')
		.then(res => res.data)
}

export function addTroop(name){
	return axios.post('http://192.168.2.119:3005/defenses', {recruit: name})
	//return axios({
	//	url: 'http://192.168.2.119:3005/defenses',
	//	method: 'POST',
	//	data: name
	//})
}