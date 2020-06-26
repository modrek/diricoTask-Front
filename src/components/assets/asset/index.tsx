import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "../../modal/index";
import Button from "@material-ui/core/Button";
import "./style.css";


type CardProps = {
  currentAsset: any,
  onAssetclicked: (Id: string, assetType: number) => void;
  onMetaDataclicked: (Id: string) => void;
  onDetailclicked: (Id: string) => void;

}

export const Asset = ({ currentAsset, onAssetclicked, onDetailclicked, onMetaDataclicked }: CardProps) => {
  let cardDecription = "";
  let thumbnail = "/images/folder.png";
  let assetAddress = "/images/folder.png"; // for folder
  let assetTitle = currentAsset.assetName;
  let detailbutton = null;


  if (currentAsset.assetType !== 0) {
    if (currentAsset.assetType == 1)  // if image
      thumbnail = currentAsset.assetPath;
    else
      thumbnail = "/images/video.png";  // for video


    assetAddress = currentAsset.assetPath;
    assetTitle = "";


    detailbutton = <>
      <Button variant="contained" color="secondary" onClick={() => onMetaDataclicked(currentAsset.assetID)}>
        see Meta data
            </Button>
      <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress} assetType={currentAsset.assetType} />
    </>

    if (currentAsset.isOrginalAsset)
      detailbutton = <>

        <Button variant="contained" color="secondary" onClick={() => onMetaDataclicked(currentAsset.assetID)}>
          see Meta data
            </Button>
        <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress} assetType={currentAsset.assetType} />
        <Button variant="contained" color="secondary" onClick={() => onDetailclicked(currentAsset.assetID)}>
          Show Detail
            </Button>

      </>
  }



  return (
    <>
      <Card >

        <CardActionArea>
          <CardMedia
            component="img"
            alt={currentAsset.assetName}

            image={thumbnail}
            title={assetTitle}
            onClick={() => onAssetclicked(currentAsset.assetID, currentAsset.assetType)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {assetTitle}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              {cardDecription}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {detailbutton}
        </CardActions>
      </Card>
    </>
  )
};


