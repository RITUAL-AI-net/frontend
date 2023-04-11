import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "@auth0/auth0-angular";
import { AuthService } from "@auth0/auth0-angular";
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/maps",
    title: "Create a Scenario",
    icon: "icon-pin",
    class: ""
  },
  {
    path: "/icons",
    title: "Upload a Solution",
    icon: "icon-atom",
    class: ""
  },
 
  
  {
    path: "/analyze",
    title: "Analyze a Solution",
    icon: "icon-bell-55",
    class: ""
  },
  {
    path: "/compare",
    title: "Compare Solutions",
    icon: "icon-puzzle-10",
    class: ""
  },
 
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService, public route: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  handleNavigate(event) {
    const email = localStorage.getItem('email');
    if (!email || email.length <= 0) {
      this.route.navigate(['/login']);
    }
  }
}
