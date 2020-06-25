import { combineReducers } from "redux";
import { assetReducer } from "./assets.reducer";

export const rootReducer = combineReducers({
  folders: assetReducer,
});
