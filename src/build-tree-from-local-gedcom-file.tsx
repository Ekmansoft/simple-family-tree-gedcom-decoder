import { TreeBackend, LocalTreeBackend } from "simple-family-tree-model";
import { decodeGedcom } from "./decode-gedcom";
import { promises as fsPromises } from "fs";

export async function buildTreeFromLocalGedcomFile(tree: LocalTreeBackend, filename: string): Promise<boolean>  {
  try {
    const result = await fsPromises.readFile(filename,'utf-8', );

    decodeGedcom(tree, result);

    return true;
  } catch (err) {
    return false
  }

  console.log("failed decoding gedcom");
  return Promise.resolve(true);
}
