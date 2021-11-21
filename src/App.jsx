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
import { test } from "./index1.js";
const getReverseFileExtension = (type) => {
  switch (Object.keys(type)[0]) {
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "jpg":
      return "image/jpg";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg";
    case "avi":
      return "video/avi";
    case "mp4":
      return "video/mp4";
    case "aac":
      return "video/aac";
    case "wav":
      return "audio/wav";
    case "mp3":
      return "audio/mp3";
    default:
      return "";
  }
};

const getFileExtension = (type) => {
  switch (type) {
    case "image/jpeg":
      return { jpeg: null };
    case "image/gif":
      return { gif: null };
    case "image/jpg":
      return { jpg: null };
    case "image/png":
      return { png: null };
    case "image/svg":
      return { svg: null };
    case "video/avi":
      return { avi: null };
    case "video/aac":
      return { aac: null };
    case "video/mp4":
      return { mp4: null };
    case "audio/wav":
      return { wav: null };
    case "audio/mp3":
      return { mp3: null };
    default:
      return null;
  }
};

const App = () => {
  const [key, setKey] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSetKey = () => {
    let kkk = document.getElementById("setkey").value;
    setKey(kkk);
  };
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
    var tKey = "";
    const chunkPromises = [];
    const reader = new FileReader();
    var file_extension = getFileExtension(file.type);
    reader.onload = function (e) {
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
      if (currentChunk === 0) {
        test
          .put({
            init: {
              chunk: { digest: digest, data: data },
              chunk_number: chunks,
              file_extension: file_extension,
            },
          })
          .then((re) => {
            tKey = re.ok.key;
            if (chunks === 1) {
              setKey(re.ok.key);
              console.log(`上传成功`);
            } else {
              currentChunk++;
              loadNext();
            }
          });
      } else if (currentChunk < chunks) {
        console.log(currentChunk, chunks);
        chunkPromises.push(
          test.put({
            append: {
              chunk: { digest: digest, data: data },
              order: currentChunk,
              key: tKey,
            },
          })
        );
        if (currentChunk === chunks - 1) {
          console.log(chunkPromises);
          Promise.all(chunkPromises).then((re) => {
            console.log(re);
            setKey(re[chunks - 2].ok.key);
          });
        } else {
          currentChunk++;
          loadNext();
        }
      }
    };
    const loadNext = () => {
      var start = currentChunk * chunkSize;
      var end = start + chunkSize > fileSize ? fileSize : start + chunkSize;
      reader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };
    loadNext();
  }, []);

  const loadImg = async () => {
    let re = await test.getAssetExt(key);
    console.log(re);
    let chunks = Number(re.ok.need_query_times);
    console.log(chunks);
    let file = [];
    for (let i = 0; i < chunks; i++) {
      let reFile = await test.get({
        key: key,
        flag: i,
      });

      console.log(reFile);
      for (let i = 0; i < reFile.ok.length; i++)
        file.push(new Uint8Array(reFile.ok[i]).buffer);
    }
    console.log(file);
    // let u8 = new Uint8Array(file);
    // let ab = u8.buffer;
    // console.log(Object.keys(re.ok)[1]);
    let file_type = getReverseFileExtension(re.ok.file_extension);

    const blob = new Blob(file, {
      type: file_type,
    });

    // console.log(sha256(blob).words);
    const url = URL.createObjectURL(blob);
    console.log(url);
    setImgUrl(url);
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
      <input id="setkey" />
      <button onClick={handleSetKey}>set key</button>

      <button onClick={loadImg}>load</button>
      <img src={imgUrl} />
      <video width="320" height="240" controls>
        <source src={imgUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default App;
