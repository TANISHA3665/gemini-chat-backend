import { Sequelize } from 'sequelize';
import { initUserModel, User } from '../models/user.model.js';
import { initChatroomModel, Chatroom } from '../models/chatroom.model.js';
import { initMessageModel, Message } from '../models/message.model.js';
import { ENV } from '../config/env.config.js';

const sequelize = new Sequelize(
    ENV.DB.NAME,
    ENV.DB.USER,
    ENV.DB.PASS,
    {
        dialect: 'postgres',
        host: ENV.DB.HOST,
        port: ENV.DB.PORT,
        logging: false,
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
