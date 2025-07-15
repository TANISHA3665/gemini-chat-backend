import { Sequelize } from 'sequelize';
import { ENV } from './env.config.js';
import { initUserModel, User } from '../models/user.model.js';
import { initChatroomModel, Chatroom } from '../models/chatroom.model.js';
import { initMessageModel, Message } from '../models/message.model.js';

const sequelize = new Sequelize(
    ENV.DB.NAME,
    ENV.DB.USER,
    ENV.DB.PASS,
    {
        dialect: 'postgres',
        host: ENV.DB.HOST,
        port: ENV.DB.PORT,
        logging: ENV.NODE_ENV !== 'production',
    }
);

initUserModel(sequelize);
initChatroomModel(sequelize);
initMessageModel(sequelize);

User.associate?.();
Chatroom.associate?.();
Message.associate?.();

export {
    sequelize,
    User,
    Chatroom,
    Message
};
