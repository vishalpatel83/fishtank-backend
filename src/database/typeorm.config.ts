import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  // type: 'mysql',
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // autoLoadEntities: true,
  // synchronize: true, // ❌ never true in prod
  // TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // Your actual MySQL username
  password: '', // Your actual MySQL password
  database: 'fisherman_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  // })
});
