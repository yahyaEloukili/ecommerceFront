import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CatalogueService } from "../services/catalogue.service";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  url = this.catalogueService.host + '/photoProduct/';
  routeChangeDetection: any;

  constructor(public catalogueService: CatalogueService, private router: Router, private route: ActivatedRoute) {
    this.routeChangeDetection = this.router.events.subscribe((event) => {
      localStorage.setItem("categorie", this.route.snapshot.params.p2)
    })
  }

  ngOnInit(): void {


    this.func();

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        this.func();
      }
    })

  }
  private getProducts(url) {
    this.catalogueService.getResource(url).subscribe(data => {
      this.products = data;
    })
  }
  func() {
    let p1 = this.route.snapshot.params.p1;
    let p2 = this.route.snapshot.params.p2;
    if (p1 === '1') {

      this.getProducts("/products/search/selectedProducts");
    }
    else if (p1 === '2') {
      let idCat = this.route.snapshot.params.p2;


      this.getProducts('/categories/' + idCat + '/products')
    }
  }

}
