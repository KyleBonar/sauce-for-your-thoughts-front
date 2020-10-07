import * as React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/configureStore";
import LoggedInBar from "./components/LoggedInBar/LoggedInBar";
import LoggedOutBar from "./components/LoggedOutBar/LoggedOutBar";
import { StyledDiv } from "./TopBarStyle";

const TopBar: React.FC = () => {
  const { self } = useSelector((state: AppState) => {
    return state.users;
  });
  const { token } = self;

  return (
    <header>
      <StyledDiv>{token ? <LoggedInBar /> : <LoggedOutBar />}</StyledDiv>
    </header>
  );
};

export default TopBar;
