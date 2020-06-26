import axios, { AxiosInstance } from "axios";

const currentApiVersion = `https://diricodemo1.azurewebsites.net/api/v1/Asset`;

export class API {
  apiAxios: AxiosInstance;
  constructor() {
    this.apiAxios = axios.create({
      baseURL: `${currentApiVersion}`,
      // auth: {
      //   username: "test",
      //   password: "test",
      // },
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // "Content-Type": "application/json",
      },
    });
  }

  async deleteAsset({ uuid }: { uuid: string | null }) {
    return (await this.apiAxios.delete('/DeleteAsset')).data
  }
  async deleteAllAsset() {
    return (await this.apiAxios.delete('/DeleteAllAssets')).data
  }
  async getFolderContents({ uuid }: { uuid: string | null }) {
    return (await this.apiAxios.get(`/GetFolderContents`)).data
  }
  async getAssetMetaData({ uuid }: { uuid: string | null }) {
    return (await this.apiAxios.get(`/GetAssetMetadata`)).data
  }
  async uploadAsset({ uuid }: { uuid: string | null }) {
    return (await this.apiAxios.post(`/UploadAsync`,)).data
  }
}
