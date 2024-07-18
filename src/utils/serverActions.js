// "use server"

export const fetchFakeStore = async () => {
    const resp = await fetch('https://fakestoreapi.com/products')
    console.log('resp', await resp.json())
    console.log('haha')
  }