export class EventInputDto{
  id: string;
  isOwner: boolean;
  title: string;
  details: string;
  counselorContact: string;
  linkMeeting: string;
  start: Date;
  end: Date;
  participantEmails: String[];
}
