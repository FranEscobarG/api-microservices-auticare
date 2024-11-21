import config from "./config";

export const mongoConfig = {
  url: config.mongoURI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
