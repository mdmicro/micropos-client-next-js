// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
  res.status(200).send(req.body)
}
