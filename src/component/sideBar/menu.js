import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import  ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddchartIcon from '@mui/icons-material/Addchart';
import React from "react";

export const menu = [
  {
    icon: <DashboardIcon/>,
    title: "Dashboard",
    items: [],
    path: '/Dashboard'
  },
  {
    icon: <AddchartIcon/>,
    title: 'Masters',
    items: [
      {
        title: "- Diseases",
        items: [ ],
        path: '/Disease'
      },
      {
        title: "- Hospitals",
        items: [],
        path: '/Hospital'      
      },
      {
        title: "- Countries",
        items: [],
        path: '/Country'      
      },
      {
        title: "- States",
        items: [],
        path: '/States'      
      },
      {
        title: "- Tourism Attraction",
        items: [],
        path: '/Dashboard'      },
    ]
  },
  {
    icon: <ImportContactsIcon/>,
    title: "Vendors",
    items: [
      {
        title: "- Medical Tourism Company",
        items: [ ],
        path: '/Dashboard'
      },
      {
        title: "- Travel Agency",
        items: [ ],
        path: '/'
      },
      {
        title: "- Insurance Company",
        items: [],
        path: '/Dashboard'
      },
      {
        title: "- Hotel Resort",
        items: [],
        path: '/Dashboard'
      },
      {
        title: "- Air Ambulance/Taxis",
        items: [],
        path: '/Dashboard'
      },
    ]
  },
  {
    icon: <ArticleIcon />,
    title: "Reports",
    path: '/Dashboard'
  },
];
