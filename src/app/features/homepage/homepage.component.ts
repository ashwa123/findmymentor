import { Component, OnInit } from '@angular/core';
import { MentorService } from '../../shared/mentor.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestFormComponent } from '../request-form/request-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  mentors: [any];
  mentorList: any;
  searchValue: string;
  filterchipsarray: any = [];
  removable = true;
  avatarImage = '../../../assets/avatar/avatar.png';
  leftPosition  = 0;
  carouselImages = [
    '../../../assets/carousel/mentorImage1.png',
    '../../../assets/carousel/mentorImage3.png',
    '../../../assets/carousel/mentorImage4.png'
  ]

  constructor(
    private mentorService: MentorService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getMentordetails();
  }

  getMentordetails() {
    this.mentorService.getMentors().subscribe(response => {
      console.log(response);
      this.mentors = response;
      this.paginate({pageIndex: 0, pageSize: 9})
    })
  }

  paginate(event) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.mentors){
      endIndex = this.mentors;
    }
    this.mentorList = this.mentors.slice(startIndex, endIndex);
  }

  openForm() {
    const dialogRef = this.dialog.open(RequestFormComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  filterChips() {
    console.log(this.searchValue);
    console.log(this.filterchipsarray)
    this.filterchipsarray = this.searchValue.split(' ')
    console.log(this.filterchipsarray);
  }

  remove(chip: string): void {
    const index = this.filterchipsarray.indexOf(chip);

    if (index >= 0) {
      this.filterchipsarray.splice(index, 1);
    }
  }

  prev() {
    this.leftPosition = this.leftPosition + 100;
  }

  next() {
    this.leftPosition = this.leftPosition - 100;
  }

}
