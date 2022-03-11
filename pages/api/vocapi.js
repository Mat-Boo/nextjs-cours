import fs from 'fs'
import path from 'path'

export default function handler(req, res) {  // la fonction doit s'appeler handler
    if (req.method === "GET") {

        const filePath = path.join(process.cwd(), 'data', 'listes.json');
        const fileData = fs.readFileSync(filePath);
        const data = JSON.parse(fileData)

        res.status(200).json(data)
    }
    else if (req.method === 'POST') {
        const enWord = req.body.en;
        const frWord = req.body.fr;

        const newWord = {
            en: enWord,
            fr: frWord
        }

        const filePath = path.join(process.cwd(), 'data', 'listes.json')
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)
        data.englishList[0].data.push(newWord)
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({message: 'succès !'})
    }
} 