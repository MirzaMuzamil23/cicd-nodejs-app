import express from 'express'

const app = express()
const port = 8080

app.get("/" , (req,res) => {
    return res.json({
        msg: "Hello From Server V1"
    })
})

app.listen(port ,()=> {
    console.log(`server is listening on port ${port}`)
})