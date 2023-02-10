# Proton Typescript Smart Contracts

<a href="https://gitpod.io/#https://github.com/ProtonProtocol/proton-ts-assembly">
    <img align="left" width="150" height="45" src="https://gitpod.io/button/open-in-gitpod.svg"></img>
</a>

<a href="https://protonide.com">
    <img align="center" width="150" height="45" src="./button_protonide.svg"></img>
</a>

<br/>
<!-- [![Open in Proton IDE](https://gitpod.io/button/open-in-gitpod.svg)](https://protonide.com) -->


## Documentation
[Documentation](https://docs.proton.org)

## Local Install.
**Must use Node 16**

```
npm i
```


## Build TS Smart Contract to WASM+ABI
```
npm run build:token
```

## Run tests
```
npm run test:token
```

## Upload WASM+ABI to Blockchain

**Install [@proton/cli](https://github.com/ProtonProtocol/proton-cli)**

```
proton contract:deploy <account>
```

## Built using
Uses SDK: https://github.com/uuosio/ascdk
