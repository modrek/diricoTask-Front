import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { connect, useDispatch } from "react-redux";
import {ActionTypes} from "../../actions/asset.action"
import { Asset } from './asset/index';
import Modal from "../Modal/index";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});


class Assets extends Component {

  state = {
    assets: [],
    searchString: "",
    showDetail: false,
    selectedFile: Blob,
    selectedFileType: "Image",
    progressupload: "",
    metaData: {}
  }
  componentDidMount() {
    this.setState({ selectedFile: null });
    this.getFolderContent("");
  };

  // const [selectedValue, setSelectedValue] = React.useState('a');
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);

  onFileSelectorHandler = (event: any) => {
    this.setState({ selectedFile: event.target.files[0] })
  };

  fileUploadHandler = (event: any) => {
    console.log("start fileupload ");
    const fd = new FormData();
    fd.append('Image', this.state.selectedFile as any, this.state.selectedFile.name);
    //fd.append('number',this.state.selectedFileType as any,'assetType');
    axios.post("https://diricodemo1.azurewebsites.net/api/v1/Asset/UploadAsync", fd, {
      onUploadProgress: ProgressEvent => {
        this.setState({ progressupload: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%" })
      }
    })
      .then(Response => { this.setState({ progressupload: "", selectedFile: null }) })
      .catch(er => { console.log("[Error]", er) });
    console.log("finish fileupload");
  }

  getFolderContent = (assetID: string) => {
    //this.props.onStartFetchAsset(assetID);
     
    let url = "https://diricodemo1.azurewebsites.net/api/v1/Asset/GetFolderContents";
    if (assetID != "")
      url = url + "?FolderID=" + assetID;
    
    axios.get(url)
      .then(response => {
        console.log("Data", response.data);
        this.setState({ assets: response.data })
      }).catch(error => {
        console.log("Error", error);
      });

  };


  onAssetClickHandler = (Id: string, assetType: number) => {
    if (assetType == 0) {
      this.getFolderContent(Id);
    }
    else {
       //  alert("Show Asset ");
    }
  }

  onDetailClickHandler = (Id: string) => {
    this.setState({ showDetail: true })
    let url = "https://diricodemo1.azurewebsites.net/api/v1/Asset/GetAssetMetadata"
    //let url = "http://localhost:52115/api/v1/Asset/GetAssetMetadata"
    if (Id != "")
      url = url + "?AssetID=" + Id;
    axios.get(url)
      .then(response => {
        console.log("Data", response.data);

        // this.setState({ metaData: response.data })
      }).catch(error => {
        console.log("Error", error);
      });

  }

  onSearchInputChange = (event: any) => {
    console.log("Search assets ..." + event.target.value)
    if (event.target.value) {
      this.setState({ searchString: event.target.value })
    } else {
      this.setState({ searchString: '' })
    }
    this.getFolderContent("")
  }

  onHandleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedFileType: (event.target as HTMLInputElement).value })
    //setValue((event.target as HTMLInputElement).value);
  };

  render() {

    let detaildiv = null;
    if (this.state.showDetail)
      detaildiv = (
        <div id="myModal" className="modal" >
          <div className="modal-content">
            <span className="close">&times;</span>
            {/* <p>{this.state.metaData}</p> */}
          </div>
        </div>
      );
    // const classes = useStyles();
    return (
      <>
       
        <FormControl component="fieldset">
          <FormLabel component="legend">Asset Type</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" style={{flexDirection:"row"}} value={this.state.selectedFileType} onChange={this.onHandleRadioChange}>
            <FormControlLabel value="Image" control={<Radio />} label="Image" />
            <FormControlLabel value="Video" control={<Radio />} label="Video" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h6">
          <Button
            variant="outlined"
            component="label"
            onChange={this.onFileSelectorHandler}
          >
            Select File
         <input
              type="file"
              style={{ display: "none" }}
            />
          </Button>
          <Button
            style={{ display: this.state.selectedFile == null ? "none" : "" }}
            variant="outlined"
            component="label"
            onClick={this.fileUploadHandler}
          >
            Upload File
          </Button>
          <label>{this.state.progressupload}</label>
          
        </Typography>
        <TextField style={{ padding: 24 }}
            id="searchInput"
            placeholder="Search for asset"
            margin="normal"
            onChange={this.onSearchInputChange}
          />

        <Grid container style={{ padding: 24 }}>

          {this.state.assets.map(currentasset => (
            
            <Grid item xs={12} sm={6} lg={4} xl={3} style={{padding:10}} >

              <Asset currentAsset={currentasset} onAssetclicked={this.onAssetClickHandler} onDetailclicked={this.onDetailClickHandler} />

            </Grid>
          ))}
        </Grid>
        {detaildiv}

      </>
    );

  }

};

const mapStateToProps = (state: any)  => {
  return {
      assets: state.assets,
      searchString: state.searchString,
      showDetail: state.showDetail,
      selectedFile: state.selectedFile,
      selectedFileType: state.selectedFileType,//"Image",
      progressupload: state.progressupload,
      metaData: state.metaData
  };
}
const mapDispatchToProps = (dispatch: any) => {

  return {
      onStartFetchAsset: ({ uuid }: { uuid: string } ) => dispatch({ type: ActionTypes.FETCH_ASSETS_STARTED, uuid: uuid }),
      onStartFetchSucceed: ({ uuid }: { uuid: string }) => dispatch({ type: ActionTypes.FETCH_ASSETS_SUCCEED, uuid:uuid }),
      onStartFetchFailed: ({ uuid }: { uuid: string }) => dispatch({ type: ActionTypes.FETCH_ASSETS_FAILED, uuid:uuid })

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Assets);
//export default Assets;

