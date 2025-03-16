
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "../users/entities/user.entity";
import { Account } from "../accounts/entities/account.entity";
import { Transaction } from "../transactions/entities/transaction.entity";
import { Currency } from "../currency/entities/currency.entity";

export const typeOrmConfig = (
  configService: ConfigService
): PostgresConnectionOptions => ({
  type: "postgres",
  url: configService.get<string>("DATABASE_URL"),
  entities: [User, Account, Transaction, Currency],
  synchronize: configService.get<string>("NODE_ENV") !== "production",
  logging: configService.get<string>("NODE_ENV") === "development",
  migrations: ["dist/migrations/*.js"],
  migrationsRun: true,
  ssl: configService.get<string>("NODE_ENV") === "production" ? {
    rejectUnauthorized: false,
  } : false,
  extra: {
    connectionLimit: 10, 
  },
});