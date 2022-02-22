import { app } from "./app";
import { configure } from "./db";

const port = process.env.PORT || 5350;

async function main() {
    await configure()
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

main();