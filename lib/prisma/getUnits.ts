export async function getUnits() {
	const res = await fetch(`${process.env.BASE_URL}/api/getUnits`)

	if (!res.ok) {
		console.log(res)
		throw new Error('Failed to fetch')
	}

	const data = await res.json()
	console.log('DATA', data)

	return data
}
