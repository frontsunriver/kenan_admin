// import node module libraries
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import {
  ListGroup,
  Accordion,
  Card,
  Image,
  Badge,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { v4 as uuid } from "uuid";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const NavbarVertical = (props) => {
  const [dashboardMenu, setDashboardMenu] = useState([]);
  const location = useRouter();
  const HomeArray = [
    {
      id: uuid(),
      title: "Home",
      icon: "home",
      link: "/",
    },
    {
      id: uuid(),
      title: "Dashboard",
      icon: "activity",
      link: "/dashboard",
    },
  ];
  const MenuArray = [
    {
      id: uuid(),
      title: "Group Users",
      icon: "users",
      link: "/group_user",
    },
    {
      id: uuid(),
      title: "Ports",
      icon: "shield",
      link: "/port",
    },
    {
      id: uuid(),
      title: "User Ports",
      icon: "command",
      link: "/user_port",
    },
    {
      id: uuid(),
      title: "VM Images",
      icon: "layers",
      link: "/vm_images",
    },
    {
      id: uuid(),
      title: "User VM Images",
      icon: "command",
      link: "/user_vm",
    },
    {
      id: uuid(),
      title: "Groups",
      icon: "server",
      link: "/group",
    },
    {
      id: uuid(),
      title: "Users",
      icon: "user",
      link: "/user",
    },
    {
      id: uuid(),
      title: "User Machines",
      icon: "cpu",
      link: "/machine",
    },
    {
      id: uuid(),
      title: "User Connections",
      icon: "radio",
      link: "/user_conns",
    },
    {
      id: uuid(),
      title: "User Sessions",
      icon: "book-open",
      link: "/user_session",
    },
    {
      id: uuid(),
      title: "Administrators",
      icon: "award",
      link: "/adminuser",
    },
    {
      id: uuid(),
      title: "Configuration",
      icon: "settings",
      link: "/session",
    },
    {
      id: uuid(),
      title: "Logs",
      icon: "calendar",
      link: "/logs",
    },
  ];

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    let userData = null;
    const cookie = cookies.find((row) =>
      row.startsWith("X-Local-Storage-Data=")
    );
    if (cookie && cookie != "") {
      userData = cookie.split("=")[1];
    }
    if (userData != "''" && userData != null) {
      const userInfo = JSON.parse(userData);
      const roleArray = userInfo["roles"];
      const roleUrls = new Set(roleArray.map((role) => role.url));
      const menuArray = MenuArray.filter((item) => roleUrls.has(item.link));
      const combineArray = [...HomeArray, ...menuArray];
      setDashboardMenu(combineArray);
    } else {
    }
  }, []);

  const CustomToggle = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <li className="nav-item">
        <Link
          href="#"
          className="nav-link "
          onClick={decoratedOnClick}
          data-bs-toggle="collapse"
          data-bs-target="#navDashboard"
          aria-expanded={isCurrentEventKey ? true : false}
          aria-controls="navDashboard"
        >
          {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ""}{" "}
          {children}
        </Link>
      </li>
    );
  };
  const CustomToggleLevel2 = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <Link
        href="#"
        className="nav-link "
        onClick={decoratedOnClick}
        data-bs-toggle="collapse"
        data-bs-target="#navDashboard"
        aria-expanded={isCurrentEventKey ? true : false}
        aria-controls="navDashboard"
      >
        {children}
      </Link>
    );
  };
  const generateLink = (item) => {
    return (
      <Link
        href={item.link}
        className={`nav-link ${
          location.pathname === item.link ? "active" : ""
        }`}
        onClick={(e) =>
          isMobile ? props.onClick(!props.showMenu) : props.showMenu
        }
      >
        {item.name}
        {""}
        {item.badge ? (
          <Badge
            className="ms-1"
            bg={item.badgecolor ? item.badgecolor : "primary"}
          >
            {item.badge}
          </Badge>
        ) : (
          ""
        )}
      </Link>
    );
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Fragment>
      <SimpleBar
        style={{
          maxHeight: "100vh",
          background: "#f1f5f9",
          padding: "0px 20px",
        }}
      >
        <div className="nav-scroller">
          <Link
            href="/"
            className="navbar-brand"
            style={{ padding: "0.5rem 1rem 1rem" }}
          >
            <svg
              version="1.2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 256"
              width="150"
              height="80"
            >
              <title>logo</title>
              <defs>
                <image
                  width="570"
                  height="211"
                  id="img1"
                  href="data:image/png;base64,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"
                />
              </defs>
              <style></style>
              <use id="Background" href="#img1" x="14" y="22" />
            </svg>
          </Link>
        </div>
        <Accordion
          defaultActiveKey="0"
          as="ul"
          className="navbar-nav flex-column"
        >
          {dashboardMenu.map(function (menu, index) {
            if (menu.grouptitle) {
              return (
                <Card bsPrefix="nav-item" key={index}>
                  {/* group title item */}
                  <div className="navbar-heading">{menu.title}</div>
                  {/* end of group title item */}
                </Card>
              );
            } else {
              if (menu.children) {
                return (
                  <Fragment key={index}>
                    {/* main menu / root menu level / root items */}
                    <CustomToggle eventKey={index} icon={menu.icon}>
                      {menu.title}
                      {menu.badge ? (
                        <Badge
                          className="ms-1"
                          bg={menu.badgecolor ? menu.badgecolor : "primary"}
                        >
                          {menu.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </CustomToggle>
                    <Accordion.Collapse
                      eventKey={index}
                      as="li"
                      bsPrefix="nav-item"
                    >
                      <ListGroup
                        as="ul"
                        bsPrefix=""
                        className="nav flex-column"
                      >
                        {menu.children.map(function (
                          menuLevel1Item,
                          menuLevel1Index
                        ) {
                          if (menuLevel1Item.children) {
                            return (
                              <ListGroup.Item
                                as="li"
                                bsPrefix="nav-item"
                                key={menuLevel1Index}
                              >
                                {/* first level menu started  */}
                                <Accordion
                                  defaultActiveKey="0"
                                  className="navbar-nav flex-column"
                                >
                                  <CustomToggleLevel2 eventKey={0}>
                                    {menuLevel1Item.title}
                                    {menuLevel1Item.badge ? (
                                      <Badge
                                        className="ms-1"
                                        bg={
                                          menuLevel1Item.badgecolor
                                            ? menuLevel1Item.badgecolor
                                            : "primary"
                                        }
                                      >
                                        {menuLevel1Item.badge}
                                      </Badge>
                                    ) : (
                                      ""
                                    )}
                                  </CustomToggleLevel2>
                                  <Accordion.Collapse
                                    eventKey={0}
                                    bsPrefix="nav-item"
                                  >
                                    <ListGroup
                                      as="ul"
                                      bsPrefix=""
                                      className="nav flex-column"
                                    >
                                      {/* second level menu started  */}
                                      {menuLevel1Item.children.map(function (
                                        menuLevel2Item,
                                        menuLevel2Index
                                      ) {
                                        if (menuLevel2Item.children) {
                                          return (
                                            <ListGroup.Item
                                              as="li"
                                              bsPrefix="nav-item"
                                              key={menuLevel2Index}
                                            >
                                              {/* second level accordion menu started  */}
                                              <Accordion
                                                defaultActiveKey="0"
                                                className="navbar-nav flex-column"
                                              >
                                                <CustomToggleLevel2
                                                  eventKey={0}
                                                >
                                                  {menuLevel2Item.title}
                                                  {menuLevel2Item.badge ? (
                                                    <Badge
                                                      className="ms-1"
                                                      bg={
                                                        menuLevel2Item.badgecolor
                                                          ? menuLevel2Item.badgecolor
                                                          : "primary"
                                                      }
                                                    >
                                                      {menuLevel2Item.badge}
                                                    </Badge>
                                                  ) : (
                                                    ""
                                                  )}
                                                </CustomToggleLevel2>
                                                <Accordion.Collapse
                                                  eventKey={0}
                                                  bsPrefix="nav-item"
                                                >
                                                  <ListGroup
                                                    as="ul"
                                                    bsPrefix=""
                                                    className="nav flex-column"
                                                  >
                                                    {/* third level menu started  */}
                                                    {menuLevel2Item.children.map(
                                                      function (
                                                        menuLevel3Item,
                                                        menuLevel3Index
                                                      ) {
                                                        return (
                                                          <ListGroup.Item
                                                            key={
                                                              menuLevel3Index
                                                            }
                                                            as="li"
                                                            bsPrefix="nav-item"
                                                          >
                                                            {generateLink(
                                                              menuLevel3Item
                                                            )}
                                                          </ListGroup.Item>
                                                        );
                                                      }
                                                    )}
                                                    {/* end of third level menu  */}
                                                  </ListGroup>
                                                </Accordion.Collapse>
                                              </Accordion>
                                              {/* end of second level accordion */}
                                            </ListGroup.Item>
                                          );
                                        } else {
                                          return (
                                            <ListGroup.Item
                                              key={menuLevel2Index}
                                              as="li"
                                              bsPrefix="nav-item"
                                            >
                                              {generateLink(menuLevel2Item)}
                                            </ListGroup.Item>
                                          );
                                        }
                                      })}
                                      {/* end of second level menu  */}
                                    </ListGroup>
                                  </Accordion.Collapse>
                                </Accordion>
                                {/* end of first level menu */}
                              </ListGroup.Item>
                            );
                          } else {
                            return (
                              <ListGroup.Item
                                as="li"
                                bsPrefix="nav-item"
                                key={menuLevel1Index}
                              >
                                {/* first level menu items */}
                                {generateLink(menuLevel1Item)}
                                {/* end of first level menu items */}
                              </ListGroup.Item>
                            );
                          }
                        })}
                      </ListGroup>
                    </Accordion.Collapse>
                    {/* end of main menu / menu level 1 / root items */}
                  </Fragment>
                );
              } else {
                return (
                  <Card bsPrefix="nav-item" key={index}>
                    {/* menu item without any childern items like Documentation and Changelog items*/}
                    <Link
                      href={menu.link}
                      className={`nav-link ${
                        location.pathname === menu.link ? "active" : ""
                      }`}
                      style={{ paddingLeft: "0.5rem" }}
                    >
                      {typeof menu.icon === "string" ? (
                        <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                      ) : (
                        menu.icon
                      )}
                      {menu.title}
                      {menu.badge ? (
                        <Badge
                          className="ms-1"
                          bg={menu.badgecolor ? menu.badgecolor : "primary"}
                        >
                          {menu.badge}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Link>
                  </Card>
                );
              }
            }
          })}
        </Accordion>
        {/* end of Dashboard Menu */}
      </SimpleBar>
    </Fragment>
  );
};

export default NavbarVertical;
