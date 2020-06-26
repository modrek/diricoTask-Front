import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "../../Modal/index";
import Button from "@material-ui/core/Button";


type CardProps = {
  currentAsset: any,
  onAssetclicked: (Id: string, assetType: number) => void;
  onMetaDataclicked: (Id: string) => void;
  onDetailclicked: (Id: string) => void;

}

export const Asset = ({ currentAsset, onAssetclicked, onDetailclicked,onMetaDataclicked }: CardProps) => {
  let cardDecription = "to see folder content just click on it!";
  let assetAddress = "/images/folder.png";
  let assetTitle = currentAsset.assetName;
  let detailbutton = null;


  if (currentAsset.assetType !== 0) {
    assetAddress = currentAsset.assetPath;
    assetTitle = "";
    cardDecription = "to see asset just click on it!";

    detailbutton = <>    
    <Button variant="contained" color="secondary" onClick={() => onMetaDataclicked(currentAsset.assetID)}>
    see Meta data
            </Button>
    <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress}/>
      </> 
      
    if   (currentAsset.isOrginalAsset) 
    detailbutton = <>    
    
    <Button variant="contained" color="secondary" onClick={() => onMetaDataclicked(currentAsset.assetID)}>
    see Meta data
            </Button>
    <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress}/>
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
            height="290"
            image={assetAddress}
            title={assetTitle}
            onClick={() => onAssetclicked(currentAsset.assetID, currentAsset.assetType)}

          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {assetTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {cardDecription}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {detailbutton}
        </CardActions>
      </Card>
    </>
  )
};


