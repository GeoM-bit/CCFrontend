import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserProfileSupportGroup} from "../../types/userProfileSupportGroup";

@Component({
  selector: 'app-user-profile-support-group',
  templateUrl: './user-profile-support-group.component.html',
  styleUrl: './user-profile-support-group.component.css'
})
export class UserProfileSupportGroupComponent {
  @Input() supportGroup: UserProfileSupportGroup = new UserProfileSupportGroup();
  @Output() removeSupportGroup = new EventEmitter<String>();
  @Output() goToGroup = new EventEmitter<UserProfileSupportGroup>();
}
