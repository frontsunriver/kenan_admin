// import node module libraries
import Link from "next/link";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Image, Dropdown, ListGroup } from "react-bootstrap";
import { useAuth } from "provider/AuthContext";

// simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// import hooks
import useMounted from "hooks/useMounted";
import { useRouter } from "next/router";

const QuickMenu = () => {
  const hasMounted = useMounted();
  const router = useRouter();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const { loggedIn, userInfo, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  const handleGoChangePasswordPage = () => {
    router.push("/changePassword");
  };

  const QuickMenuDesktop = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src="/images/avatar/user-profile-icon.svg"
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
            show
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1">
                  {" "}
                  {userInfo != null ? userInfo.email : ""}
                </h5>
                {/* <Link href="#" className="text-inherit fs-6">View my profile</Link> */}
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleGoChangePasswordPage}>
              <i className="fe fe-settings me-2"></i> Change Password
            </Dropdown.Item>
            {/* <Dropdown.Item eventKey="2">
                        <i className="fe fe-user me-2"></i> Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3">
                        <i className="fe fe-activity me-2"></i> Activity Log
                    </Dropdown.Item>
                    <Dropdown.Item className="text-primary">
                        <i className="fe fe-star me-2"></i> Go Pro
                    </Dropdown.Item>
                    <Dropdown.Item >
                        <i className="fe fe-settings me-2"></i> Account Settings
                    </Dropdown.Item> */}
            <Dropdown.Item onClick={handleSignOut}>
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  const QuickMenuMobile = () => {
    return (
      <ListGroup
        as="ul"
        bsPrefix="navbar-nav"
        className="navbar-right-wrap ms-auto d-flex nav-top-wrap"
      >
        <Dropdown as="li" className="stopevent">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            id="dropdownNotification"
            className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
          >
            <i className="fe fe-bell"></i>
          </Dropdown.Toggle>
        </Dropdown>
        <Dropdown as="li" className="ms-2">
          <Dropdown.Toggle
            as="a"
            bsPrefix=" "
            className="rounded-circle"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-1.jpg"
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dropdown-menu dropdown-menu-end "
            align="end"
            aria-labelledby="dropdownUser"
          >
            <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
              <div className="lh-1 ">
                <h5 className="mb-1"> John E. Grainger</h5>
                <Link href="#" className="text-inherit fs-6">
                  View my profile
                </Link>
              </div>
              <div className=" dropdown-divider mt-3 mb-2"></div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> Edit Profile
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-activity me-2"></i> Activity Log
            </Dropdown.Item>
            <Dropdown.Item className="text-primary">
              <i className="fe fe-star me-2"></i> Go Pro
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i> Account Settings
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-power me-2"></i>Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>
    );
  };

  return (
    <Fragment>
      {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
    </Fragment>
  );
};

export default QuickMenu;
