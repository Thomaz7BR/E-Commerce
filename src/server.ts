import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { categoryRouter } from "./modules/categories/category.routes.js";
import { productRouter } from "./modules/products/product.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());


app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

app.use("/auth", authRouter);

app.use("/categories", categoryRouter);

app.use("/products", productRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})