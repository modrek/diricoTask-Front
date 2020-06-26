import { UI_METADATA } from "../constants";
import * as actions from "../actions/asset.action";
import { IAsset, IMetadata } from "../types/";

const { ActionTypes } = actions;
const defaultState: {
  [UI_METADATA]: IMetadata;
  [key: string]: IAsset;
} = {
  [UI_METADATA]: {
    isLoading: false,
    isSucceed: false,
    error: undefined,
  },
};
export const assetReducer = (
  state = defaultState,
  action:
    | ReturnType<typeof actions.fetchAssetStarted>
    | ReturnType<typeof actions.fetchAssetFailed>
    | ReturnType<typeof actions.fetchAssetSucceed>
): typeof defaultState => {
  switch (action.type) {
    case ActionTypes.FETCH_ASSETS_STARTED:
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          [UI_METADATA]: {
            isSucceed: false,
            isLoading: true,
            error: null,
          },
        },
      };
    case ActionTypes.FETCH_ASSETS_SUCCEED:

      return {
        ...state,
        ...(action.payload as any).assets,
        [UI_METADATA]: {
          isLoading: false,
          isSucceed: true,
          error: null,
        },
      };
    case ActionTypes.FETCH_ASSETS_FAILED:
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          [UI_METADATA]: {
            isSucceed: false,
            isLoading: false,
            error: (action.payload as any).error,
          },
        },
      };
    default:
      return state;
  }
};
