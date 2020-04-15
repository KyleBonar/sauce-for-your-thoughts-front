import * as React from "react";
import Link from "next/link";
import styled from "../../theme/styled-components";

interface LinkProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | Element | JSX.Element>;
  to?: string;
  href?: string;
  className?: string;
}

const LinkComponent: React.FC<LinkProps> = props => {
  return (
    <Link href={props.to || props.href || "#"}>
      <a className={props.className}> {props.children}</a>
    </Link>
  );
};

const StyledLink = styled(LinkComponent)`
  text-decoration: none;
  font-family: FuturaMedium;
  color: ${props => props.theme.primaryThemeColor};

  &:hover,
  &:focus {
    color: ${props => props.theme.secondaryThemeColor};
  }
`;

export { StyledLink as Link };
