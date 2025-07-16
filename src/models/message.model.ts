import { Sequelize, DataTypes, Model } from 'sequelize';
import { User, Chatroom } from '../models/index.js';

export enum MessageRole { 
    USER = 'USER',
    AI = 'AI'
};

export class Message extends Model {
    public id!: string;
    public userId!: string;
    public chatroomId!: string;
    public content!: string;
    public role!: MessageRole;

    static associate() {
        Message.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Message.belongsTo(Chatroom, {
            foreignKey: 'chatroomId',
            as: 'chatroom',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}

export const initMessageModel = (sequelize: Sequelize) => {
    Message.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            chatroomId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'chatrooms',
                    key: 'id',
                }
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM(...Object.values(MessageRole)),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'messages',
            timestamps: true,
        }
    );
};
