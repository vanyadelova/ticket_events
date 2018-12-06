import 'reflect-metadata';
import { Action, BadRequestError, useKoaServer, NotFoundError } from 'routing-controllers';
import * as Koa from 'koa';
import {Server} from 'http';
import setupDb from './dbs';
import { verify } from './jwt';
import {User} from './users/entity';
import {Ticket} from './tickets/entity';
import LoginController from './logins/controller';
import CommentsController from './comments/controller';
import EventsController from './events/controller';
import TicketsController from './tickets/controller';
import UserController from './users/controller';

const app = new Koa();
const server = new Server(app.callback());
const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  controllers: [
    LoginController,
    CommentsController,
    EventsController,
    TicketsController,
    UserController
  ],
  authorizationChecker: async (action: Action, roles: string[]) => {
    const header: string = action.request.headers.authorization;
    
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ');
      try {
        const {id} = verify(token);
        const user = await User.findOneById(id);
        if(!user) throw new NotFoundError('User not found!');
        
        if(roles.length) { 
            const [role] = roles;
            switch (role) {
                case 'admin':
                    return !!(user && user.admin);
                case 'Author':
                    const [ , , ticketId, ] = action.request.path.split('/');
                    const ticket = await  Ticket.findOneById(Number(ticketId),{relations:["user"]});

                    if(!ticket) throw new NotFoundError('Ticket not found!');
                    return !!(ticket && (ticket.user.id === user.id));
                default:
                    break;
            }
        }else {
            return !!(token && verify(token));
        }
        
      }
      catch (e) {
        throw new BadRequestError(e);
      }
    }

    return false;
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization;
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ');
      
      if (token) {
        const {id} = verify(token);
        return User.findOneById(id);
      }
    }
    return undefined;
  }
});

setupDb()
  .then(_ => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
  })
  .catch(err => console.error(err));