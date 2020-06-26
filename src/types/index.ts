import { UI_METADATA } from "../constants";
export interface IAsset {
  [UI_METADATA]: IMetadata;
  AssetID: string;
  AssetName: string;
  AssetType: number;
  AssetPath: string;
  isOrginalAsset: boolean;
}

export interface IFolder {
  [UI_METADATA]: IMetadata;
  FolderId: string;
  FolderName: string;
}

export interface IMetadata {
  isLoading?: boolean;
  isSucceed?: boolean;
  error?: string | null;
}
export const AssetTypes = {
  Folder: 0,
  Image: 1,
  Video: 2
};