import { LocalTreeBackend } from 'simple-family-tree-model';
import { buildTreeFromFile } from '../src/index';
import { expect } from 'chai';
import 'mocha';



describe('Load tree', () => {
    let tree = new LocalTreeBackend();
    const filename = __dirname + "/555sample.ged";

    it('Load gedcom file', () => {
        const promise = buildTreeFromFile(tree, filename);

        promise.then(function(result) {
            if (result) {
                //console.log(result);
                //expect(result);
                expect(tree.getRootProfile()?.itemLink).to.equal("@I1@");

                //console.log(tree.getRootProfile());
            }
        })
    })


});