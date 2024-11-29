export const promises = {
    readFile: async () => '',
    writeFile: async () => { },
};

export default {
    readFileSync: () => '',
    writeFileSync: () => { },

};


export const resolve = (...args) => args.join('/');
export const join = (...args) => args.join('/');
export const dirname = (path) => path.split('/').slice(0, -1).join('/');


export const homedir = () => '/';
export const createReadStream = () => { };
export const createHash = () => { };