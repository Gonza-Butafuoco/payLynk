import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // ej: "USD" , "EUR" , "ARS"

  @Column()
  symbol: string; // ej: "$" , "€" , "U$S"

  @Column()
  name: string; // ej : "Dolar Estadounidense" , "Euro" , "Peso Argentino"
}
