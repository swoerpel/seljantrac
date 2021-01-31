import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserPageActions } from 'src/app/state/user/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  public navigateHome(){
    this.router.navigate([''])
  }

  public logout(){
    this.store.dispatch(UserPageActions.LogoutUser())
  }

}
