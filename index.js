const app = require("./src/app");
const { connectRedis } = require("./src/config/redis");

const PORT = 3000;

async function startServer() {
    await connectRedis();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();