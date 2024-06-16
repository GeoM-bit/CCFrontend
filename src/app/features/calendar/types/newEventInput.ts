export class NewEventInput{
  title: String;
  details: String;
  start: Date;
  end: Date;
  participantEmails: String[];
  participantsOption: string;
  selectedGroup: string;
  selectedGroupName: string;
}
