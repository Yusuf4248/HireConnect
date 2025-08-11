import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import { format, transports } from "winston";

export const winstonConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike("HireConnect", {
          prettyPrint: true,
        })
      ),
    }),

    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "logs/combined.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};
