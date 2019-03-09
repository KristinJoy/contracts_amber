import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CreateNewContract from "./CreateNewContract.js";
import Home from '@material-ui/icons/Home';
import ServiceAgreement from './ServiceAgreement.js';
import RainyDay from './RainyDay.js';
import CancelAgreement from './CancelAgreement';
import FinalizeContract from './FinalizeContract';
import PendingService from './PendingService';
import PendingContractsList from './PendingContractsList';
import ContractsToFinalizeList from './ContractsToFinalizeList';
import AllContractsList from './AllContractsList';
import HomeScreen from './HomeScreen';


const AppRoutes = [
  {
    path: "/",
    navbarName: "Your Contract Dashboard",
		component: HomeSceen,
	},
  {
    path: "/CreateNewContract",
    navbarName: "Start a Contract",
    component: CreateNewContract
  },
  {
    path: "/AllContractsList",
    navbarName: "All Contract List",
    component: AllContractsList
  },

  {
    path: "/CancelAgreement",
    navbarName: "CancelAgreement",
    component: CancelAgreement
  },
  {
    path: "/ContractsToFinalizeList",
    navbarName: "ContractsToFinalizeList",
    component: ContractsToFinalizeList
  },
  {
    path: "/FinalizeContract",
    navbarName: "FinalizeContract",
    component: FinalizeContract
  },
  {
    path: "/PendingContractsList",
    navbarName: "PendingContractsList",
    component: PendingContractsList
  },
{
    path: "/PendingService",
    navbarName: "PendingService",
    component: PendingService
 },
 {
     path: "/RainyDay",
     navbarName: "RainyDay",
     component: RainyDay
  },
  {
      path: "/ServiceAgreement",
      navbarName: "ServiceAgreement",
      component: ServiceAgreement
	}
  // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default AppRoutes;
