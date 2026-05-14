import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
    projectConfig: {
        // ❌ Elimina esta línea (no es necesaria y puede causar conflictos)
        // databaseUrl: process.env.DATABASE_URL,

        http: {
            storeCors:
                process.env.STORE_CORS ||
                "http://localhost:8000,http://localhost:9000",
            adminCors:
                process.env.ADMIN_CORS ||
                "http://localhost:9000,http://localhost:5173",
            authCors: process.env.AUTH_CORS || "http://localhost:9000",
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        },
        // ✅ Agrega esto para desactivar SSL en PostgreSQL (obligatorio para Docker)
        databaseDriverOptions: {
            ssl: false,
            sslmode: "disable",
        },
    },
    // ✅ Agrega esto para que el Admin Dashboard funcione en Docker
    admin: {
        vite: (config) => {
            return {
                server: {
                    host: "0.0.0.0",
                    allowedHosts: ["localhost", ".localhost", "127.0.0.1"],
                    hmr: {
                        port: 5173,
                        clientPort: 5173,
                    },
                },
            };
        },
    },
});

// import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: process.env.STORE_CORS!,
//       adminCors: process.env.ADMIN_CORS!,
//       authCors: process.env.AUTH_CORS!,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//     }
//   }
// })
