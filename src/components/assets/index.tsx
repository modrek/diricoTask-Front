import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch } from "react-redux";
import { Asset } from "./asset/index";
import { ActionTypes } from "../../actions/asset.action";


import { normalize, schema } from "normalizr";
import { IAsset, AssetTypes } from "../../types";
import { parsImageMetadata } from './helper'

const Assets = (props: any) => {
  /// states
  const [assets, setAssets] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [showDetail, setShowDerail] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | Blob | null>(null);
  const [progressUpload, setProgressUpload] = useState("");
  const [selectedFileType, setSelectedFileType] = useState<number>(AssetTypes.Image)
  const [folders, setfolders] = useState([]);



  /// actions
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedFile(null);
    setSelectedFileType(AssetTypes.Image);
    getFolderContent("", false);
  }, []);


  const onFileSelectorHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const onHomeClicked = () => { getFolderContent("", false); }
  const fileUploadHandler = async (event: any) => {
    if (selectedFile == null)
      return;
    const fd = new FormData();
    fd.append("Image", selectedFile as any, (selectedFile as any).name);
    fd.append("assetType", selectedFileType.toString());//selectedFileType
    const response = await axios.post(
      "https://diricodemo1.azurewebsites.net/api/v1/Asset/UploadAsync",
      fd,
      {
        onUploadProgress: (ProgressEvent) => {
          setProgressUpload(
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%"
          );
        },
      }
    );
    setProgressUpload("");
    setSelectedFile("");
    getFolderContent("", false);
  };

  const getFolderContent = async (assetID: string, showDetail: boolean) => {
    ///todo: move to action
    dispatch({
      type: ActionTypes.FETCH_ASSETS_STARTED,
      payload: { uuid: assetID || null },
    });
    ///

    const url = `https://diricodemo1.azurewebsites.net/api/v1/Asset/GetFolderContents?ShowDetail=${showDetail}&${
      assetID && assetID !== "" ? "FolderID=" + assetID : ""
      }`;
    console.log("[URL]", url);
    const data = (await axios.get(url)).data;

    setAssets(data);
    dispatch({
      type: ActionTypes.FETCH_ASSETS_SUCCEED,
      payload: {
        uuid: assetID || null,
        assets: normalize(data, [
          new schema.Entity("assets", {}, { idAttribute: "assetID" }),
        ]).entities.assets,
      },
    });

    if (assetID != "") {
      folders.push(assetID as never);
      console.log(folders);
    }
  };

  const onAssetClickHandler = (Id: string, assetType: number) => {
    if (assetType === 0) {
      getFolderContent(Id, false);
    } else {
      //  alert("Show Asset ");
    }
  };

  const onMetaDataClickHandler = async (Id: string) => {

    setShowDerail(true);
    let url =
      "https://diricodemo1.azurewebsites.net/api/v1/Asset/GetAssetMetadata";
    if (Id !== "") url = url + "?AssetID=" + Id;
    const resData = await axios.get(url);
    alert(parsImageMetadata(resData.data.metadata));

  };



  const onDetailClickHandler = (Id: string) => {
    getFolderContent(Id, true);


  }

  const onSearchInputChange = (event: any) => {
    console.log("Search assets ..." + event.target.value);
    if (event.target.value) {
      setSearchString(event.target.value);
    } else {
      setSearchString("");
    }
    getFolderContent("", false);
  };

  const onHandleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Image")
      setSelectedFileType(AssetTypes.Image);
    else
      setSelectedFileType(AssetTypes.Video);

    
  };


  return (
    <>
      <Typography >
        <Link href="#" onClick={onHomeClicked}>
          Home
  </Link>
      </Typography>
      <FormControl component="fieldset">        
        <RadioGroup
          aria-label="gender"
          name="gender1"
          style={{ flexDirection: "row" }}          
          onChange={onHandleRadioChange}
        >
          <FormControlLabel value="Image" control={<Radio />} label="Image" />
          <FormControlLabel value="Video" control={<Radio />} label="Video" />
        </RadioGroup>
      </FormControl>

      <Typography variant="h6">
        <Button
          variant="outlined"
          component="label"
          onChange={onFileSelectorHandler}
        >
          Select File
          <input type="file" style={{ display: "none" }} />
        </Button>
        <Button
          style={{ display: selectedFile == null ? "none" : "" }}
          variant="outlined"
          component="label"
          onClick={fileUploadHandler}
        >
          Upload File
        </Button>
        <label>{progressUpload}</label>
      </Typography>
      <TextField
        style={{ padding: 24 }}
        id="searchInput"
        placeholder="Search for asset"
        margin="normal"
        onChange={onSearchInputChange}
      />

      <Grid container style={{ padding: 24 }}>
        {assets.map((currentasset, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4} xl={3} style={{ padding: 10 }} >
            <Asset currentAsset={currentasset}
              onAssetclicked={onAssetClickHandler}
              onDetailclicked={onDetailClickHandler}
              onMetaDataclicked={onMetaDataClickHandler}
            />

          </Grid>
        ))}
      </Grid>

    </>
  );
};


export default Assets;
