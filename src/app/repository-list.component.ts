// repository-list.component.ts
import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-repository-list',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ],
})
export class RepositoryListComponent implements OnInit{
  username = '';
  repositories = null;
  profile:any ='';
  currentPage = 1;
  totalPages = 1;
  errorMessage = '';
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  
  ngOnInit() {
  }

  getRepositories() {
    this.errorMessage = '';
    this.http.get(`https://api.github.com/users/${this.username}/repos?per_page=10&page=${this.currentPage}&per_page=5`)
    .subscribe((data: any) => {
      this.repositories = data;
      
      this.totalPages = Math.ceil(data.length / 4);
    }
    ,
        (error) => {
          this.errorMessage = 'Error fetching repositories';
        }
      );
  }
  openRepository(url: string) {
    window.open(url, '_blank');
  }
  getProfile() {
    this.errorMessage = '';
    this.http
      .get(`https://api.github.com/users/${this.username}`)
      .subscribe(
        (profile) => {
          this.profile = profile;
        },
        (error) => {
          this.errorMessage = 'Error fetching profile';
        }
      );
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this. getRepositories();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this. getRepositories();
    }
  }

   
}




