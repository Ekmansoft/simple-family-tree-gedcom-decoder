import { LocalTreeBackend } from 'simple-family-tree-model';
import { buildTreeFromLocalGedcomFile, buildTreeFromRemoteGedcomFile } from '../src/index';
import { expect } from 'chai';
import 'mocha';

describe('Load tree', () => {

    it('Load local gedcom file', () => {
        let tree = new LocalTreeBackend();
        const filename = __dirname + "/555sample.ged";
        const promise = buildTreeFromLocalGedcomFile(tree, filename);

        promise.then(function(result) {
            if (result) {
                expect(tree.getRootProfile()?.itemLink).to.equal("@I1@");
            } else {
                console.log("Failed local...");
            }
        })
    })
    it('Load remote gedcom file', () => {
        let tree = new LocalTreeBackend();
        const gedcomUrl = "https://www.gedcom.org/samples/555SAMPLE.GED"
        const promise = buildTreeFromRemoteGedcomFile(tree, gedcomUrl);

        promise.then(function(result) {
            if (result) {
                expect(tree.getRootProfile()?.itemLink).to.equal("@I1@");
            } else {
                console.log("Failed remote...");
                expect.fail;
            }
        })
    })


});