import {Component, OnInit, ViewChild} from '@angular/core';
import {SupportGroupsService} from "../../../core/services/supportGroups.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {SupportGroupDto} from "../../../../models/supportGroupDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SupportGroupMemberModel} from "../../../../models/supportGroupMemberModel";

@Component({
  selector: 'app-support-groups-table',
  templateUrl: './support-groups-table.component.html',
  styleUrl: './support-groups-table.component.css'
})
export class SupportGroupsTableComponent implements OnInit{
  displayedColumns: string[] = ['groupName', 'description', 'memberCount', 'action'];
  dataSource= new MatTableDataSource<SupportGroupDto>;
  noGroups=false;
  suportGroupMemberModel = new SupportGroupMemberModel();
  constructor(private supportGroupService: SupportGroupsService, private authService: AuthenticationService){
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }
  getData(){
      this.supportGroupService.getGroups().subscribe((response: SupportGroupDto[]) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
        if(this.dataSource.data.length==0) {
          this.noGroups = true;
        }
      })
    this.noGroups = this.dataSource.data.length==0 ? true:false;
  }

  joinGroup(groupName: String)
  {
    this.suportGroupMemberModel.groupName = groupName;
    this.suportGroupMemberModel.email = this.authService.getUserEmail();
    this.supportGroupService.addMember(this.suportGroupMemberModel).subscribe((response: Boolean) => {
      if(response!=null) {
        console.log(response);
      }
      else {
        console.log(response);
      }
    });
  }
}
