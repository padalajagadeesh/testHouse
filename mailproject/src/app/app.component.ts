import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertyfyService } from './services/alertyfy.service';
import { AuthService } from './services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './services/common.service';
import { Dropdown } from 'bootstrap';
import { Store } from '@ngrx/store';
import { houseData, registerApiData } from './store/house.selector';
import { signdataSuccess, signinload } from './store/house.action';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs/internal/Observable';
import { style } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:scroll')
  navBar_Data: boolean = false;
  navdata: boolean = true;
  Contact_NavBard: boolean = false;
  overall: boolean = true;
  title = 'Dhup...';
  storeUser: any = [];
  dummy: boolean = false;
  Avatar: boolean = false;
  storeArray: any = [];
  TotalNavBar: boolean = true;
  favvvT: any = [];
  array: any;
  LoginUserData: any = [];
  Dark_Mode:boolean=false;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  isShow: boolean=false;
  topPosToStartShowing = 100;



  constructor(private route: Router, private authservice: AuthService,
    private store: Store, private sevicecomman: CommonService,
    private alertfy: AlertyfyService, private service: CommonService,
    private _router: Router,private darkModeService: DarkModeService) { }
  ngOnInit() {
    // this.Dark_Mode = false;
    this.store.dispatch(signinload())
    this.store.select(registerApiData).subscribe((res:any)=>{
      console.log(res,'37::')
    })
    this.service.UserLogin.subscribe((res) => {
      if (this.storeUser = res) {
        this.Avatar = true;
        console.log('Matched.........')
      }
    })
    // this.store.select(houseData).subscribe((res) => {
    //   res.filter((val:any)=> {
    //     if(val.selectFav == true){
    //       this.favvvT.push(val);
    //       console.log(this.favvvT,'24:::::trueee');
    //     };
    //   });
    // });
    this.sevicecomman.Favourite.subscribe((res) => {
      this.favvvT = res
    })

  }
  ProfileData() {
    this.dummy = true;
  }
  myadds() {
    this.service.getDBHouseData().subscribe((res: any) => {
      this.sevicecomman.updatemyadds(res.filter((val: any) => val.username === this.array.Username));
      this.route.navigate(['my-adds']);
    })

    this.service.UserLogin.subscribe((res) => {
      this.array = res;
      console.log(this.array, '63:::::')
    })
  }
  logout() {
    this.authservice.isUserLogOut();
    this.Avatar = false;
    this.alertfy.Success('successfully LogOut....');
    this.route.navigate(['']);
  }
  toggle(modalElement: any) {
    const modal = new Dropdown(modalElement);
    modal.toggle();
  }
  goToFavPage() {
    this.route.navigate(['Favourite']);
  }
  GotoCreatePage() {
    this.route.navigate(['create-House']);
  }
  ClickLogo(){
    this.route.navigate(['House'])
  }
  onToggle(): void {
    this.Dark_Mode = !this.Dark_Mode;
    this.darkModeService.toggle();
  }
 
  checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    console.log('126:::')
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
