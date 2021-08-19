const getters = {
  ALLMONEY(state){
    return state.cartlist.reduce((preValue, item) => {
      return preValue + item.price * item.count
    }, 0).toFixed(2) 
  }
}

export default getters