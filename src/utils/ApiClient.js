import axios from "axios"

export const getProducts = (searchItem, limit) => {
	return Promise.resolve(
		axios.get(
			`http://stageapi.monkcommerce.app/task/products/search?search=${searchItem}&page=2&limit=${limit}`, {
				headers: {
					'x-api-key': '72njgfa948d9aS7gs5'
				}
			}
		)
	)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log('Error in getProductsApi call', error)
		})
}