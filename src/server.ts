import express from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/terms", (_, response) => {
    return response.json({ message: "Termos de Serviço" });
});

app.use("/v1", router);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
