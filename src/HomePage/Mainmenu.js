import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonIcon from '@material-ui/icons/Person';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DraftsIcon from '@material-ui/icons/Drafts';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AllOutIcon from '@material-ui/icons/AllOut';
import SettingsIcon from '@material-ui/icons/Settings';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MailIcon from '@material-ui/icons/Mail';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PublicIcon from '@material-ui/icons/Public';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import BusinessIcon from '@material-ui/icons/Business';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ApartmentIcon from '@material-ui/icons/Apartment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import BorderVerticalIcon from '@material-ui/icons/BorderVertical';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MoneyIcon from '@material-ui/icons/Money';
import DescriptionIcon from '@material-ui/icons/Description';

import ItemRegistry from '../views/MasterDataSetup/ItemRegistry'
import CustomerRegistry from '../views/MasterDataSetup/CustomerRegistry'
import SalesRegistry from '../views/Sales/Sales'

// Report
import CollectionReport from '../views/Report/CollectionReport'
import WeeklyReport from '../views/Report/WeeklyReport'
import SummaryReport from '../views/Report/SummaryReport'
import SalesReport from '../views/Report/SalesReport'
import CustomerBillFind from  '../views/Sales/CustomerBillFind'

import SalesEditForm from '../views/Sales/SalesEdit'
import ItemReport from '../views/Report/ItemReport'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

// 
import PurchaseCustomerRegistry from '../views/MasterDataSetup/PurchaseCustomerRegistry'

// purchase
import PurchaseRegistry from '../views/PurchaseRegistry/Purchse'
import PurchaseBillFind from '../views/PurchaseRegistry/PurCustomerBillFind'
import PurchaseEditForm from '../views/PurchaseRegistry/PurchseEdit'
import PurchaseReport from '../views/Report/PurchaseReport'


// First Menu
export const MenuList = [
  {
    id: "Administration",
    TabName: "Administration",
    ListCount: true,
    Child: false,
    icon: <PersonOutlineOutlinedIcon className="MenuIcon"/>
  },
  {
    id: "MasterDataSetup",
    TabName: "MasterData Setup",
    ListCount: 4,
    Child: true,
    icon: <DashboardOutlinedIcon className="MenuIcon" />,
    ul_ID: "DashboardList"
  },  
  {
    id: "Purchase",
    TabName: "Purchase",
    ListCount: 4,
    Child: true,
    icon: <AddShoppingCartIcon className="MenuIcon" />,
    ul_ID: "DashboardList"
  },
  {
    id: "Sales",
    TabName: "Sales",
    ListCount: 4,
    Child: true,
    icon: <MonetizationOnIcon className="MenuIcon" />,
    ul_ID: "DashboardList"
  },
  {
    id: "Report",
    TabName: "Report",
    ListCount: 4,
    Child: true,
    icon: <ReceiptIcon className="MenuIcon" />,
    ul_ID: "DashboardList"
  },
  
  
];
// Submenu
export const SubMenuList = [
  {
    MasterDataSetup:[
      {
        id: "ItemRegistry",
        TabName: "Item Master",
        ListCount: true,
        Child: false,
        component: <ItemRegistry />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      {
        id: "CustomerRegistry",
        TabName: "Sales Customer Master",
        ListCount: true,
        Child: false,
        component: <CustomerRegistry />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      {
        id: "PurchaseCustomerRegistry",
        TabName: "Purchase Customer Master",
        ListCount: true,
        Child: false,
        component: <PurchaseCustomerRegistry />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
    ]
  },
  {
    Purchase:[
      {
        id: "Purchase",
        TabName: "Purchase Registry",
        ListCount: true,
        Child: false,
        component: <PurchaseRegistry />,
        caseType: "",
        token: "",
        icon: <AddShoppingCartIcon className="SubMenuIcon" />,
      },
      {
        id: "PurchaseBill",
        TabName: "Purchase Bill Find",
        ListCount: true,
        Child: false,
        component: <PurchaseBillFind />,
        caseType: "",
        token: "",
        icon: <FindInPageIcon className="SubMenuIcon" />,
      }
    ]
  },
  {
    Sales:[
      {
        id: "Sales",
        TabName: "Sales Registry",
        ListCount: true,
        Child: false,
        component: <SalesRegistry />,
        caseType: "",
        token: "",
        icon: <MonetizationOnIcon className="SubMenuIcon" />,
      },
      {
        id: "SalesBill",
        TabName: "Sales Bill Find",
        ListCount: true,
        Child: false,
        component: <CustomerBillFind />,
        caseType: "",
        token: "",
        icon: <LocalAtmIcon className="SubMenuIcon" />,
      }
    ]
  },
  {
    Report: [
      {
        id: "SalesReport",
        TabName: "Sales Report",
        ListCount: true,
        Child: false,
        component: <SalesReport />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      {
        id: "SummaryReport",
        TabName: "Sales Summary Report",
        ListCount: true,
        Child: false,
        component: <SummaryReport />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      // {
      //   id: "WeeklyReport",
      //   TabName: "Weekly Report",
      //   ListCount: true,
      //   Child: false,
      //   component: <WeeklyReport />,
      //   caseType: "",
      //   token: "",
      //   icon: <ReceiptIcon className="SubMenuIcon" />,
      // },
      {
        id: "CollectionReport",
        TabName: "Sales Collection Report",
        ListCount: true,
        Child: false,
        component: <CollectionReport />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      {
        id: "ItemReport",
        TabName: "Sales Item Report",
        ListCount: true,
        Child: false,
        component: <ItemReport />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      },
      {
        id: "PurchaseReport",
        TabName: "Purchase Report",
        ListCount: true,
        Child: false,
        component: <PurchaseReport />,
        caseType: "",
        token: "",
        icon: <ReceiptIcon className="SubMenuIcon" />,
      }
    ]
  }
]


export const SecondSubMenuList = []


export const ThirdSubMenuList = [
  {
    Dashboard: [
      {
        id: "Dashboard_AssetView_ASPX",
        TabName: "Asset",
        ListCount: true,
        Child: false,
        component: false,
        caseType: false,
        token: false
      }
    ]
  }
];

export const SalesEdit =  
{
  id: "SalesEdit",
  TabName: "Sales Edit",
  ListCount: true,
  Child: false,
  component: <SalesEditForm />,
  caseType: "",
  token: "",
  icon: <NoteAddIcon className="SubMenuIcon" />,
};

export const PurchaseEdit =  
{
  id: "PurchaseEdit",
  TabName: "Purchase Edit",
  ListCount: true,
  Child: false,
  component: <PurchaseEditForm />,
  caseType: "",
  token: "",
  icon: <NoteAddIcon className="SubMenuIcon" />,
};
