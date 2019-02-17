import * as React from "react";

import { Button } from "../../../../components/Button/Button";
import {
  HeroContainer,
  HeroImage,
  HeroBody,
  HeroTitle,
  StyledDiv,
  StyledDropDown,
  StyledInput,
  StyledLink
} from "./LandingImageStyle";

export interface LandingImageProps {
  className?: string;
}

export interface LandingImageState {
  search: {
    value: string;
  };
  filter: {
    all: string[];
    selectedValue: string;
  };
}

class LandingImage extends React.Component<
  LandingImageProps,
  LandingImageState
> {
  constructor(props: LandingImageProps) {
    super(props);

    this.state = {
      search: { value: "" },
      filter: { all: ["All", "Hot Sauce", "Meat Sauce"], selectedValue: "all" }
    };
  }

  public render() {
    return (
      <HeroContainer className={this.props.className}>
        <HeroImage />
        <HeroBody>
          <HeroTitle>Find your perfect sauce</HeroTitle>
          <StyledDiv>
            <StyledDropDown
              options={this.state.filter.all}
              selectedValue={this.state.filter.selectedValue}
              onSelect={this.onSelect}
            />
            <StyledInput
              type="text"
              id="Hero__Search"
              name="Hero__Search"
              onChange={this.onTextChange}
              value={this.state.search.value}
              placeholder="Search..."
            />
            <StyledLink to="#">
              <Button onClick={() => {}}>Search</Button>
            </StyledLink>
          </StyledDiv>
        </HeroBody>
      </HeroContainer>
    );
  }

  private onSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (!event || !event.target || !event.target.value) {
      return;
    }

    // Grab the value
    const selectedValue: string = event.target.value;

    // Update local state
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        selectedValue
      }
    });
  };

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target || !event.target.value) {
      return;
    }

    // Grab the value
    const value: string = event.target.value;

    // Update local state
    this.setState({
      ...this.state,
      search: {
        value
      }
    });
  };
}

export default LandingImage;
