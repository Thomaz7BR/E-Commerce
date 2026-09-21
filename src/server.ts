import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
const app = express();

app.use(express.json());


app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})