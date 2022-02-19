import { app } from "./app";

const port = process.env.PORT || 5350;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})