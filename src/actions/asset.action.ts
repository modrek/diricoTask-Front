import { Dispatch } from "redux";
import { API } from "../utils/API";
import { IAsset } from "../types";

const api = new API();

export enum ActionTypes {
  FETCH_ASSETS_STARTED = "FETCH_ASSETS_STARTED",
  FETCH_ASSETS_SUCCEED = "FETCH_ASSETS_SUCCEED",
  FETCH_ASSETS_FAILED = "FETCH_ASSETS_FAILED",
}

export const fetchAsset = ({ uuid }: { uuid: string }) => async (
  dispatch: Dispatch
) => {
  dispatch(fetchAssetStarted({ uuid }));
  try {
    const data = await api.getFolderContents({ uuid });
    /// todo: change this code with using the normalizr
    const assets = {} as any;
    data.foreach((m: IAsset) => (assets[m.AssetID] = m));
    dispatch(fetchAssetSucceed({ uuid, assets }));
  } catch (error) {
    dispatch(fetchAssetFailed({ uuid, error }));
  }
};

export const fetchAssetStarted = ({ uuid }: { uuid: string }) => ({
  type: ActionTypes.FETCH_ASSETS_SUCCEED,
  payload: {
    uuid,
  },
});

export const fetchAssetSucceed = ({
  uuid,
  assets,
}: {
  uuid: string;
  assets: { [key: string]: IAsset };
}) => ({
  type: ActionTypes.FETCH_ASSETS_SUCCEED,
  payload: {
    uuid,
    assets,
  },
});

export const fetchAssetFailed = ({
  uuid,
  error,
}: {
  uuid: string;
  error: string;
}) => ({
  type: ActionTypes.FETCH_ASSETS_FAILED,
  payload: {
    uuid,
    error,
  },
});
