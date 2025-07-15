import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './user.model.js';

export class Chatroom extends Model {
    public id!: string;
    public userId!: string;
    public topic!: string;
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
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'chatrooms',
            timestamps: true,
        }
    );
};

Chatroom.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });