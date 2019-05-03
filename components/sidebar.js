import { Component, createRef, Fragment } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Sidebar extends Component {
  ref = createRef();

  state = {
    focused: false
  };

  componentDidMount() {
    const { current } = this.ref;
    if (current) {
      current.addEventListener("sn:willunfocus", this.handleWillUnfocus);
    }
  }

  componentWillUnmount() {
    const { current } = this.ref;
    if (current) {
      current.addEventListener("sn:willunfocus", this.handleWillUnfocus);
    }
  }

  handleFocus = e => {
    const target = e.target;
    if (target.id === "sidebar") {
      this.setState({ focused: true });

      SN.disable("sidebar");

      setTimeout(function() {
        SN.focus("menu");
      }, 200);
    }
  };

  handleWillUnfocus = e => {
    const { detail } = e;
    console.log(detail.nextSectionId);
    const willUnfocusMenu = detail.nextSectionId !== "menu";
    if (willUnfocusMenu) {
      this.setState({ focused: false });
      SN.enable("sidebar");
    }
  };

  render() {
    const { focused } = this.state;
    return (
      <Fragment>
        <div
          id="sidebar"
          ref={this.ref}
          className={`${focused ? "focused" : ""}`}
          onFocus={this.handleFocus}
        >
          <div id="icons">
            <div>
              <FontAwesomeIcon icon={"user"} size="2x" />
            </div>
            <div>
              <FontAwesomeIcon icon={"search"} size="2x" />
            </div>
            <div>
              <FontAwesomeIcon icon={"home"} size="2x" />
            </div>
            <div>
              <FontAwesomeIcon icon={"star"} size="2x" />
            </div>
          </div>
          <nav id="menu">
            <Link href="/about">
              <a className="item">
                <FontAwesomeIcon icon={"user"} /> Login
              </a>
            </Link>
            <Link href="/about">
              <a className="item">
                <FontAwesomeIcon icon={"search"} /> Search
              </a>
            </Link>
            <Link href="/about">
              <a className="item">
                <FontAwesomeIcon icon={"home"} /> Home
              </a>
            </Link>
            <Link href="/about">
              <a className="item">
                <FontAwesomeIcon icon={"star"} /> Favorites
              </a>
            </Link>
          </nav>
        </div>
        <style jsx>{`
          #sidebar {
            position: absolute;
            left: -300px;
            top: 0;
            width: 480px;
            height: 100%;
            box-shadow: 2px 0 20px 0 black;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            transition: left 0.5s, background-color 0.3s;
            background-color: rgba(255, 255, 255, 0.1);
            z-index: 100;
          }

          #sidebar.focused {
            left: 0;
          }

          #sidebar.focused #icons {
            opacity: 0;
          }

          #sidebar.focused #menu {
            opacity: 1;
          }

          #sidebar.focused #menu .item {
            display: block;
          }

          #icons {
            margin-right: 22px;
            transition: opacity 0.5s;
            z-index: 10;
          }

          #icons div {
            text-align: center;
            margin: 30px 0;
          }

          #menu {
            width: 100%;
            height: 100%;
            background-color: #000;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s;
            box-sizing: border-box;
            padding-top: 70px;
          }

          #menu .item {
            height: 70px;
            line-height: 70px;
            color: white;
            font-size: 32px;
            padding-left: 130px;
            box-sizing: border-box;
            cursor: default;
            display: none;
            cursor: pointer;
          }

          #menu .item:hover {
            background-color: rgba(0, 0, 0, 0.3);
          }

          #menu .item:focus {
            background-color: white;
            color: #000;
          }
        `}</style>
      </Fragment>
    );
  }
}
