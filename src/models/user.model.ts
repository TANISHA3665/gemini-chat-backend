import { Sequelize, DataTypes, Model } from 'sequelize';
import { Chatroom } from './chatroom.model.js';
import { Message } from './message.model.js';

export enum Tier {
    BASIC = 'BASIC',
    PRO = 'PRO'
};

export class User extends Model {
    public id!: string;
    public mobile!: string;
    public name?: string;
    public password?: string;
    public tier!: Tier

    static associate() {
        User.hasMany(Chatroom, {
            foreignKey: 'userId',
            as: 'chatrooms',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        User.hasMany(Message, {
            foreignKey: 'userId',
            as: 'messages',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
};

export const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM(...Object.values(Tier)),
                allowNull: false,
                defaultValue: Tier.BASIC,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
        }
    );
};