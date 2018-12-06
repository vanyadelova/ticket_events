const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';

export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_CUSTOMERS:
        return payload.reduce((customers, customer) => {
            customers[customer.user_id] = customer
            return customers
        }, {});
    default:
      return state;
  }
}