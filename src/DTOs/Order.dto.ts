
import { IsInt, Min } from 'class-validator';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsInt()
  menuItemId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

// src/admin/dto/update-order-status.dto.ts


export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}