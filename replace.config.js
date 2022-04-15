module.exports = {
    files: './index.d.ts',
    from: [/\/assembly\//g, /\/index/g, /declare module 'proton-tsc'/g, /declare module 'proton-tsc\/assembly'/],
    to: ['/', '', "declare module 'proton-tsc/assembly'", "declare module 'proton-tsc'"],
};