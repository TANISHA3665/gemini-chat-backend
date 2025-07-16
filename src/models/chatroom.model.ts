import { Sequelize, DataTypes, Model } from 'sequelize';
import { User, Message  } from '../models/index.js';

export class Chatroom extends Model {
    public id!: string;
    public userId!: string;
    public topic!: string;

    static associate() {
        Chatroom.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Chatroom.hasMany(Message, {
            foreignKey: 'chatroomId',
            as: 'messages',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    }
};

export const initChatroomModel = (sequelize: Sequelize) => {
    Chatroom.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Chatroom',
            tableName: 'chatrooms',
            timestamps: true,
        }
    );
};