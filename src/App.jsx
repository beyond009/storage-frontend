import React, { Component, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
import test from "./declarations/index.js";
const App = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    var fileSize = file.size; // 文件大小
    var chunkSize = 2 * 1024 * 1024; // 切片的大小
    var chunks = Math.ceil(fileSize / chunkSize); // 获取切片的个数
    var blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    var currentChunk = 0;
    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target.result;
      console.log(result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
        console.log(
          `第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`
        );
      } else {
        console.log("解析完成");
      }
    };
    const loadNext = async () => {
      let start = currentChunk * chunkSize;
      let end = start + chunkSize > fileSize ? fileSize : start + chunkSize;
      // reader.readAsArrayBuffer(blobSlice.call(file, start, end));
      console.log(blobSlice.call(file, start, end));
      currentChunk++;
      if (currentChunk < chunks) {
        console.log(
          `第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`
        );
        loadNext();
      } else {
        console.log("解析完成");
      }
    };
    loadNext();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default App;
