const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clean-Up API",
      version: "1.0.0",
      description: "API documentation for Clean-Up service",
    },
    servers: [
      { url: "https://clean-up-production.up.railway.app" },
      { url: "http://localhost:3000" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Admin: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "a8df9d32-1b2f-4c90-b5ee-91f0f58c932a",
            },
            email: {
              type: "string",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              example: "hashed_password_here",
            },
            name: {
              type: "string",
              example: "Omar Magdy",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-05T12:34:56.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-10T14:22:10.000Z",
            },
          },
        },

        PreviousWork: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "d1f6b387-45e0-4c51-9f18-c89d3289fef1",
            },
            title: {
              type: "string",
              example: "Kitchen Renovation",
            },
            description: {
              type: "string",
              example: "Complete kitchen remodeling with modern style.",
            },
            images: {
              type: "array",
              items: { type: "string" },
              example: [
                "https://res.cloudinary.com/demo/image/upload/kitchen1.jpg",
                "https://res.cloudinary.com/demo/image/upload/kitchen2.jpg",
              ],
            },
            category: {
              type: "string",
              example: "Home Cleaning",
            },
            featured: {
              type: "boolean",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-05T12:34:56.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-10T14:22:10.000Z",
            },
          },
        },

        Contact: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "c9e2f4a1-3d5b-4e6f-a7b8-9c0d1e2f3a4b",
            },
            hours: {
              type: "array",
              items: { type: "string" },
              example: ["Mon-Fri 9AM-5PM", "Sat 10AM-2PM"],
            },
            address: {
              type: "string",
              example: "123 Main St, City, Country",
            },
            email: {
              type: "string",
              example: "contact@cleaningservices.com",
            },
            phone: {
              type: "string",
              example: "+1234567890",
            },
            whatsapp: {
              type: "string",
              example: "+1234567890",
            },
            facebook: {
              type: "string",
              example: "https://facebook.com/cleaningservices",
            },
            instagram: {
              type: "string",
              example: "https://instagram.com/cleaningservices",
            },
            twitter: {
              type: "string",
              example: "https://twitter.com/cleaningservices",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-05T12:34:56.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-01-10T14:22:10.000Z",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Path to your swagger controllers (compiled JS files in dist)
  apis: ["./dist/swagger/*.js"],
};

export default swaggerOptions;
