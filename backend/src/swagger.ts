import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PickMyUni API",
      version: "1.0.0",
      description:
        "API documentation for PickMyUni - College and Course Information System",
    },
    servers: [
      {
        url: process.env.TEST_BACKEND_URL,
        description: "test server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts", "./src/controllers/**/*.ts"], // paths to files containing OpenAPI definitions
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "PickMyUni API Documentation",
    })
  );
};

export default specs;
