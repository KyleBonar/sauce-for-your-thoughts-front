import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { AppState } from "../../redux/configureStore";
import { API } from "../../utils/api/API";
import Utils from "../../utils/Utils/Utils";
import PageTitle from "../PageTitle/PageTitle";
import { Button } from "../Button/Button";
import { Link } from "../Link/Link";

import {
  StyledSauceContainer,
  StyledImageHolder,
  StyledSauceContent,
  StyledButtonContainer
} from "./ApproveSubmissionsStyles";

export interface IApproveSubmissionsProps {}

interface SaucesFromAPI {
  SHU: string;
  city: string;
  country: string;
  created: number;
  description: string;
  displayName: string;
  ingredients: string;
  maker: string;
  name: string;
  photo: string;
  sauceID: number;
  slug: string;
  state: string;
  types: string;
  hidden?: boolean;
}

const ApproveSubmissions: React.FC<IApproveSubmissionsProps> = () => {
  // init state
  const [sauces, setSauces] = React.useState<SaucesFromAPI[]>([]);
  const [hasQueried, setHasQueried] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);

  // bind router
  const router = useRouter();

  // grab token
  const token = useSelector((store: AppState) => store.users.self?.token);

  React.useEffect(() => {
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }
    async function getUnapproved() {
      // update state
      setLoading(true);

      // Get sauces
      const res = await API.admin.getUnapproved();
      const sauces: [SaucesFromAPI] = Utils.toCamel(res.data.sauces);

      // update state
      setSauces(sauces);
      setLoading(false);
      setHasQueried(true);
    }

    try {
      if (!loading && sauces.length === 0 && !hasQueried) {
        getUnapproved();
      }
    } catch (err) {
      // login expired
      if (err.response.data.status === 403) {
        // Redirect user to login w/ appropriate return address
        router.replace(`/account/login?return=${router.asPath}`);
        return;
      }

      // bad credentials
      if (err.response.data.status === 400) {
        // Take user home
        router.replace(`/`);
        return;
      }
    }
  });

  return (
    <>
      <PageTitle>Approve Sauces</PageTitle>
      {sauces.filter(sauce => !sauce.hidden).length > 0 ? (
        sauces.map(sauce => {
          return (
            <StyledSauceContainer
              key={sauce.sauceID}
              className={sauce.hidden ? "hidden" : ""}
            >
              <StyledImageHolder>
                {sauce && sauce.photo ? (
                  <img
                    src={`${sauce.photo}`}
                    alt={`${sauce.name} user-uploaded image`}
                  />
                ) : (
                  <img
                    src="https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y_bktfsa.png"
                    alt={"standard sauce image"}
                  />
                )}
              </StyledImageHolder>
              <StyledSauceContent>
                <p>
                  <i>Name: </i>
                  {sauce.name}
                </p>
                <p>
                  <i>Maker: </i>
                  {sauce.maker}
                </p>
                <p>
                  <i>Description: </i>
                  {sauce.description}
                </p>
                <p>
                  <i>Types: </i>
                  {sauce.types}
                </p>
                <p>
                  <i>Ingredients: </i>
                  {sauce.ingredients}
                </p>
                <p>
                  <i>SHU: </i>
                  {sauce.SHU}
                </p>
                <p>
                  <i>Location: </i>
                  {sauce.country + ", " + sauce.state + ", " + sauce.city}
                </p>
                <p>
                  <i>Submitted By: </i>
                  {sauce.displayName}
                </p>
              </StyledSauceContent>
              <StyledButtonContainer>
                <Link href={`/sauce/edit?s=${sauce.slug}`}>
                  <Button>Edit</Button>
                </Link>

                <Button onClick={() => onDeclineClick(sauce.sauceID)}>
                  Decline
                </Button>
                <Button onClick={() => onApproveClick(sauce.sauceID)}>
                  Approve
                </Button>
              </StyledButtonContainer>
            </StyledSauceContainer>
          );
        })
      ) : (
        <StyledSauceContainer style={{ width: "100%" }}>
          <p>No unapproved sauces!</p>
        </StyledSauceContainer>
      )}
    </>
  );

  async function onApproveClick(sauceID: number) {
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }
    const data = { sauce: { sauceID } };
    const res = await API.admin.approveSauce({ data });
    if (res.data.isGood) {
      if (sauces && sauces.length > 0) {
        // update hidden on element
        const _sauces = sauces.map(sauce => {
          if (sauce.sauceID === sauceID) {
            sauce.hidden = true;
          }

          return sauce;
        });
        // remove item from state
        setSauces(_sauces);
      }
    }
  }

  async function onDeclineClick(sauceID: number) {
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      router.replace(`/account/login?return=${router.asPath}`);
      return;
    }
    const data = { sauce: { sauceID } };
    const res = await API.admin.declineSauce({ data });
    if (res.data.isGood) {
      if (sauces && sauces.length > 0) {
        // update hidden on element
        const _sauces = sauces.map(sauce => {
          if (sauce.sauceID === sauceID) {
            sauce.hidden = true;
          }

          return sauce;
        });
        // remove item from state
        setSauces(_sauces);
      }
    }
  }
};

export default ApproveSubmissions;
