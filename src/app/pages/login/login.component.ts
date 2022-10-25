import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name: string = ''
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  submit() {
    if(!this.name) return alert('Please provide your name')
    this.router.navigate(['chat', this.name])
  }

}
