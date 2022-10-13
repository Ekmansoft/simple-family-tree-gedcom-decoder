import { LocalTreeBackend } from 'simple-family-tree-model';
import { decodeGedcom, buildTreeFromRemoteGedcomFile } from '../src/index';
import { buildTreeFromLocalGedcomFile } from './build-tree-from-local-gedcom-file';
import { expect } from 'chai';
import fetch from "axios";
import 'mocha';

describe('Load tree', () => {

    it('Load remote gedcom file using fetch', () => {
        let tree = new LocalTreeBackend();
        const filename = "http://www.gedcom.org/samples/555SAMPLE.GED";
        const promise = fetch(filename, { method: 'GET', } );

        promise.then(response => {
            if (response) {
                // console.log(response.data.length)
                decodeGedcom(tree, response.data);
                const rootLink = tree.getRootProfile();
                // console.log("loading local with fetch", rootLink);
                if (rootLink != undefined) {
                    expect(rootLink.itemLink).to.equal("@I1@");
                    const rootProfile = tree.findProfile(rootLink);
                    if (rootProfile != undefined) {
                        //console.log(rootProfile)
                        expect(rootProfile?.name).to.equal("Robert Eugene Williams");
                        //console.log(rootProfile)
                        //console.log("success local fetch")
                    } else {
                        console.log("fail local fetch", rootProfile)
                    }
                } else {
                    console.log("fail")
                }
            } else {
                console.log("Failed local fetch...");
            }
        }).catch(error => {
            console.log("Failed local fetch...", error);
        })
    })
    it('Load local gedcom file', () => {
        let tree = new LocalTreeBackend();
        const filename = __dirname + "/555sample.ged";
        const promise = buildTreeFromLocalGedcomFile(tree, filename);

        promise.then(function(result) {
            if (result) {
                const rootLink = tree.getRootProfile();
                // console.log("loading local as file", rootLink);
                if (rootLink != undefined) {
                    expect(rootLink.itemLink).to.equal("@I1@");
                    const rootProfile = tree.findProfile(rootLink);
                    expect(rootProfile?.name).to.equal("Robert Eugene Williams");
                    // console.log(rootProfile?.name)
                    // console.log(rootProfile)
                    // console.log("success crap local")
                } else {
                    console.log("fail")
                }
            } else {
                console.log("Failed local...");
            }
        }).catch(error => {
            console.log("Failed local file...", error);
        })
    })
    it('Load remote gedcom file', () => {
        let tree = new LocalTreeBackend();
        const gedcomUrl = "https://www.gedcom.org/samples/555SAMPLE.GED"
        const promise = buildTreeFromRemoteGedcomFile(tree, gedcomUrl);

        promise.then(function(result) {
            if (result) {
                expect(tree.getRootProfile()?.itemLink).to.equal("@I1@");
                const rootLink = tree.getRootProfile();
                // console.log("testcrap", rootLink);
                if (rootLink != undefined) {
                    expect(rootLink.itemLink).to.equal("@I1@");
                    const rootProfile = tree.findProfile(rootLink);
                    expect(rootProfile?.name).to.equal("Robert Eugene Williams");
                    // console.log(rootProfile?.name)
                    // console.log(rootProfile)
                    // console.log("success crap remote")
                } else {
                    console.log("fail")
                }
            } else {
                console.log("Failed remote...");
                expect.fail;
            }
        }).catch(error => {
            console.log("Failed remote fetch...", error);
        })
    })


});