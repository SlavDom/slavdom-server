import intel = require("intel");
import * as Promise from 'bluebird';

export interface Logger {

    verbose();

    info();

    debug();

    warn();

    error();

    setLevel();
}

export declare function info();

export declare function debug();

export declare function warn();

export declare function setLevel();

export declare function getLogger(name: string): Logger;