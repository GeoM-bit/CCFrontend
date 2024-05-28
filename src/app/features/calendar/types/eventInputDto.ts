export class EventInputDto{
  id: string;
  isOwner: boolean;
  title: string;
  details: string;
  start: Date;
  end: Date;
  participantEmails: String[];
}
