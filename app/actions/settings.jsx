import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Get Initial Settings
export const getInitalSettings = createAction(
  ACTION_TYPES.SETTINGS_GET_INITIAL
);

// Save Settings
export const saveSettings = createAction(
  ACTION_TYPES.SETTINGS_SAVE,
  data => data
);
