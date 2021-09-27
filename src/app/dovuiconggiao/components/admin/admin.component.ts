
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Question, User } from '../../models/model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'question', 'author'];
  dataSource = new MatTableDataSource<Question>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

// export interface PeriodicElement {
//   content: string;
//   img: string;
//   options: Option[];
//   topicIds: string[];
//   topics?: Topic[]
//   author?: User;
//   authorId: string
// }

const ELEMENT_DATA: Question[] = [
  // {id: '1', content: 'The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog.........................................', authorId: 'H'},
  // {id: '2', content: 'Helium', authorId: 'He'},
  // {id: '3', content: 'Lithium', AuthorId: 'Li'},
  // {id: '4', content: 'Beryllium', AuthorId: 'Be'},
  // {id: '5', content: 'Boron', AuthorId: 'B'},
  // {id: '6', content: 'Carbon', AuthorId: 'C'},
  // {id: '7', content: 'Nitrogen', AuthorId: 'N'},
  // {id: '8', content: 'Oxygen', AuthorId: 'O'},
  // {id: '9', content: 'Fluorine', AuthorId: 'F'},
  // {id: '10', content: 'Neon', AuthorId: 'Ne'},
  // {id: '11', content: 'Sodium', AuthorId: 'Na'},
  // {id: '12', content: 'Magnesium', AuthorId: 'Mg'},
  // {id: '13', content: 'Aluminum', AuthorId: 'Al'},
  // {id: '14', content: 'Silicon', AuthorId: 'Si'},
  // {id: '15', content: 'Phosphorus', AuthorId: 'P'}
];


