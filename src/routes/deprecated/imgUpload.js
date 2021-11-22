/* const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: '../../static/img'
    });

const app = express();

app. */
export async function post(req) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    console.log("Llegando al post...");
    console.log(req);
    console.log(req.body);
    return {
        body:{
            mensaje: "algo"
        }
    };
  };
  export async function get() {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    console.log("Llegando al get...");
  };