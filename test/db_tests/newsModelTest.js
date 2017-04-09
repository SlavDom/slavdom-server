import { Mongoose } from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { describe, it, before } from 'mocha';

const mongoose = new Mongoose();
const mockgoose = new Mockgoose(mongoose);

describe('newsModel', () => {
  before((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost:27017/SlavDom', (err) => {
        done(err);
      });
    });
  });

  describe('something is here', () => {
    it("...", (done) => {
      done();
    });
  });
});