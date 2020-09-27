import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from "./services/catalogue.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories;
  currentCategorie;
  loaded;
  routeChangeDetection: any;
  catOnLoad: string;
  destroy: boolean;
  constructor(private catalogueService: CatalogueService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.getCategories();
    this.catOnLoad = localStorage.getItem("categorie")



  }

  onClick() {
    this.currentCategorie = undefined
    this.router.navigateByUrl('/products/1/0')
  }
  getProductsByCategorie(id) {
    this.destroy = true
    this.currentCategorie = id;
    this.router.navigateByUrl('/products/2/' + id)
  }
  private getCategories() {
    this.catalogueService.getResource("/categories").subscribe(data => {
      this.categories = data;
    }, err => {
      console.log(err);
    })

  }
}
