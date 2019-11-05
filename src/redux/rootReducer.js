export default (state = {}, { type, payload }) => {
    switch (type) {
      case 'SET_USER':
        return { ...state, username: payload };
      case 'CLEAR_USER':
        return {};
      default:
        return state;
    }
  };