//import React from "react";
//import fetch from "node-fetch";
//import fetch from "node";
import { TreeBackend, LocalTreeBackend } from "simple-family-tree-model";
import { decodeGedcom } from "./decode-gedcom";
import * as fs from "fs";

export async function buildTreeFromFile(tree: LocalTreeBackend, filename: string): Promise<boolean>  {
  //console.log("readFileSync:", filename);
  fs.readFile(filename, "utf8", function (err, gedcomData) {
    if (err == null) {
      //console.log("gedcom length:", gedcomData.length);
      decodeGedcom(tree, gedcomData);

      const rootProfile = tree.getRootProfile();
      if (rootProfile !== undefined) {
        //console.log("root profile ", rootProfile.itemLink);
        return true;
      }
    }
  })

  console.log("failed decoding gedcom");
  return Promise.resolve(true);
}
