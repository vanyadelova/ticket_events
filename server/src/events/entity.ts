import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Exclude } from 'class-transformer';
import {User} from '../users/entity';
import {Ticket} from '../tickets/entity';

@Entity()
export default class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text',{nullable:true})
  name: string;

  @Column('text',{nullable:true})
  description: string;

  @Column('text',{nullable:true})
  thumbnail: string;

  @Column({type: 'date', nullable: true})
  startingTime: Date;

  @Column({type: 'date', nullable: true})
  endTime: Date;

  @Exclude({toPlainOnly:true})
  @ManyToOne(_ => User, user => user.events)
  user: User;

  @OneToMany(_=> Ticket, ticket => ticket.event )
  tickets: Ticket[];

}
