import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "payments" })
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", nullable: false })
  amount: number;

  @Column({ type: "enum", enum: ["credit", "cash", "transfer", "crypto"], nullable: false })
  type: "credit" | "cash" | "transfer" | "crypto";

  @Column({ type: "enum", enum: ["USD", "EUR", "BTC", "ETH", "USDC"], nullable: false })
  currency: "USD" | "EUR" | "BTC" | "ETH" | "USDC";
}
