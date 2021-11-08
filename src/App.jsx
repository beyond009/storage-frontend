import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  BrowserRouter,
  Route,
  Switch,
  Link,
  Router,
} from "react-router-dom";
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { isDelegationValid } from "@dfinity/authentication";
import { idlFactory } from "./declarations/backend/backend.did.js";
import { DelegationIdentity } from "@dfinity/identity";
import "./App.css";
const App = () => {
  return <div></div>;
};

export default App;
