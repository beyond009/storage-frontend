import React, { Component, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import sha256 from "crypto-js/sha256";
import hex from "crypto-js/enc-hex";
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
import { test } from "./declarations/test/index.js";
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
    var key = null;
    const reader = new FileReader();

    reader.onload = async function (e) {
      // let blob = null;
      // if (typeof e.target.result === "object") {
      //   blob = new Blob([e.target.result]);
      // } else {
      //   blob = e.target.result;
      // }
      // console.log(blob);
      let result = e.target.result;

      let tData = new Uint8Array(result);
      let data = [];
      for (let i = 0; i < tData.length; i++) {
        data.push(tData[i]);
      }
      let tmp = sha256(data).words;
      let buffer = Buffer.from(tmp.toString(hex), "hex");
      let ttmp = new Uint8Array(buffer);
      let digest = [];
      for (let i = 0; i < ttmp.length; i++) {
        digest.push(ttmp[i]);
      }
      console.log(data);
      console.log(digest);
      if (currentChunk === 0) {
        let re = await test.put({
          init: {
            chunk: { digest: digest, data: data },
            file_extension: { jpg: null },
          },
          // init: null,
        });
        console.log(re);
        key = re.ok.key;
      } else if (currentChunk < chunks - 1) {
        let re = await test.put({
          append: {
            chunk: { digest: digest, data: data },
            key: key,
          },
        });
        console.log(re);
        key = re.ok.key;
      } else {
        let re = await test.put({
          final: { chunk: { digest: digest, data: data }, key: key },
          //keyA0F15350E5AAB6C8AC0B882B96328F0646DBCE307EAA3CE2570DB30A824D524
        });
        alert(`上传成功 key${re.ok.key}`);
      }
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
      var start = currentChunk * chunkSize;
      var end = start + chunkSize > fileSize ? fileSize : start + chunkSize;
      reader.readAsArrayBuffer(blobSlice.call(file, start, end));
      // let chunk = blobSlice.call(file, start, end);
      // let digest = sha256(chunk);
      // console.log(digest);
      // let tChunk = {
      //   digest: digest.words, // SHA256 of chunk
      //   data: chunk,
      // };

      // console.log(test);
      // if (start == 0) {
      //   let re = await test.put({
      //     init: {
      //       chunk: { digest: [], data: [] },
      //       file_extension: { jpg: null },
      //     },
      //     // init: null,
      //   });
      //   console.log(re);
      // }
      // currentChunk++;
      // if (currentChunk < chunks) {
      //   console.log(
      //     `第${currentChunk}分片解析完成，开始解析${currentChunk + 1}分片`
      //   );
      //   loadNext();
      // } else {
      //   console.log("解析完成");
      // }
    };
    loadNext();
  }, []);

  const loadImg = async () => {
    let re = await test.getAssetInfo(
      "A0F15350E5AAB6C8AC0B882B96328F0646DBCE307EAA3CE2570DB30A824D5242"
    );
    console.log(re);
    let fileSize = Number(re.ok.total_size);
    let chunkSize = 3145728;
    let chunks = Math.ceil(fileSize / chunkSize);
    console.log(fileSize);
    console.log(chunks);
    let flag = 0;
    for (let i = 1; i <= chunks; i++) {
      let reFile = await test.get({
        key: "A0F15350E5AAB6C8AC0B882B96328F0646DBCE307EAA3CE2570DB30A824D5242",
        flag: 0,
      });
      console.log(reFile);
      // flag = flag + chunkSize + 1;
    }
  };
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
      <button onClick={loadImg}>load</button>
    </div>
  );
};

export default App;
