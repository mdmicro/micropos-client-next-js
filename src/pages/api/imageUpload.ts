// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {urlSrv} from "@/types/reqTypes";
import {ProductData} from "@/pages/menuPages/Product";
import FormData, {Headers} from "form-data";
import {promises as fsp} from "fs";
import fs from "fs";
import {IncomingForm, File} from 'formidable';

/** Обязательно, чтобы работал парсинг полей формы ниже !!! */
export const config = {
    api: {
        bodyParser: false,
    },
};


type ProcessedFiles = Array<[string, File]>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData>
) {
  console.log(' - request api/imageUpload -')
  console.log(JSON.stringify(req.body, null, 1))

    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field: any, file: File) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', (err: any) => reject(err));
        form.parse(req, () => {
            //
        });
    }).catch(e => {
        console.log(e);
    });

    if (files?.length) {
        /* Add files to FormData */
        const formData = new FormData();
        for (const file of files) {

            /** options: file[1].originalFilename || ''  !!! указывать обязательно при отправке файла, иначе со стороны
             * гуйки Ошибка 500, на стороне сервера - file будет пустым, не будет парситься на сервере !!! */
            formData.append(file[0], fs.createReadStream(file[1].filepath), file[1].originalFilename || '');
            // formData.append(file[0], await fsp.readFile(file[1].filepath), file[1].originalFilename || ''); // также работает
        }

  let response: any;
  switch (req.method) {
    case 'GET': {
      try {
        response = await axios.get('http://' + urlSrv + '/imageUpload')
        // console.log('resp data:' + response.data)
        res.status(response.status).send(response.data)
      } catch (e: any) {
        console.log('error:' + e.message + ' code:' + e.code)
        // res.status(response.status).send(response.data)
        throw e
      }
    } break;
    case 'POST': {
      if (req.body?.id) {
          await axios.patch('http://' + urlSrv + `/imageUpload/${req.body.id}`, req.body).then(response => {
              console.log('- patch imageUpload complete -')
              // console.log(response.status)
              // console.log(response.data)
              res.status(response.status).send(response.data)
          }).catch(e => {
              console.log('error:' + e)
              throw e
          })
      } else {
          try {
              const response = await axios.post('http://' + urlSrv + '/imageUpload', formData, {
                  headers: formData.getHeaders(),
              })
              console.log('- post imageUpload complete -')
              console.log(response.status)
              // console.log(response.data)
              res.status(response.status).send(response.data)
            } catch (e: any) {
              console.log(e)
              throw e
            }
        }
    } break;
    case 'PATCH': {
      await axios.delete('http://' + urlSrv + `/imageUpload/${req.body.id}`).then(response=>{
            console.log('- delete imageUpload complete -')
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
}
