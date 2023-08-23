// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {urlSrv} from "@/types/reqTypes";
import {PrinterData} from '@/pages/menuPages/Devices/Printer/Printer';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrinterData>
) {
  console.log(' - request api/printer -')
  console.log(JSON.stringify(req.body, null, 1))

  let response: any;
  switch (req.method) {
    case 'GET': {
      try {
        response = await axios.get('http://' + urlSrv + '/printer')
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
          ? await axios.patch('http://' + urlSrv + `/printer/${req.body.id}`, req.body).then(response=>{
            console.log('- patch printer complete -')
            // console.log(response.status)
            // console.log(response.data)
            res.status(response.status).send(response.data)
          }).catch(e=> {
            console.log('error:' + e)
            throw e
          })
        : await axios.post('http://' + urlSrv + '/printer', req.body).then(response=>{
          console.log('- post printer complete -')
          // console.log(response.status)
          // console.log(response.data)
          res.status(response.status).send(response.data)
        }).catch(e=> {
          console.log('error:' + e)
          throw e
        })
    } break;
    case 'PATCH': {
      await axios.delete('http://' + urlSrv + `/printer/${req.body.id}`).then(response=>{
            console.log('- delete printer complete -')
            res.status(response.status).send(response.data)
          }).catch(e=> {
            console.log('error:' + e)
            throw e
          });
    } break;
  }

}
