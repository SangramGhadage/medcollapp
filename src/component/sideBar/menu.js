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


const navigate = useNavigate();
export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    items: []
  },
  {
    icon: <AddchartIcon/>,
    title: "Masters",
    items: [
      {
        title: "- Diseases",
        items: [ ],
        onClick: () => navigate("/dashboard"),
      },
      {
        title: "- Hospitals",
        items: [],
        onClick: () => navigate("/dashboard"),
      },
      {
        title: "- Countries",
        items: [],
        onClick: () => navigate("/dashboard"),
      },
      {
        title: "- Tourism Attraction",
        items: [],
        onClick: () => navigate("/dashboard"),
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
      },
      {
        title: "- Travel Agency",
        items: [
        ]
      },
      {
        title: "- Insurance Company",
        items: []
      },
      {
        title: "- Hotel Resort",
        items: []
      },
      {
        title: "- Air Ambulance/Taxis",
        items: []
      },
    ]
  },
  {
    icon: <ArticleIcon />,
    title: "Reports"
  },
];
