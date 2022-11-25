import Koa from "koa";
import Router from "@koa/router";
import serve from "koa-static";

import mime from "mime-types";
import fs from "fs";
import Nfts from "./nfts/index";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import configs from "../config";
const secrets = require('../.secrets.json');


const sdk = ThirdwebSDK.fromPrivateKey(secrets.privateKey, configs.chain.network);
const contract = await sdk.getContract(configs.contractAddress);

const app = new Koa();
const router = new Router();

const port = 3000;
const { images } = Nfts();
const { pre, post } = images;

console.log(`http server running on port: ${port}`);


process.exit(-1);



router.get('/', (ctx, next) => {
  ctx.body = `Hello world`;
});

router.get('/nft/:id', async (ctx, next) => {
  const nftid = ctx.params.id;

  /* @ts-ignore:next-line */
  // const sdk = new ThirdwebSDK(configs.chain.id);
  // const contract = await sdk.getContract(configs.contractAddress);



  const isRedeemable = await contract.call("isRedeemable", 0);


  let nftImage;
  if (isRedeemable) {
    nftImage = pre[nftid];
  } else {
    nftImage = post[nftid];
  }

  const src = fs.createReadStream(`./dist/${nftImage}`);
  ctx.response.set("content-type", mime.types.jpg);
  ctx.body = src;

});

router.get('/nft/debug/:id', (ctx, next) => {
  const nftid = ctx.params.id;
  ctx.body = {
    pre: pre[nftid],
    post: post[nftid],
  }
});


router.get('/nft/pre/:id', (ctx, next) => {
  const nftid = ctx.params.id;
  const nftImage = pre[nftid];
  const src = fs.createReadStream(`./dist/${nftImage}`);
  ctx.response.set("content-type", mime.types.jpg);
  ctx.body = src;
});

router.get('/nft/post/:id', (ctx, next) => {
  const nftid = ctx.params.id;
  const nftImage = post[nftid];
  const src = fs.createReadStream(`./dist/${nftImage}`);
  ctx.response.set("content-type", mime.types.jpg);
  ctx.body = src;
});

app.use(serve(".", {}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);