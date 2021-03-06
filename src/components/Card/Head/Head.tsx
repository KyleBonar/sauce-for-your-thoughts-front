import * as React from "react";

import { StyledLink, StyledImage } from "./HeadStyle";

export interface IHeadProps {
  showLink?: boolean;
  imageLink: string;
  to?: string;
  description?: string;
}

const Head: React.FC<IHeadProps> = props => {
  const { showLink, imageLink, description, to } = props;

  if (!showLink || !to) return image();

  return <StyledLink href={to}>{image()}</StyledLink>;

  function image() {
    return (
      <StyledImage
        src={imageLink}
        alt={description}
        onError={e => {
          const elem = e.target as HTMLImageElement;
          elem.src =
            "https://res.cloudinary.com/foryourthoughts/image/upload/v1575869743/sauces/ra1o7bsr9v2eurosoo5y_bktfsa.png";
        }}
      />
    );
  }
};

export default Head;
