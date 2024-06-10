"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../types/httpStatus");
const add_1 = require("../app/use-cases/chat/add");
const read_1 = require("../app/use-cases/chat/read");
const chatController = (chatDbRepository, chatDbRepositoryImpl) => {
    const chatRepository = chatDbRepository(chatDbRepositoryImpl());
    /*
   * METHOD:POST
   * create new chats with two users
   */
    const createNewChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { senderId, recieverId } = req.body;
            const chats = yield (0, add_1.addNewChat)(senderId, recieverId, chatRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, chats });
        }
        catch (error) {
            next(error);
        }
    });
    /*
    * METHOD:GET
    * Retrive all the conversations/chats between the users
    */
    const fetchChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { senderId } = req.params;
            const chats = yield (0, read_1.getChats)(senderId, chatRepository);
            res.status(httpStatus_1.HttpStatus.OK).json(chats);
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:POST
     * create new send messages to the users
     */
    const createNewMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = yield (0, add_1.newMessage)(req.body, chatRepository);
            res.status(httpStatus_1.HttpStatus.OK).json(message);
        }
        catch (error) {
            next(error);
        }
    });
    /*
    * METHOD:GET
    * Retrive all  messages from  the users
    */
    const fetchMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { conversationId } = req.params;
            const messages = yield (0, read_1.getMessages)(conversationId, chatRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, messages });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        createNewChat,
        fetchChats,
        createNewMessage,
        fetchMessages,
    };
};
exports.default = chatController;
