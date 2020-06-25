import React, { useEffect } from "react";
import thunkMiddleware from "redux-thunk";
//import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import "./styles.css";
import { createStore, applyMiddleware } from "redux";
import { makeStyles } from "@material-ui/styles";
import { composeWithDevTools } from "redux-devtools-extension";
import { Footer } from "./components/footer";
import { SideBar } from "./components/side-bar";
import { TopMenu } from "./components/top-menu";
import { MainContent } from "./components/main";
import * as assetActions from "./actions/asset.action";
import { rootReducer } from "./reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

//const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      //loggerMiddleware // neat middleware that logs actions
    )
  )
);
export default function App() {
  const classes = useStyles();
  const { dispatch } = store;
  useEffect(() => {

    dispatch(assetActions.fetchAsset({ uuid: "" }) as any);
  }, []);
  return (
    <Provider store={store}>
      <div className={classes.root}>
        <TopMenu />
        <SideBar />
        <MainContent>
          {/* <Assets></Assets> */}
        </MainContent>
        <Footer />
      </div>
    </Provider>
  );
}
