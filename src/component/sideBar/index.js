import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useNavigate } from 'react-router-dom';

import { menu } from "./menu";
import { hasChildren } from "./utils";

export default function Navbar() {

  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}
const user = window.localStorage.getItem("user")
const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};
const SingleLevel = ({ item }) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate(item.path)
  }
  return (
    <ListItem button onClick={handleMenuClick}>
      <ListItemIcon style={{ color: '#ffffff', textShadow: '2px 1px 2px #000' }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ color: '#ffffff', textShadow: '2px 1px 2px #000' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
