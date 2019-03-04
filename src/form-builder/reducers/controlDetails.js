import { cloneDeep } from 'lodash';
const controlDetails = (store = {isControlDropped: false}, action) => {
  switch (action.type) {
    case 'SELECT_CONTROL':
      return Object.assign({}, store, { selectedControl: action.metadata });
    case 'DESELECT_CONTROL':
      return Object.assign({}, store, { selectedControl: undefined });
    case 'FOCUS_CONTROL':
      return Object.assign({}, store, { focusedControl: action.id });
    case 'BLUR_CONTROL':
      return Object.assign({}, store, { focusedControl: undefined });
    case 'SOURCE_CHANGED':
      // eslint-disable-next-line
      store.selectedControl.events = { onValueChange: action.source };
      return cloneDeep(store);
      case 'DRAG_SOURCE' : return Object.assign({}, store, {dragSource: action.dragSource});
      case 'DROP_SUCCESSFUL' : return Object.assign({}, store, {isControlDropped: true});
      case 'DROP_UNSUCESSFUL' : return Object.assign({}, store, {isControlDropped: false});
    default:
      return store;
  }
};

export default controlDetails;
