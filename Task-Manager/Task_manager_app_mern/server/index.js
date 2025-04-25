import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
import { dbConnection } from "./utils/index.js"
import routes from "./routes/index.js"

dotenv.config()

dbConnection()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(morgan("dev"))
app.use("/api", routes)

app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

                                      // after
                                      
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import morgan from "morgan";
// import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
// import { dbConnection } from "./utils/index.js";
// import routes from "./routes/index.js";

// dotenv.config();

// dbConnection();

// const PORT = process.env.PORT || 5000;
// const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [];

// const app = express();

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (process.env.NODE_ENV === 'development') {
//       callback(null, true); // Allow all origins in development
//     } else {
//       if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
//         callback(null, true); // Allow specified origins in production
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     }
//   },
//   methods: ["GET", "POST", "DELETE", "PUT"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(morgan("dev"));
// app.use("/api", routes);

// app.use(routeNotFound);
// app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
