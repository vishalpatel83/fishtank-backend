import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { FishLot } from '../fish-lots/entities/fish-lot.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(FishLot)
        private fishLotsRepository: Repository<FishLot>,
    ) {}

    async getDashboardStats(fishermanId?: number) {
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

        // Build base query for completed orders
        const baseQuery = this.ordersRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.fishLot', 'fishLot');

        if (fishermanId) {
            baseQuery.andWhere('fishLot.fisherman_id = :fishermanId', { fishermanId });
        }

        // Current period: all completed (delivered) orders
        const completedOrders = await baseQuery
            .clone()
            .andWhere('order.status = :status', { status: OrderStatus.DELIVERED })
            .getMany();

        // Current month completed orders
        const currentMonthOrders = await baseQuery
            .clone()
            .andWhere('order.status = :status', { status: OrderStatus.DELIVERED })
            .andWhere('order.order_date >= :start', { start: currentMonthStart })
            .getMany();

        // Previous month completed orders
        const previousMonthOrders = await baseQuery
            .clone()
            .andWhere('order.status = :status', { status: OrderStatus.DELIVERED })
            .andWhere('order.order_date >= :start', { start: previousMonthStart })
            .andWhere('order.order_date <= :end', { end: previousMonthEnd })
            .getMany();

        // Calculate stats
        const totalCompleted = completedOrders.length;
        const currentMonthCount = currentMonthOrders.length;
        const previousMonthCount = previousMonthOrders.length;

        const currentRevenue = currentMonthOrders.reduce((sum, o) => sum + Number(o.total_price), 0);
        const previousRevenue = previousMonthOrders.reduce((sum, o) => sum + Number(o.total_price), 0);

        const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.total_price), 0);
        const totalWeight = completedOrders.reduce((sum, o) => sum + Number(o.quantity_kg), 0);

        const currentWeight = currentMonthOrders.reduce((sum, o) => sum + Number(o.quantity_kg), 0);
        const previousWeight = previousMonthOrders.reduce((sum, o) => sum + Number(o.quantity_kg), 0);

        // Estimate profit as 30% of revenue
        const profit = Math.round(totalRevenue * 0.3);
        const currentProfit = Math.round(currentRevenue * 0.3);
        const previousProfit = Math.round(previousRevenue * 0.3);

        return {
            completedOrders: totalCompleted,
            completedOrdersChange: this.calcChange(currentMonthCount, previousMonthCount),
            profit,
            profitChange: this.calcChange(currentProfit, previousProfit),
            revenue: totalRevenue,
            revenueChange: this.calcChange(currentRevenue, previousRevenue),
            totalWeight: Math.round(totalWeight),
            totalWeightChange: this.calcChange(currentWeight, previousWeight),
        };
    }

    private calcChange(current: number, previous: number): number {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
    }
}
