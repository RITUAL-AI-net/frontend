import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService) { }

  // convertFunction = (data: any) => {
  //   for (const keyIt in data) {
  //     if (typeof data[keyIt] == 'object') continue;
  //     data[keyIt] = parseFloat(data[keyIt]).toFixed(2);
  //   }

  //   return data;
  // }

  // pickHex = (weight) => {
  //   const color1 = [255, 255, 0];
  //   const color2 = [0, 0, 0];
  //   var w1 = (weight - 1) * 0.25;
  //   var w2 = (5 - w1) * 0.25;
  //   const firstColor = ("0" + Math.round(255 - color1[0] * w1 + color2[0] * w2).toString(16)).slice(-2);
  //   const secondColor = ("0" + Math.round(color1[1] * w1 + color2[1] * w2).toString(16)).slice(-2);
  //   const thirdColor = ("0" + Math.round(color1[2] * w1 + color2[2] * w2).toString(16)).slice(-2);
  //   return `#${firstColor}${secondColor}${thirdColor}`;
  // }


  ngOnInit() {
  }
}
