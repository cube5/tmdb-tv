import { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faHome,
  faStar,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import Items from "../components/items";
import Sidebar from "../components/sidebar";

library.add(faUser, faHome, faStar, faSearch);

export default class Index extends Component {
  state = {
    isFocusReady: false
  };

  componentDidMount() {
    import("../lib/spatial-navigation").then(() => {
      window.SN = SpatialNavigation;

      // Initialize
      SN.init();

      SN.set({
        straightOnly: true
      });

      // Define navigable elements (anchors and elements with "focusable" class).
      SN.add({
        selector: "button, .focusable"
      });

      SN.add("content", {
        selector: ".content .item",
        enterTo: "last-focused"
      });

      SN.add("sidebar", {
        selector: "#sidebar"
      });

      SN.add("menu", {
        selector: "#menu .item",
        defaultElement: "#menu .item:first-child",
        enterTo: "default-element",
        leaveFor: {
          right: "@content",
          up: "",
          down: "",
          left: ""
        }
      });

      // Make the *currently existing* navigable elements focusable.
      SN.makeFocusable();

      // Focus the first navigable element.
      SN.focus();

      this.setState({ isFocusReady: true });
    });
  }

  render() {
    return (
      <div id="tv">
        <div id="safe-zone">
          <Sidebar />

          <div id="main">
            <div id="content">
              <Items />
            </div>
          </div>
        </div>

        <style global jsx>{`
          body {
            color: #fff;
            background: #111;
            margin: 0;
            width: 1920px;
            height: 1080px;
            font-size: 32px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
          }

          a {
            color: #fff;
            text-decoration: none;
          }

          a:focus,
          button:focus,
          .focusable:focus {
            outline: 2px solid white;
          }

          h1 {
            font-size: 94px;
          }

          h2 {
            font-size: 62px;
          }

          h3 {
            font-size: 44px;
          }

          small {
            font-size: 24px;
          }

          #tv {
            position: absolute;
            top: 0;
            left: 0;
            width: 1920px;
            height: 1080px;
          }

          #safe-zone {
            padding: 60px 90px;
            height: calc(1080px - 120px);
          }

          #main {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 20px 0 0 120px;
          }

          #content {
            height: 100%;
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}
