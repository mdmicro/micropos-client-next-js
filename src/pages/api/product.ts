// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {urlSrv} from "@/types/reqTypes";
import {ProductData} from "@/pages/menuPages/Product";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  console.log(' - request api/product -')
  console.log(JSON.stringify(req.body, null, 1))

  let response: any;
  switch (req.method) {
    case 'GET': {
      try {
        response = await axios.get('http://' + urlSrv + '/product')
        // console.log('resp data:' + response.data)
        res.status(response.status).send(response.data)
      } catch (e: any) {
        console.log('error:' + e.message + ' code:' + e.code)
        // res.status(response.status).send(response.data)
        throw e
      }
    } break;
    case 'POST': {
      req.body.id
          ? await axios.patch('http://' + urlSrv + `/product/${req.body.id}`, req.body).then(response=>{
            console.log('- patch product complete -')
            // console.log(response.status)
            // console.log(response.data)
            res.status(response.status).send(response.data)
          }).catch(e=> {
            console.log('error:' + e)
            throw e
          })
        : await axios.post('http://' + urlSrv + '/product', req.body).then(response=>{
          console.log('- post product complete -')
          // console.log(response.status)
          // console.log(response.data)
          res.status(response.status).send(response.data)
        }).catch(e=> {
          console.log('error:' + e)
          throw e
        })
    } break;
    case 'PATCH': {
      await axios.delete('http://' + urlSrv + `/product/${req.body.id}`).then(response=>{
            console.log('- delete product complete -')
            // console.log(response.status)
            // console.log(response.data)
            res.status(response.status).send(response.data)
          }).catch(e=> {
            console.log('error:' + e)
            throw e
          });
    } break;
  }

}
