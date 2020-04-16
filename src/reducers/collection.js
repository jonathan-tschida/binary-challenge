export const collection = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_COLLECTED':
      const alreadyCollected = state.includes(action.id);
      const updatedState = alreadyCollected ?
        state.filter(id => id !== action.id) :
        [...state, action.id];
      return updatedState.sort();
    default:
      return state
  }
}
