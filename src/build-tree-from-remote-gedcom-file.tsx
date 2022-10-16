import { TreeBackend, LocalTreeBackend } from "simple-family-tree-model";
import { decodeGedcom } from "./decode-gedcom";
import axios from "axios";

export async function buildTreeFromRemoteGedcomFile(tree: LocalTreeBackend, filename: string): Promise<boolean>  {
  try {
    const response = await axios.get(filename);
    if (!response.status) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const gedcomData = await response.data;
    decodeGedcom(tree, gedcomData);
    // console.log('success ');

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return false;
    } else {
      console.log('unexpected error: ', error);
      return false;
    }
  }
  console.log("failed decoding gedcom");
  return Promise.resolve(true);
}
