import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import  ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddchartIcon from '@mui/icons-material/Addchart';
import React from "react";
import { useNavigate } from 'react-router-dom';


// const navigate = useNavigate();
export const menu = [
  {
    icon: <DashboardIcon style={{textShadow: '2px 1px 2px black'}}/>,
    title: "Dashboard",
    items: [],
    path: '/'
  },
  {
    icon: <AddchartIcon/>,
    title: "Masters",
    items: [
      {
        title: "- Diseases",
        items: [ ],
        path: '/'
      },
      {
        title: "- Hospitals",
        items: [],
        path: '/'      },
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
        path: '/'      },
    ]
  },
  {
    icon: <ImportContactsIcon/>,
    title: "Vendors",
    items: [
      {
        title: "- Medical Tourism Company",
        items: [ ],
        path: '/'
      },
      {
        title: "- Travel Agency",
        items: [ ],
        path: '/'
      },
      {
        title: "- Insurance Company",
        items: [],
        path: '/'
      },
      {
        title: "- Hotel Resort",
        items: [],
        path: '/'
      },
      {
        title: "- Air Ambulance/Taxis",
        items: [],
        path: '/'
      },
    ]
  },
  {
    icon: <ArticleIcon />,
    title: "Reports",
    path: '/'
  },
];
