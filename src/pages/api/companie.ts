// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

type Data = {
  name: string
  inn: string
  kpp: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('REQUEST COMPANIE!!!')
  console.log(req.body)
  const url = 'http://localhost:3000/companies'
  axios.post(url, req.body).then(response=>{
    console.log('Post companie complete!')
    console.log(response.status)
    console.log(response.data)
    res.status(response.status).send(response.data)
  }).catch(e=>console.log(e))
}
