import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "../../Modal/index";


type CardProps = {
  currentAsset: any,
  onAssetclicked: (Id: string, assetType: number) => void;
  onDetailclicked: (Id: string) => void;

}

export const Asset = ({ currentAsset, onAssetclicked, onDetailclicked }: CardProps) => {
  let cardDecription = "to see folder content just click on it!";
  let assetAddress = "/images/folder.png";
  let assetTitle = currentAsset.assetName;
  let detailbutton = null;


  if (currentAsset.assetType != 0) {
    assetAddress = currentAsset.assetPath;
    assetTitle = "";
    cardDecription = "to see asset just click on it!";
    //<Button size="small" color="primary" onClick={() => onDetailclicked(currentAsset.assetID)}>
    //  see Meta data
    //  </Button>
    detailbutton = <>    
      <Modal caption="see Meta data" alt={currentAsset.assetName} path={assetAddress}/>
      <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress}/>
      </> 
      console.log("currentAsset.isOrginalAsset",currentAsset.isOrginalAsset);
    // if   (currentAsset.isOrginalAsset) 
    // detailbutton = <>    
    // <Modal caption="see Meta data" alt={currentAsset.assetName} path={assetAddress}/>
    // <Modal caption="Show asset" alt={currentAsset.assetName} path={assetAddress}/>
    // <Modal caption="Show Detail" alt={currentAsset.assetName} path={assetAddress}/>
    // </> 
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


