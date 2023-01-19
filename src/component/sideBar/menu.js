import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import  ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddchartIcon from '@mui/icons-material/Addchart';
import FlagIcon from '@mui/icons-material/Flag';
import PublicIcon from '@mui/icons-material/Public';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AttractionsIcon from '@mui/icons-material/Attractions';
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

        icon: <FlagIcon/>,
        title: "Countries",
        items: [],
        path: '/Country'      
      },
      {
        icon: <PublicIcon/>,
        title: "States",
        items: [],
        path: '/States'      
      },
      {
        icon: <CoronavirusIcon/>,
        title: "Diseases",
        items: [ ],
        path: '/Disease'
      },
      {
        icon: <LocalHospitalIcon/>,
        title: "Hospitals",
        items: [],
        path: '/Hospital'      
      },
      {
        icon: <AttractionsIcon/>,
        title: "Tourism Attraction",
        items: [],
        path: '/Dashboard'      
      },
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
