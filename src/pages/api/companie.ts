// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {urlSrv} from "@/types/reqTypes";
import {CompanieData} from "@/pages/menuPages/Companie";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompanieData>
) {
  console.log(' - request api/companie -')
  console.log(JSON.stringify(req.body, null, 1))

  let response: any;
  switch (req.method) {
    case 'GET': {
      try {
        response = await axios.get('http://' + urlSrv + '/companies')
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
          ? await axios.patch('http://' + urlSrv + `/companies/${req.body.id}`, req.body).then(response=>{
            console.log('- patch companie complete -')
            // console.log(response.status)
            // console.log(response.data)
            res.status(response.status).send(response.data)
          }).catch(e=> {
            console.log('error:' + e)
            throw e
          })
        : await axios.post('http://' + urlSrv + '/companies', req.body).then(response=>{
          console.log('- post companie complete -')
          // console.log(response.status)
          // console.log(response.data)
          res.status(response.status).send(response.data)
        }).catch(e=> {
          console.log('error:' + e)
          throw e
        })
    } break;
    case 'PATCH': {
      await axios.delete('http://' + urlSrv + `/companies/${req.body.id}`).then(response=>{
            console.log('- delete companie complete -')
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
